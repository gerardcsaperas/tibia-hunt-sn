require('dotenv').config();
const fs = require('fs');
const routesDir = '/api/routes/';
const express = require('express');
const cors = require('cors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;