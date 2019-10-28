module.exports = {

    parseDataFromTwoNodes: function (dataFromDataBase, graphProperties, nodesData, connectionData, index) {
        let group = "";
        if (graphProperties.getIsAllowGrouping()) group = 1;
        this.parseDataToVisGraphModel(dataFromDataBase, graphProperties.getBaseNodeAttributesNames(), graphProperties.getConnectorNodeAttributesNames(), nodesData, connectionData, group);
        this.parseDataToVisGraphModel(dataFromDataBase, graphProperties.getConnectorNodeAttributesNames(), graphProperties.getBaseNodeAttributesNames(), nodesData, connectionData, group + 1);
    },

    parseDataToVisGraphModel: function (dataFromDataBase, graphPropertiesForDefinedNode, graphPropertiesForConnectorNode, nodesData, connectionData, color) {

        let node = {
            uniqueId: nodesData.length,
            id: dataFromDataBase[graphPropertiesForDefinedNode.getUniqueValue()],
            n_id: dataFromDataBase[graphPropertiesForConnectorNode.getUniqueValue()],
            "label": dataFromDataBase[graphPropertiesForDefinedNode.getNodeName()],
            "info": this.parseOtherInfoDataToJsonModel(dataFromDataBase, graphPropertiesForDefinedNode),
            "group": color
        };
        nodesData.push(node);
        if (nodesData.length % 2 == 1) {
            let connection = {
                from: node.id,
                to: node.n_id,
                title: dataFromDataBase[graphPropertiesForDefinedNode]
            };
            connectionData.push(connection);
        }
    },

    parseOtherInfoDataToJsonModel: function (dataFromDataBase, nodeAttributesNames) {
        let otherInfoAboutNode = [];
        nodeAttributesNames.getOtherInfoNames().forEach(function (item) {
            otherInfoAboutNode.push({[item]: dataFromDataBase[item]});
        });
        return otherInfoAboutNode;
    },
};