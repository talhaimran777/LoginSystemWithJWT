const express = require('express');
const app = express();

// Using a middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = app;
