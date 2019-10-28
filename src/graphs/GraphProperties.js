class NodeAttributesNames {
    constructor(uniqueValue, nodeNames, otherInfoNames) {
        this.uniqueValue = uniqueValue;
        this.nodeNames = nodeNames;
        this.otherInfoNames = otherInfoNames;
    }
    getUniqueValue(){
        return this.uniqueValue;
    }
    getNodeName(){
        return this.nodeNames;
    }
    getOtherInfoNames(){
        return this.otherInfoNames;
    }
}
class EdgeAttributesNames{
    constructor(edgeLabel, connectionNames) {
        this.edgeLabel = edgeLabel;
        this.connectionNames = connectionNames;
    }
    getEdgeLabel(){
        return this.edgeLabel;
    }
    getConnectionNames(){
        return this.connectionNames;
    }
}

class GraphProperties{
    constructor(baseNodeAttributesNames, connectorNodeAttributesNames, edgeAttributesNames, isAllowGrouping) {
        this.baseNodeAttributesNames = baseNodeAttributesNames;
        this.connectorNodeAttributesNames = connectorNodeAttributesNames;
        this.edgeAttributesNames = edgeAttributesNames;
        this.isAllowGrouping = isAllowGrouping;
    }
    getBaseNodeAttributesNames(){
        return this.baseNodeAttributesNames;
    }
    getConnectorNodeAttributesNames(){
        return this.connectorNodeAttributesNames;
    }
    getEdgeAttributesNames(){
        return this.edgeAttributesNames;
    }
    getIsAllowGrouping(){
        return this.isAllowGrouping;
    }
}

module.exports = {
    GraphProperties,
    NodeAttributesNames,
    EdgeAttributesNames
};