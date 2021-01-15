require('dotenv').config();
const fs = require('fs');
const routesDir = '/api/routes/';
const express = require('express');
const cors = require('cors');

// Database
require('./persistence/db');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}));

const PORT = process.env.PORT || 5001;

// Automatically parses incoming JSON as an object
app.use(express.json());
app.use(cors());

let routeFiles = fs.readdirSync(__dirname + routesDir);

routeFiles.forEach( fileName => {
    let route = require(__dirname + routesDir + fileName);
    app.use(process.env.API_BASE_PATH, route);
});

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});