module.exports = {

    prepareAndDrawDataForVisGraph: function (fileWithData, projectProperties, graphProperties) {
        const visGraphDrawModule = require(`./../visModule/visGraphDraw`.replace(/\\/g, '/'));

        let dataBaseManagementProperties = this.saveDataForVisGraph(fileWithData, projectProperties, graphProperties)
        let dataForDrawVis = this.prepareDataForVisTemple(dataBaseManagementProperties.getCollectionForNodesData(), dataBaseManagementProperties.getCollectionForConnectionData());
        visGraphDrawModule.drawVisGraph(dataForDrawVis);
    },

    saveDataForVisGraph: function (fileWithData, projectProperties, graphProperties) {
        const dataBaseManagement = require('./../dataBaseManagement');
        const managerForVisGraph = require('./managerForVisGraph');

        let dataBaseManagementProperties = dataBaseManagement.initAndPrepareDataBase(projectProperties);
        dataBaseManagement.addRawDataToDataBase(dataBaseManagementProperties.getDataCollectionWithRowData(), fileWithData);
        managerForVisGraph.setDataToTempleAndSaveToDataBase(dataBaseManagementProperties, graphProperties);

        return dataBaseManagementProperties;
    },

    prepareDataForVisTemple : function (collectionForNodesData, collectionForConnectionData) {
        const VisGraphData = require('./../visModule/VisGraphData');
        const vis = require("../../app/src/vis/vis");

        let nodesSet = new vis.DataSet();
        let collectionSet = new vis.DataSet();
        nodesSet.update(collectionForNodesData.find());
        collectionSet.update(this.setDataWithoutDuplicatesOfEdges(collectionForConnectionData.find()));
       // collectionSet.update(collectionForConnectionData.find());
        console.log(nodesSet);
        console.log(collectionSet);
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