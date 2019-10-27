const FILTEROPERATIONS = {
    EQUAL: "equal",
    NOTEQUAL: "notEqual",
    GREATHERTHAN: "greaterThan",
    LESSTHAN: "lessThan",
    NOTEQUAL: "notEqual",
    MATCHANY: "matchAny",
    MATCHANYNOT: "matchAnyNot",
    ORDERBY: "orderBy",
    AGGREGATION: "aggregation"
};
module.exports = FILTEROPERATIONS;

module.exports = {

    filterFunction: function (collection, fieldName, specifiedValue, declaredOperation, presentationOfResultOption) {
      //  const filterOperations = require(FILTEROPERATIONS);
        let mainQuery = {};
        let resultQuerySpecification = {};
        if(declaredOperation==FILTEROPERATIONS.EQUAL) mainQuery = this.buildQueryForEqualOperator(fieldName,specifiedValue);
        else if(declaredOperation==FILTEROPERATIONS.NOTEQUAL) mainQuery = this.buildQueryForNotEqualOperator(fieldName,specifiedValue);
        else if(declaredOperation == FILTEROPERATIONS.GREATHERTHAN) mainQuery = this.buildQueryForGreaterThanOperator(fieldName,specifiedValue);
        else if(declaredOperation == FILTEROPERATIONS.LESSTHAN) mainQuery = this.buildQueryForLessThanOperator(fieldName,specifiedValue);
        else if(declaredOperation == FILTEROPERATIONS.MATCHANY) mainQuery = this.buildQueryForMatchAnyOperator(fieldName,specifiedValue);
        else if(declaredOperation == FILTEROPERATIONS.MATCHANYNOT) mainQuery = this.buildQueryForMatchAnyNotOperator(fieldName,specifiedValue);

        if(presentationOfResultOption == FILTEROPERATIONS.AGGREGATION) resultQuerySpecification = {};
        else if(presentationOfResultOption == FILTEROPERATIONS.ORDERBY) resultQuerySpecification = this.buildQueryOrderOperator(fieldName,true);

      console.log(collection.find(mainQuery,resultQuerySpecification));
    },
    buildQueryForEqualOperator: function (fieldName, specifiedValue) {
        let eqQuery ={
            node:{
                [fieldName]:{
                    $eq: specifiedValue
                }
            }
        }
        return eqQuery;
    },

    buildQueryForGreaterThanOperator: function (fieldName, specifiedValue) {
        let gteQuery ={
            node:{
                [fieldName]:{
                    $gte: specifiedValue
                }
            }
        }
        return gteQuery;
    },

    buildQueryForLessThanOperator: function (fieldName, specifiedValue) {
        let lteQuery ={
            node:{
                [fieldName]:{
                    $lte: specifiedValue
                }
            }
        }
        return lteQuery;
    },

    buildQueryForNotEqualOperator: function (fieldName, specifiedValue) {
        let neQuery ={
            node:{
                [fieldName]:{
                    $ne: specifiedValue
                }
            }
        }
        return neQuery;
    },

    buildQueryForMatchAnyOperator: function (fieldName, specifiedValuesTable) {
        let inQuery ={
            node:{
                [fieldName]:{
                    $in: specifiedValue
                }
            }
        }
        return inQuery;
    },

    buildQueryForMatchAnyNotOperator: function (fieldName, specifiedValuesTable) {
        let ninQuery ={
            node:{
                [fieldName]:{
                    $nin: specifiedValue
                }
            }
        }
        return ninQuery;
    },

    buildQueryOrderOperator: function (fieldName, isAscending) {
        let orderDefinition = 1;
        if(isAscending) {
            orderDefinition = 1;
        }else{
            orderDefinition = -1;
        }
        let orderByQuery ={
        $orderBy:{
            node:{
                [fieldName]: orderDefinition
            }
        }
        }
        return orderByQuery;
    },
}