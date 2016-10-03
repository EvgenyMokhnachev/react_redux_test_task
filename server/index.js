/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();


var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/react_test');
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('connection error:', err.message);
});
db.once('open', function callback () {
  console.log("Connected to DB!");
});
var Schema = mongoose.Schema;
var List = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});
var ListModel = mongoose.model('List', List);
module.exports.ListModel = ListModel;



// Получить список
app.get('/api/phones', function(req, res) {
  return ListModel.find(function (err, list) {
    if (!err) {
      return res.send({status: true, list:list});
    } else {
      return res.send({ status: false, error: err });
    }
  });
});


// Добавить запись в список
app.post('/api/phones', function(req, res) {
  var list = new ListModel({
    name: req.body.name,
    phone: req.body.phone
  });
  list.save(function (err, result) {
    if (!err) {
      return res.send({ status: true, contact: result.toObject() });
    } else {
      return res.send({ status: false, errors: {name: 'Unique'} });
    }
  });
});

// Удалить номер
app.del('/api/phone/:id', function(req, res) {
  let contactId = req.params.id;

  ListModel.findByIdAndRemove(contactId, function (errors, todo) {
    if(!errors) {
      res.send({status: true, _id: todo._id});
    } else {
      res.send({status: false, errors});
    }
  });
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});



// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
