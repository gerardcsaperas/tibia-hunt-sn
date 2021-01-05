function queryToMongoFilter(queryParams) {
    var andFilter = []
    let filter = {
        conditions: {}
    };

    if (Array.isArray(queryParams.fields) && Array.isArray(queryParams.values)) {
        for (var i = 0; i < queryParams.fields.length; i++) {
            if (queryParams.values[i]) {
                let fieldName = queryParams.fields[i]
                let value = { $regex: queryParams.values[i], $options: 'i' }
                andFilter.push({
                    [fieldName]:value
                })
            }
        }
    }

    else if (queryParams.fields && queryParams.values) {
        let fieldName = queryParams.fields
        let value = { $regex: queryParams.values, $options: 'i' }
        andFilter.push({
            [fieldName]:value
        })
    }

    if (andFilter.length > 0){
        filter["conditions"]["$and"] = andFilter
    } else {
        filter["conditions"]["$and"] = [];
    }

    if (queryParams.offset && queryParams.limit) {
        filter.offset = parseInt(queryParams.offset);
        filter.limit = parseInt(queryParams.limit);
    }
    
    return filter;
}

module.exports = {
    queryToMongoFilter
}