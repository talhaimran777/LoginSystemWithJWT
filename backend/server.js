const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/login', (req, res) => {
  res.send('LOGIN RECIEVED');
});

module.exports = app;
