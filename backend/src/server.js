// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//Send api requests to src/routes.js
app.use('/api', require('./routes'));

app.listen(3333);