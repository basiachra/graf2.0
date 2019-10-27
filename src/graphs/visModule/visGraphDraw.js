module.exports = {
    drawVisGraph: function (datas) {

        //     let now = require('performance-now');
        //     let t1 = now();
        //
        //     let allNodes;
        //     let highlightActive = false;
        //     let network;
        //
        //     let container = document.getElementById('myNetwork');
        //     let nodes = datas[0];
        //
        //
        //     function redrawAll() {
        //
        //         let isSet = true;
        //
        //         //init zmiennych do rysowania
        //         let data = {
        //             nodes: datas[0],
        //             edges: datas[1]
        //         };
        //         let options = {
        //             edges: {
        //                 arrows: {
        //                     to: true
        //                 },
        //                 color: {
        //                     highlight: '#ff2070',
        //                     inherit: 'from'
        //                 }
        //             },
        //             nodes: {
        //                 shape: 'dot',
        //                 size: 16,
        //                 color: {
        //                     highlight: '#ff2070'
        //                 }
        //             },
        //             physics: {
        //                 forceAtlas2Based: {
        //                     gravitationalConstant: -26,
        //                     centralGravity: 0.005,
        //                     springLength: 230,
        //                     springConstant: 0.18
        //                 },
        //                 maxVelocity: 146,
        //                 solver: 'forceAtlas2Based',
        //                 timestep: 0.35,
        //                 stabilization: {iterations: 350}
        //             },
        //             layout: {improvedLayout: false}
        //         };
        //         //network = new vis.Network(container, data, options);
        //
        //
        //         network.on("doubleClick", function () {
        //             isSet = !isSet;
        //             network.setOptions({physics: !isSet});
        //         });
        //
        //         allNodes = datas[0].get({returnType: "Object"});
        //
        //         //po kliknięciu na noda aktywujemy funkcję flow
        //         network.on("click", flow);
        //
        //     }
        //
        //
        //     function flow(params) {
        //
        //         if (params.nodes.length > 0) {
        //
        //             highlightActive = true;
        //
        //             let i, j;
        //             let selectedNode = params.nodes[0];
        //             let degrees = 2;
        //
        //             //allNode to tablica wszystkich nodów - zmieniamy kolor na szary
        //             for (let nodeId in allNodes) {
        //                 allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
        //             }
        //
        //             //bierzemy wszystkich sąsiadów
        //             let connectedNodes = network.getConnectedNodes(selectedNode, 'to');
        //             let allConnectedNodes = connectedNodes;
        //
        //             //bierzemy sąsiadów sąsiadów
        //             for (i = 1; i < degrees; i++) {
        //                 connectedNodes = network.getConnectedNodes(selectedNode, 'to');
        //                 for (j = 0; j < connectedNodes.length; j++) {
        //                     allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j], 'to'));
        //                 }
        //             }
        //
        //             //zmieniamy kolor sąsiadów
        //             for (i = 0; i < allConnectedNodes.length; i++) {
        //                 allNodes[allConnectedNodes[i]].color = '#ff0058';
        //             }
        //
        //             //zmieniamy kolor wybranego wierzchołka
        //             allNodes[selectedNode].color = '#c20044';
        //             document.getElementById("node-name").innerHTML = "Właściciel \n" + allNodes[selectedNode].label;
        //             document.getElementById("info-1").innerHTML = "Numer Konta \n" + allNodes[selectedNode]["nrKonta"];
        //             document.getElementById("info-2").innerHTML = "Numer Banku \n" + allNodes[selectedNode]["nrBanku"];
        //             console.log(allConnectedNodes);
        //         }
        //
        //         else if (highlightActive === true) {
        //
        //             //jeśli jest aktywny highlight a nie klikniemy na noda to kolory wracają do defaultowych
        //             for (let nodeId in allNodes) {
        //                 allNodes[nodeId].color.border = '#2B7CE9';
        //                 allNodes[nodeId].color.backgroundd = '#D2E5FF';
        //             }
        //             highlightActive = false;
        //         }
        //
        //         //zapisujemy zmiany do tablicy
        //         let updateArray = [];
        //         // for (nodeId in allNodes) {
        //         //     if (allNodes.hasOwnProperty(nodeId)) {
        //         //         updateArray.push(allNodes[nodeId]);
        //         //     }
        //         // }
        //
        //         //updatujemy data set
        //         nodes.update(updateArray);
        //
        //     }
        //
        //     //rysuje zmiany
        //     redrawAll();
        //
        // },

        return null;
    }
};
