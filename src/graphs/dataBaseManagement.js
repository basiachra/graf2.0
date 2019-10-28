const dataBaseModule = require(`./../app/database/forerunnerDB`.replace(/\\/g, '/'));
const DataBaseManagementProperties = require('./DataBaseManagementProperties');
module.exports = {

    initAndPrepareDataBase: function (projectProperties) {

        let projectName = projectProperties.getProjectName();
        let graphName = projectProperties.getGraphName();
        let pathToData = projectProperties.getPathToData();

        let dataBaseInstance = dataBaseModule.initDataBase(projectName, pathToData);
        let dataCollectionWithRawData = this.initCollectionForRawData(dataBaseInstance,graphName)
        let collectionForNodesData = this.initCollectionForNodes(dataBaseInstance, graphName);
        let collectionForConnectionData = this.initCollectionForConnections(dataBaseInstance, graphName);

        return new DataBaseManagementProperties(dataBaseModule,dataBaseInstance,dataCollectionWithRawData,collectionForNodesData,collectionForConnectionData);
    },

    initCollectionForRawData: function (dataBaseInstance, graphName) {
        let collectionNameForRawData = graphName + "rawData";
        return dataBaseModule.setCollection(dataBaseInstance, collectionNameForRawData);
    },

    initCollectionForNodes: function (dataBaseInstance, graphName) {
        let collectionNameForNodes = graphName + "node";
        return dataBaseModule.setCollection(dataBaseInstance, collectionNameForNodes);
    },

    initCollectionForConnections: function (dataBaseInstance, graphName) {
        let collectionNameForConnections = graphName + "connection";
        return dataBaseModule.setCollection(dataBaseInstance, collectionNameForConnections);
    },

    addRawDataToDataBase: function (dataCollectionWithRawData,fileWithData) {
        const transferToJson = require('../app/dataparse/excelToJson');
        let jsonRawDataFromExcel = transferToJson.parseDataFromExcelToJson(false, fileWithData);
        dataBaseModule.insertJson(dataCollectionWithRawData, jsonRawDataFromExcel);
        dataBaseModule.saveDataBaseCollection(dataCollectionWithRawData);
    },
}

