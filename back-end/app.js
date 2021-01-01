require('dotenv').config();
const fs = require('fs');
const routesDir = '/api/routes/';
const express = require('express');
const cors = require('cors');

// Database
require('./persistence/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Automatically parses incoming JSON as an object
app.use(express.json());
app.use(cors());

let routeFiles = fs.readdirSync(__dirname + routesDir);

routeFiles.forEach( fileName => {
    let route = require(__dirname + routesDir + fileName);
    app.use(route);
});

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});