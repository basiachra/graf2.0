const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();

module.exports = {

    prepareAndDrawDataForVisGraph: async function (collection, nodesNames, propsName, edgesNames) {

        const eventStreamModule = require('event-stream');
        const JSONStreamModule = require('JSONStream');
        const transferToJson = require('../../app/dataparse/excelToJson');
        const filtersModule = require('../../app/dataparse/filters');
        const dataBaseModule = require(`./../../app/database/forerunnerDB`.replace(/\\/g, '/'));
        const visGraphDrawModule = require(`./../visGraph`.replace(/\\/g, '/'));

        let projectName = "excelDataTest";
        let pathToData = "./configData";

        let db = dataBaseModule.initDataBase(projectName, pathToData);
        let collectionName = "json";
        let dataCollection = dataBaseModule.setCollection(db, collectionName);

        let result = transferToJson.parseDataFromExcelToJson(false, collection);

        let edges = [];

        let nodesSet = new vis.DataSet();
        let edgesSet = new vis.DataSet();

        let sheet = JSON.parse(JSON.stringify("Arkusz1"));

        let source = result[sheet];

        let stringResult = JSON.stringify(result);
        let Readable = require('stream').Readable;

        function chunkSplit(str) {
            return str.match(new RegExp('.{1,' + parseInt(str.length / 8) + '}', 'g'));
        }

        function chunkedStream(jsonStr) {
            let stream = new Readable();
            chunkSplit(jsonStr).forEach(function (chunk) {
                stream.push(chunk);
            });
            stream.push(null);
            return stream;
        };

        let getStream = function (dataJson, sheetNumber) {
            let jsonData = dataJson;
            stream = chunkedStream(jsonData);
            let parser = JSONStreamModule.parse([sheetNumber, true]); //numer arkusza, numer klucza czyli numer rekordu,wiersza,
            return stream.pipe(parser);                             //fieldName: specific field, lub true,gdy nie chcemy precyzować
        };

        let addNode = [];
        let graphCollectionName = collectionName + "graphJson";
        let graphCollection = dataBaseModule.setCollection(db, graphCollectionName);
        let s = getStream(stringResult, sheet)
            .pipe(eventStreamModule.mapSync(function (data) {

                    //użytkownik sam definuje co jest labelem, co ma być nad krawędzią itp
                    //TODO.............................................................
                    dataBaseModule.insertJson(dataCollection, data);
                    nodesNames.forEach((item, index) => {
                        let node = {
                            id: data[index === 0 ? edgesNames[0] : edgesNames[1]],
                            "label": data[item],
                            "nrKonta": data[index === 0 ? edgesNames[0] : edgesNames[1]],
                            "nrBanku": data[index === 0 ? propsName[1] : propsName[3]],
                            "rangeProperityValue": data[propsName[0]],
                        }
                        nodesSet.update(node);
                        addNode.push(node);
                        graphCollection.insert({"node": node});

                    });
                })
                    .on('error', function (err) {
                        console.log('Error while reading file.', err);
                    })
                    .on('end', function () {
                        console.log('Read entire file.');
                        dataBaseModule.saveDataBaseCollection(dataCollection);

                        for (let k = 0; k < source.length; k++) {

                            let f = nodesSet.get({
                                filter: function (item) {
                                    return (item.label === source[k][nodesNames[0]]);
                                }
                            });
                            let t = nodesSet.get({
                                filter: function (item) {
                                    return (item.label === source[k][nodesNames[1]]);
                                }
                            });
                            let edge = {
                                from: f[0].id,
                                to: t[0].id,
                                title: source[k][edgesNames[2]],
                            };
                            edges.push(edge);
                            graphCollection.insert({"edges": edge});

                        }

                        //usuwanie zdublowanych krawędzi
                        edges = edges.filter((values, index, self) =>
                            index === self.findIndex((t) => (
                                t.from === values.from && t.to === values.to
                            ))
                        );
                        edgesSet.update(edges);
                        let addEdges = JSON.parse(JSON.stringify({"edges": edges}));

                        let data = [nodesSet, edgesSet];

                        s.end();
                        myEmitter.emit('event');
                    })
            );
        //zwrócenie danych do rysowania
        let data = [await nodesSet, await edgesSet];
        console.log(data);

        dataBaseModule.saveDataBaseCollection(graphCollection);
        let test = filtersModule.filterFunction(graphCollection, "nrKonta", 390,"lessThan","");

        let data1 = [nodesSet, edgesSet];

       // visGraphDrawModule.drawVisGraph(data1);
    },

};
