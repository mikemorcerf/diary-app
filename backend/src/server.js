// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

// load all env variables from .env file into process.env object.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

//Set up Access-Control-Expose-Headers for cors requests so clients can see total logs in db
var corsOptions = {
  exposedHeaders: 'X-Total-Count'
}

app.use(cors(corsOptions));
app.use(express.json());

//Send api requests to src/routes.js
app.use('/api', require('./routes'));

app.listen(3333);