const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//Send api requests to src/routes.js
app.use('/api', require('./src/routes'));

app.listen(3001);