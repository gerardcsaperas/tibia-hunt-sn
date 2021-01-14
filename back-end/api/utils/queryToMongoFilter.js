const { query } = require("../models/comment");

function queryToMongoFilter(queryParams) {
    console.log('queryParams', queryParams);
    var andFilter = []
    let filter = {
        conditions: {
            $and: []
        }
    };

    for (const param in queryParams) {
        console.log(`${param}: ${typeof queryParams[param]}`);
        filter
    }

    if (andFilter.length > 0){
        filter["conditions"]["$and"] = andFilter
    }

    if (queryParams.offset) {
        filter.offset = parseInt(queryParams.offset);
    }

    if (queryParams.limit) {
        filter.limit = parseInt(queryParams.limit);
    }
    
    return filter;
}

module.exports = queryToMongoFilter;