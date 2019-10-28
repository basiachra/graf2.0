module.exports = {

    setDataToTempleAndSaveToDataBase: function (dataBaseManagementProperties, graphProperties) {
        const parserForVisGraph = require('./parserForVisGraph');

        let nodesData = [];
        let connectionData = [];

         dataBaseManagementProperties.getDataCollectionWithRowData().find({}).forEach(function (dataFromDataBase, index) {
           parserForVisGraph.parseDataFromTwoNodes(dataFromDataBase,graphProperties,nodesData,connectionData,index);
        });
        dataBaseManagementProperties.getCollectionForNodesData().insert(nodesData);
        dataBaseManagementProperties.getCollectionForConnectionData().insert(connectionData);
        dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForNodesData());
        dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForConnectionData());
    },

    parseConnectorDataToVisGraphModel : function (dataBaseManagementProperties, graphPropertiesForDefinedNode,nodesData) {
        let connectionData = [];
        dataBaseManagementProperties.getCollectionForNodesData().find({
            $distinct: {
                id: 1
            }
        }).forEach(function (dataFromDataBase, index) {

            let connection = {
                from: dataFromDataBase.uniqueId,
                to: nodesData.find(x=>x.id === dataFromDataBase.id).uniqueId,
                title: dataFromDataBase[graphPropertiesForDefinedNode]
            };
            connectionData.push(connection);
        });

        console.log(connectionData)

    },
};
