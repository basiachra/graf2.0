class VisGraphData{
    constructor(nodeSet,connectionSet){
        this.nodeSet = nodeSet;
        this.connectionSet = connectionSet;
    }
    mergeData(){
        return [this.nodeSet, this.connectionSet];
    }
};

module.exports = VisGraphData;