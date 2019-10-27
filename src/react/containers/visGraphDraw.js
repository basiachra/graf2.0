import React, { Component, Fragment } from "react";
import Graph from "vis-react";
import * as DataBaseManagementProperties from "../../graphs/DataBaseManagementProperties";
import * as dataBaseManagement from "../../graphs/dataBaseManagement";
import {ProjectProperties} from "../../graphs/ProjectProperties";
var highlightActive = false;

let options = {
    layout: {
        randomSeed: 2
    },
    nodes: {
        fixed: {
            x: false,
            y: false
        },
        shape: "dot",
        size: 13,
        borderWidth: 1.5,
        borderWidthSelected: 2,
        font: {
            size: 15,
            align: "center",
            bold: {
                color: "#bbbdc0",
                size: 15,
                vadjust: 0,
                mod: "bold"
            }
        }
    },
    edges: {
        width: 0.01,
        color: {
            color: "#D3D3D3",
            highlight: "#797979",
            hover: "#797979",
            opacity: 1.0
        },
        arrows: {
            to: { enabled: true, scaleFactor: 1, type: "arrow" },
            middle: { enabled: false, scaleFactor: 1, type: "arrow" },
           // from: { enabled: true, scaleFactor: 1, type: "arrow" }
        },
        smooth: {
            type: "continuous",
            roundness: 0
        }
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -30000,
            centralGravity: 1,
            springLength: 70,
            avoidOverlap: 1
        },
        stabilization: { iterations: 2500 }
    },
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectable: false,
        selectConnectedEdges: false,
        zoomView: false,
        dragView: false
    }
};

export default class VisReact extends Component {
    setState(stateObj) {
        if (this.mounted) {
            super.setState(stateObj);
        }
    }
    componentWillMount() {
        this.mounted = true;
    }
    constructor(props) {
        super(props);
        this.events = {
            select: function(event) {
                var { nodes, edges } = event;
                console.log("Selected nodes:");
                console.log(nodes);
                console.log("Selected edges:");
                console.log(edges);
            },
            hoverNode: function(event) {
                this.neighbourhoodHighlight(event, this.props.searchData);
            },
            blurNode: function(event) {
                this.neighbourhoodHighlightHide(event);
            }
        };

        let dataBaseManagementProperties = dataBaseManagement.getDataBase("projectName","graphName","./configData");
        //console.log(dataBaseManagementProperties.find());

        let newGraph = {};
        newGraph.nodes =[]; // dataBaseManagementProperties.find(); //[{"id":400,"label":"Oleg–Olek Pryłowski","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Nrroz.BankuA":"10200003"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"}]},{"id":390,"label":"Ludomiła Gleb","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"12800003"}]},{"id":7.61030000651918e+25,"label":"Falisława Młynarczyk","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"10300006"}]},{"id":5.42030000368553e+25,"label":"Cúmheá Strabczewski","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"20300003"}]},{"id":5.16000003264484e+24,"label":"Daveth Narolski","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"16000003"}]},{"id":6.61050000227314e+25,"label":"Dargorad Dymitryszyn","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"10500002"}]},{"id":8.11140000032786e+25,"label":"Stasław Chorążyczewski","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"11400000"}]},{"id":8.71160000692228e+25,"label":"Blizbor Starke","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"11600006"}]},{"id":1.41540000426034e+25,"label":"Kielce Grefkiewicz","info":[{"Datazlecenia":"2018-01-04T23:00:00.000Z"},{"Datarealizacji":"2018-01-05T23:00:00.000Z"},{"Nrroz.BankuB":"15400004"}]}]
        newGraph.edges = [{"from":400,"to":7.92130000475495e+25},{"from":390,"to":500},{"from":7.61030000651918e+25,"to":390},{"from":5.42030000368553e+25,"to":600},{"from":5.16000003264484e+24,"to":6.61050000227314e+25},{"from":6.61050000227314e+25,"to":9.41280000345061e+25},{"from":8.11140000032786e+25,"to":7.15400004535293e+24},{"from":8.71160000692228e+25,"to":6.1168000074669e+25},{"from":1.41940000868084e+25,"to":2.17400006341013e+24},{"from":1.41540000426034e+25,"to":100}];
        this.state = {
            graph: newGraph,
            style: { width: "100%", height: "100%" },
            network: null
        };
        this.measure = this.measure.bind(this);
        this.events.hoverNode = this.events.hoverNode.bind(this);
        this.events.blurNode = this.events.blurNode.bind(this);
        this.neighbourhoodHighlight = this.neighbourhoodHighlight.bind(this);
        this.neighbourhoodHighlightHide = this.neighbourhoodHighlightHide.bind(
            this
        );
    }

    componentDidMount() {
        this.mounted = true;
        window.addEventListener("resize", this.measure);
    }

    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener("resize", this.measure);
    }

    measure(data) {
        console.log("measure");
        this.state.network.redraw();
        this.state.network.fit();
    }

    neighbourhoodHighlight(params, searchData) {
        let allNodes = this.state.graph.nodes;
        // let cloneNodes = allNodes.map(a => {return {...a}});
        let Nodes = new this.vis.DataSet(allNodes);
        let cloneNodes = Nodes.get({ returnType: "Object" });

        this.state.network.canvas.body.container.style.cursor = "pointer";
        // this.setState({cursor});

        if (params.node !== undefined) {
            highlightActive = true;
            let i, j;
            let selectedNode = params.node;
            let degrees = 1;

            for (var nodeId in cloneNodes) {
                cloneNodes[nodeId].color = "rgba(200,200,200,0.5)";
                if (cloneNodes[nodeId].hiddenLabel === undefined) {
                    cloneNodes[nodeId].hiddenLabel = cloneNodes[nodeId].label;
                    cloneNodes[nodeId].label = undefined;
                }
            }

            let connectedNodes = this.state.network.getConnectedNodes(selectedNode);
            let allConnectedNodes = [];
            // get the second degree nodes
            for (i = 1; i < degrees; i++) {
                for (j = 0; j < connectedNodes.length; j++) {
                    allConnectedNodes = allConnectedNodes.concat(
                        this.state.network.getConnectedNodes(connectedNodes[j])
                    );
                }
            }

            // all second degree nodes get a different color and their label back
            for (i = 0; i < allConnectedNodes.length; i++) {
                cloneNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.75)";
                if (cloneNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                    cloneNodes[allConnectedNodes[i]].label =
                        cloneNodes[allConnectedNodes[i]].hiddenLabel;
                    cloneNodes[allConnectedNodes[i]].hiddenLabel = undefined;
                }
            }

            // all first degree nodes get their own color and their label back
            for (let i = 0; i < connectedNodes.length; i++) {
                cloneNodes[connectedNodes[i]].color = undefined;
                if (cloneNodes[connectedNodes[i]]["hiddenLabel"] !== undefined) {
                    cloneNodes[connectedNodes[i]].label =
                        cloneNodes[connectedNodes[i]]["hiddenLabel"];
                    const fontSize = this.state.network.body.nodes;
                    fontSize[connectedNodes[i]].options.font.size = 15;
                    cloneNodes[connectedNodes[i]]["hiddenLabel"] = undefined;
                }
            }

            // the main node gets its own color and its label back.
            cloneNodes[selectedNode].color = undefined;
            if (cloneNodes[selectedNode]["hiddenLabel"] !== undefined) {
                cloneNodes[selectedNode].label =
                    cloneNodes[selectedNode]["hiddenLabel"];
                const fontSize = this.state.network.body.nodes;
                fontSize[selectedNode].options.font.size = 15;
                // this.setState({fontSize})
                cloneNodes[selectedNode]["hiddenLabel"] = undefined;
            }
        } else if (highlightActive === true) {
            // reset all nodes
            for (let nodeId in cloneNodes) {
                cloneNodes[nodeId].color = undefined;
                if (cloneNodes[nodeId]["hiddenLabel"] !== undefined) {
                    cloneNodes[nodeId].label = cloneNodes[nodeId]["hiddenLabel"];
                    const fontSize = this.state.network.body.nodes;
                    fontSize[nodeId].options.font.size = 15;
                    this.setState({ fontSize });
                    cloneNodes[nodeId]["hiddenLabel"] = undefined;
                }
            }
            highlightActive = false;
        }

        let updateArray = [];
        for (let nodeId in cloneNodes) {
            if (cloneNodes.hasOwnProperty(nodeId)) {
                updateArray.push(cloneNodes[nodeId]);
            }
        }
        if (this.mounted) {
            this.setState({
                graph: {
                    nodes: updateArray,
                    edges: this.state.graph.edges
                }
            });
        }
    }

    neighbourhoodHighlightHide(params) {
        let allNodes = this.state.graph.nodes;

        let Nodes = new this.vis.DataSet(allNodes);
        let allNodess = Nodes.get({ returnType: "Object" });
        // let allNodess = allNodes.map(a => {return {...a}})
        this.state.network.canvas.body.container.style.cursor = "default";

        for (var nodeId in allNodess) {
            allNodess[nodeId].color = "rgba(200,200,200,0.5)";
            if (allNodess[nodeId].hiddenLabel === undefined) {
                allNodess[nodeId].hiddenLabel = allNodess[nodeId].label;
                allNodess[nodeId].label = undefined;
            }
        }

        highlightActive = true;
        if (highlightActive === true) {
            // reset all nodes
            for (var nodeIds in allNodess) {
                allNodess[nodeIds].color = '#98ddff';
                allNodess[nodeIds].borderColor = 'blue';
                if (allNodess[nodeIds].hiddenLabel !== undefined) {
                    allNodess[nodeIds].label = allNodess[nodeIds].hiddenLabel;
                    const fontSize = this.state.network.body.nodes;
                    fontSize[nodeIds].options.font.size = 15;
                    this.setState({ fontSize });
                    allNodess[nodeIds].hiddenLabel = undefined;
                }
            }
            highlightActive = false;
        }

        var updateArray = [];
        for (var nodeIde in allNodess) {
            if (allNodess.hasOwnProperty(nodeIde)) {
                updateArray.push(allNodess[nodeIde]);
            }
        }
        if (this.mounted) {
            this.setState({
                graph: {
                    nodes: updateArray,
                    edges: this.state.graph.edges
                }
            });
        }
    }

    getNetwork = data => {
        this.setState({ network: data });
    };
    getEdges = data => {
        console.log(data);
    };
    getNodes = data => {
        console.log(data);
    };
    render() {
        return (
            <Fragment>
                <div className="vis-react-title">vis react</div>
                <Graph
                    graph={this.state.graph}
                    style={this.state.style}
                    options={options}
                    getNetwork={this.getNetwork}
                    getEdges={this.getEdges}
                    getNodes={this.getNodes}
                    events={this.events}
                    vis={vis => (this.vis = vis)}
                    onClick={this.setState({})}
                />
            </Fragment>
        );
    }
}
