var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");
var logger = require('toto-apimon-events');

var getWeightsDlg = require('./dlg/GetWeightsDelegate');
var postWeightDlg = require('./dlg/PostWeightDelegate');
var getWeightDlg = require('./dlg/GetWeightDelegate');
var deleteWeightDlg = require('./dlg/DeleteWeightDelegate');

var apiName = 'weight';

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());

app.get('/', function(req, res) {res.send({api: apiName, status: 'running'});});
app.get('/weights', function(req, res) {logger.apiCalled('weight', '/weights', 'GET', req.query, req.params, req.body); getWeightsDlg.getWeights(req.query.dateFrom).then(function(result) {res.send(result);});});
app.post('/weights', function(req, res) {logger.apiCalled('weight', '/weights', 'POST', req.query, req.params, req.body); postWeightDlg.postWeight(req.body).then(function(result) {res.send(result);});});
app.get('/weights/:id', function(req, res) {logger.apiCalled('weight', '/weights/{id}', 'GET', req.query, req.params, req.body); getWeightDlg.getWeight(req.params.id).then(function(result) {res.send(result);});});
app.delete('/weights/:id', function(req, res) {logger.apiCalled('weight', '/weights/{id}', 'DELETE', req.query, req.params, req.body); deleteWeightDlg.deleteWeight(req.params.id).then(function() {res.send()});});

app.listen(8080, function() {
  console.log('Weights Microservice up and running');
});
