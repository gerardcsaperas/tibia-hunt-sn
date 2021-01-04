const schedule = require('node-schedule');
const characterController = require('../api/controllers/character');

const j = schedule.scheduleJob({ hour: 10 }, characterController.updateTibiaData);

//HERE
const i = schedule.scheduleJob('*/5 * * * * *', () => {
    console.log('works')
})