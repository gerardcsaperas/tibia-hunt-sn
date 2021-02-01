const { query } = require("../models/comment");

function queryToMongoFilter(queryParams) {
    let filter = {
        conditions: {
            $and: []
        }
    };

    for (const param in queryParams) {
        switch (param) {
            case 'level':
                queryParams[param] !== "" && filter.conditions.$and.push({ "teamComp.level": { $lte: queryParams[param] } })
                break;
            case 'expH':
                queryParams[param] !== "" && filter.conditions.$and.push({ "expH": { $gte: queryParams[param] } })
                break;
            case 'profitH':
                queryParams[param] !== "" && filter.conditions.$and.push({ "profitH": { $gte: queryParams[param] } })
                break;
            case 'vocation':
                switch (queryParams[param]) {
                    case 'Knight':
                        filter.conditions.$and.push({ "teamComp.vocation": { $in: ['Knight', 'EK'] } })
                        break;
                    case 'Paladin':
                        filter.conditions.$and.push({ "teamComp.vocation": { $in: ['Paladin', 'RP'] } })
                        break;
                    case 'Druid':
                        filter.conditions.$and.push({ "teamComp.vocation": { $in: ['Druid', 'ED'] } })
                        break;
                    case 'Sorcerer':
                        filter.conditions.$and.push({ "teamComp.vocation": { $in: ['Sorcerer', 'MS'] } })
                        break;
                    default:
                        break;
                }
                break;
            case 'difficulty':
                queryParams[param] !== "" && filter.conditions.$and.push({ "difficulty": queryParams[param] })
                break;
            case 'teamComp':
                switch (queryParams['teamComp']) {
                    case 'Solo':
                        filter.conditions.$and.push({ "teamComp": { $size: 1 } })
                        break;
                    case 'Duo':
                        filter.conditions.$and.push({ "teamComp": { $size: 2 } })
                        break;
                    case 'Trio':
                        filter.conditions.$and.push({ "teamComp": { $size: 3 } })
                        break;
                    case 'Full Team +':
                        filter.conditions.$and.push({ "teamComp": { $size: { $gte: 4 } } })
                        break;
                    default:
                        break;
                }
                break;
            case 'name':
                queryParams[param] !== "" && filter.conditions.$and.push({ "name": { $regex: queryParams[param], $options: 'i' }})
                break;
            case 'city':
                queryParams[param] !== "" &&  filter.conditions.$and.push({ "city": queryParams[param] })
                break;
            default:
                break;
        }
    }

    if (queryParams.offset) {
        filter.offset = parseInt(queryParams.offset);
    }

    if (queryParams.limit) {
        filter.limit = parseInt(queryParams.limit);
    }
    
    if (filter.conditions.$and.length === 0) {
        delete filter.conditions.$and;
    }

    return filter;
}

module.exports = queryToMongoFilter;