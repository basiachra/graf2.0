module.exports = {

    drawVisGraphForProfessionals(fileWithData, projectProperties, graphProperties){
        const serviceVisGraph = require('./../visModule/serviceVisGraph');
        serviceVisGraph.prepareAndDrawDataForVisGraph(fileWithData,projectProperties,graphProperties);
    }
};
