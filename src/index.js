const express = require('express');
const bodyParser = require('body-parser');
const searchUsersByEmail = require('./handlers/searchUsersByEmail');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/api/searchUsersByEmail', searchUsersByEmail);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js is listening to PORT:' + server.address().port);
});