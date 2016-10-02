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
  name: { type: String, required: true },
  phone: { type: String, required: true }

});
var ListModel = mongoose.model('List', List);
module.exports.ListModel = ListModel;



// Получить список
app.get('/api/phones', function(req, res) {
  return ListModel.find(function (err, list) {
    if (!err) {
      return res.send({status:'Current phone number list:', list:list});
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});


// Добавить запись в список
app.post('/api/phones', function(req, res) {
  var list = new ListModel({
    name: req.body.name,
    phone: req.body.phone
  });
  list.save(function (err) {
    if (!err) {
      return res.send({ status: 'New phone number successfully created', Record:list });
    } else {
      console.log(err);
    }
  });
});


//Автозаполнить список
app.put('/api/phones', function(req, res) {
  var data = [
    {"name":"gleb", "phone":"1111111"},
    {"name":"igor", "phone":"1111112"},
    {"name":"andrey", "phone":"1111113"},
    {"name":"stas", "phone":"1111114"},
    {"name":"anton", "phone":"1111115"},
    {"name":"irina", "phone":"1111116"},
    {"name":"maksim", "phone":"1111117"},
    {"name":"petr", "phone":"1111118"},
    {"name":"anna", "phone":"1111129"},
    {"name":"lena", "phone":"1111139"},
    {"name":"vadim", "phone":"1111149"},
    {"name":"roma", "phone":"1111169"},
    {"name":"viktor", "phone":"1115129"},
    {"name":"lina", "phone":"1111659"},
    {"name":"vadimius", "phone":"1811149"},
    {"name":"monika", "phone":"1911169"},
    {"name":"sadman", "phone":"2311129"},
    {"name":"vasiliy", "phone":"7156459"},
    {"name":"manson", "phone":"1916169"},
    {"name":"vetal", "phone":"2315129"},
    {"name":"moncubus", "phone":"91564959"},
    {"name":"david", "phone":"23151289"},
    {"name":"klim", "phone":"91569459"}
  ];

  data.forEach( function(item){
    var list = new ListModel({
      name: item.name,
      phone: item.phone
    });
    list.save(function (err) {
      console.log("new phone append");
    });
  });
  return res.send('Phone number list is full');
});


// Очистить список
app.del('/api/phones', function(req, res) {
  ListModel.find(function (err, list) {
    list.forEach(function(item){
      item.remove();
    });
    return res.send('Phone number list successfully removed');
  });
});




// получить номер
app.get('/api/phone/:id', function(req, res) {
  res.send('получить номер');
});

// Изменить номер
app.put('/api/phone/:id', function(req, res) {
  res.send('Изменить номер');
});

// Удалить номер
app.del('/api/phone/:id', function(req, res) {
  res.send('Удалить номер');
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
