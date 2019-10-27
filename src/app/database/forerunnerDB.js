const ForerunnerDB = require("forerunnerdb");

module.exports = {

    initDataBase: function (dataBaseName, pathToData) {


        let fdb = new ForerunnerDB();

        //DB name
        let db = fdb.db(dataBaseName);

        //path to saved data files
       // db.persist.dataDir(pathToData);
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
            //    console.log("Udało się zapisać dane do pliku")
            }
        });
        console.log("Dodane");
    },

    //loading data
    loadDataBase: function(jsonCollection) {

        jsonCollection.load(function (err) {
            if (!err) {
                console.log("Ładowanie danych z bazy udane")
            }
        });
    }
};
