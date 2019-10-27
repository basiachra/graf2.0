const ForerunnerDB = require("forerunnerdb");

module.exports = {

    initDataBase: (dataBaseName, pathToData) => {

        let fdb = new ForerunnerDB();

        //DB name
        let db = fdb.db(dataBaseName);

        //path to saved data files
        try {
            db.persist.dataDir(pathToData);
        }catch(e){console.log(e)}
        return db;
    },

    setCollection: function (db, collectionName) {

        // nazwa kolekcji jest stała
        return db.collection(collectionName).deferredCalls(false);
    },

    //insert data to DB
    insertJson: function(jsonCollection, jsonObject) {

        //definujemy co wrzucamy do bazy, na razie plik
        //let jsonFile = "./../../test.json";

        jsonCollection.insert(jsonObject);
        return jsonCollection;
    },

    //saving data to file
    saveDataBaseCollection: function(jsonCollection){

        jsonCollection.save(function (err) {
            if (!err) {
              console.log("Udało się zapisać dane do pliku")
            }
        });
        console.log("Dodane");
    },

    //loading data
    loadDataBase: async function(jsonCollection) {
     await jsonCollection.load(function (err) {
            if (!err) {
                console.log(jsonCollection.find());
                return jsonCollection.find();
            }
        });

     // const data = await jsonCollection.find();
     // console.log(data);
     // return data;
    }
};
