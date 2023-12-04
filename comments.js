// Create web server
// ==============================================

// Require express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;
const server = app.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
});

// Get data from MeaningCloud
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY;
const lang = '&lang=en';
const model = '&model=general';
const url = '&url=';

// Get data from MeaningCloud API
app.post('/sentiment', async (req, res) => {
    const userURL = req.body.userURL;
    const apiURL = `${baseURL}${apiKey}${lang}${model}${url}${userURL}`;
    const response = await fetch(apiURL);
    try {
        const data = await response.json();
        res.send(data);
    } catch (err) {
        console.log('error', err);
    }
});