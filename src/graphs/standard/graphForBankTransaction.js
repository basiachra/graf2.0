module.exports = {

    drawVisGraphForBankTransaction(fileWithData, projectProperties){

        const nodesNames = ["WlascicielA", "WlascicielB"];
        const propsNamesA = ["Datazlecenia", "Nrroz.BankuA", "Datarealizacji"];
        const propsNamesB= ["Datazlecenia", "Datarealizacji", "Nrroz.BankuB"];
        const connectionNames = ["NrkontaA", "NrkontaB", "Kwotaprzelewu"];

        const serviceVisGraph = require('./../visModule/serviceVisGraph');
        const {GraphProperties, NodeAttributesNames, EdgeAttributesNames} = require('./../GraphProperties');

        let graphProperties = new GraphProperties(new NodeAttributesNames(connectionNames[0],nodesNames[0],propsNamesA),
            new NodeAttributesNames(connectionNames[1],nodesNames[1],propsNamesB),
            new EdgeAttributesNames(connectionNames[2]),true);

        serviceVisGraph.prepareAndDrawDataForVisGraph(fileWithData,projectProperties,graphProperties);
    }
};
