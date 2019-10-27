const nodesNames = ["WlascicielA", "WlascicielB"];
const propsNames = ["Datazlecenia", "Nrroz.BankuA", "Datarealizacji", "Nrroz.BankuB"];
const connectionNames = ["NrkontaA", "NrkontaB", "Kwotaprzelewu"];

module.exports = {

    prepareDataForVisGraph: function (data, projectProperties, graphProperties) {
        const dataBaseManagement = require('./../dataBaseManagement');

        let dataBaseManagementProperties = dataBaseManagement.initAndPrepareDataBase(projectProperties);
        dataBaseManagement.addRawDataToDataBase(dataBaseManagementProperties.getDataCollectionWithRowData(), data);
    },

    drawDataForVisGraph: function (fileWithData, projectProperties, graphProperties) {

        const visGraphDrawModule = require(`./../visModule/visGraphDraw`.replace(/\\/g, '/'));
        const dataBaseManagement = require('./../dataBaseManagement');

        let dataBaseManagementProperties = dataBaseManagement.initAndPrepareDataBase(projectProperties);
        dataBaseManagement.addRawDataToDataBase(dataBaseManagementProperties.getDataCollectionWithRowData(), fileWithData);
        let dataForDrawVis = this.parseRawDataToBankTransactionTemple(dataBaseManagementProperties, graphProperties);
        visGraphDrawModule.drawVisGraph(dataForDrawVis);
    },
    parseRawDataToBankTransactionTemple: function (dataBaseManagementProperties, graphProperties) {
        const VisGraphData = require('./../visModule/VisGraphData');
        const vis = require("../../app/src/vis/vis");

        let connectionData = [];

        let nodesSet = new vis.DataSet();
        let collectionSet = new vis.DataSet();

        dataBaseManagementProperties.getDataCollectionWithRowData().find().forEach(function (dataFromDataBase, index) {

            if(index === 0) {
                let otherInfoAboutNode = [];
                graphProperties.getBaseNodeAttributesNames().getOtherInfoNames().forEach(function ( item) {
                        otherInfoAboutNode.push({[item]: dataFromDataBase[item]});
                })
                console.log(graphProperties.getBaseNodeAttributesNames().getOtherInfoNames())
                let node = {
                    id: dataFromDataBase[graphProperties.getBaseNodeAttributesNames().getUniqueValue()],
                    n_id: dataFromDataBase[graphProperties.getConnectorNodeAttributesNames().getUniqueValue()],
                    "label": dataFromDataBase[graphProperties.getBaseNodeAttributesNames().getNodeName()],
                    "info": otherInfoAboutNode
                }
                nodesSet.update(node);
                dataBaseManagementProperties.getCollectionForNodesData().insert(node);

                let connection = {
                    from: node.id,
                    to: node.n_id,
                    title: dataFromDataBase[graphProperties.getEdgeAttributesNames().getEdgeLabel()]
                }
                connectionData.push(connection);
                dataBaseManagementProperties.getCollectionForConnectionData().insert(connection);
            }
            else{
                let otherInfoAboutNode = [];
                graphProperties.getBaseNodeAttributesNames().getOtherInfoNames().forEach(function (item) {
                    otherInfoAboutNode.push({[item]: dataFromDataBase[item]});
                })
                let node = {
                    id: dataFromDataBase[graphProperties.getConnectorNodeAttributesNames().getUniqueValue()],
                    n_id: dataFromDataBase[graphProperties.getBaseNodeAttributesNames().getUniqueValue()],
                    "label": dataFromDataBase[graphProperties.getConnectorNodeAttributesNames().getNodeName()],
                    "info": otherInfoAboutNode
                }
                nodesSet.update(node);
                dataBaseManagementProperties.getCollectionForNodesData().insert(node);

                let connection = {
                    from: node.id,
                    to: node.n_id,
                    title: dataFromDataBase[graphProperties.getEdgeAttributesNames().getEdgeLabel()]
                }
                connectionData.push(connection);
                dataBaseManagementProperties.getCollectionForConnectionData().insert(connection);
            }

            console.log(nodesSet);

        })

        collectionSet.update(this.setDataWithoutDuplicatesOfEdges(connectionData));
        dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForNodesData());
        dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForConnectionData());

        return new VisGraphData(nodesSet, collectionSet).mergeData()
    },

    setDataWithoutDuplicatesOfEdges: function (connectionData) {
        return connectionData = connectionData.filter((values, index, self) =>
            index === self.findIndex((t) => (
                t.from === values.from && t.to === values.to
            ))
        );
    },

};
