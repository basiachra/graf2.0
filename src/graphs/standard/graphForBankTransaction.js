import {VisGraphData} from "../visModule/VisGraphData";

const nodesNames = ["WlascicielA", "WlascicielB"];
const propsNames = ["Datazlecenia", "Nrroz.BankuA", "Datarealizacji", "Nrroz.BankuB"];
const connectionNames = ["NrkontaA", "NrkontaB", "Kwotaprzelewu"];

// module.exports = {
//
//     prepareandDrawDataForVisGraph: function (data, projectProperties, graphProperties) {
//         const dataBaseManagement = require('./../dataBaseManagement');
//
//         let dataBaseManagementProperties = dataBaseManagement.initAndPrepareDataBase(projectProperties);
//         dataBaseManagement.addRawDataToDataBase(dataBaseManagementProperties.getDataCollectionWithRowData(), data);
//     },
//
//     drawDataForVisGraph: function (fileWithData, projectProperties, graphProperties) {
//
//         const visGraphDrawModule = require(`./../visModule/visGraphDraw`.replace(/\\/g, '/'));
//         const dataBaseManagement = require('./../dataBaseManagement');
//
//         let dataBaseManagementProperties = dataBaseManagement.initAndPrepareDataBase(projectProperties);
//         dataBaseManagement.addRawDataToDataBase(dataBaseManagementProperties.getDataCollectionWithRowData(), fileWithData);
//         let dataForDrawVis = this.parseRawDataToBankTransactionTemple(dataBaseManagementProperties, graphProperties);
//         ///visGraphDrawModule.drawVisGraph(dataForDrawVis);
//     },};
//     export function setDataWithoutDuplicatesOfEdges (connectionData) {
//         return connectionData.filter((values, index, self) =>
//             index === self.findIndex((t) => (
//                 t.from === values.from && t.to === values.to
//             ))
//         );
//     }

export function parseRawDataToBankTransactionTemple (dataBaseManagementProperties, graphProperties) {

    let connectionData = [];

    let nodesSet = [];
    let collectionSet =[];

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
            nodesSet.push(node);
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
            nodesSet.push(node);
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

    });

    //const newConnections = this.setDataWithoutDuplicatesOfEdges(connectionData);
    collectionSet = connectionData.filter((values, index, self) =>
        index === self.findIndex((t) => (
            t.from === values.from && t.to === values.to
        ))
    );
    dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForNodesData());
    dataBaseManagementProperties.getDataBaseModule().saveDataBaseCollection(dataBaseManagementProperties.getCollectionForConnectionData());

    let graph;
    graph = new VisGraphData(nodesSet, collectionSet);
    return graph.mergeData()
}