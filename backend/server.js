const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes for devices
app.get('/api/dispositivos', db.getDispositivos);
app.post('/api/dispositivos', db.createDispositivo);
app.delete('/api/dispositivos/:id', db.deleteDispositivo);

// Routes for users
app.post('/api/register', db.registerUser);
app.post('/api/login', db.loginUser);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});