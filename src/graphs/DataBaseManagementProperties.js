class DataBaseManagementProperties {
    constructor(databaseModule, dataBaseInstance, dataCollectionWithRawData, collectionForNodesData, collectionForConnectionData) {
        this.databaseModule = databaseModule;
        this.dataBaseInstance = dataBaseInstance;
        this.dataCollectionWithRawData = dataCollectionWithRawData;
        this.collectionForNodesData = collectionForNodesData;
        this.collectionForConnectionData = collectionForConnectionData;
    }

    getDataBaseModule(){
        return this.databaseModule;
    }
    getDataBaseInstance(){
        return this.dataBaseInstance;
    }
    getDataCollectionWithRowData(){
        return this.dataCollectionWithRawData;
    }
    getCollectionForNodesData(){
        return this.collectionForNodesData;
    }
    getCollectionForConnectionData(){
        return this.collectionForConnectionData;
    }
}
module.exports = DataBaseManagementProperties;
