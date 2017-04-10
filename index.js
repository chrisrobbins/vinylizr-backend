const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

var router = require('./services/router');

if (process.env.NODE_ENV=='production') {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://chrisrobbins:Jaguar85@ds055626.mlab.com:55626/vinyl-collection');
}

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 3000;

console.log('Listening on', PORT);
app.listen(PORT);
