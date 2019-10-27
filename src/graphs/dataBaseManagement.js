const dataBaseModule = require(`./../app/database/forerunnerDB`.replace(/\\/g, '/'));
const DataBaseManagementProperties = require('./DataBaseManagementProperties');
module.exports = {

    getDataBase: function(projectName, pathToData,graphName){
        let dataBaseInstance = dataBaseModule.initDataBase(projectName, pathToData);
        return dataBaseModule.loadDataBase(dataBaseInstance,graphName+'node');
    },

    initAndPrepareDataBase: function (projectProperties) {

        let projectName = projectProperties.getProjectName();
        let graphName = projectProperties.getGraphName();
        let pathToData = projectProperties.getPathToData();

        let dataBaseInstance = dataBaseModule.initDataBase(projectName, pathToData);
        let dataCollectionWithRawData = this.initCollectionForRawData(dataBaseInstance,graphName);
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

    addRawDataToDataBase: function (dataCollectionWithRawData,data) {
        dataBaseModule.insertJson(dataCollectionWithRawData, data);
        console.log(data);
        dataBaseModule.saveDataBaseCollection(dataCollectionWithRawData);
    }
};

