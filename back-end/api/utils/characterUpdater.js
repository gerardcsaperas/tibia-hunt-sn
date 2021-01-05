const schedule = require('node-schedule');
const characterController = require('../controllers/character');

function characterUpdater() {
    const j = schedule.scheduleJob('0 6 * * *', () => { // Execute daily at 6 AM
        characterController.updateTibiaData()
    })
}


module.exports = {
    characterUpdater
}