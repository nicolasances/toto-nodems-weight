var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");

var getWeightsDlg = require('./dlg/GetWeightsDelegate');
var postWeightDlg = require('./dlg/PostWeightDelegate');
var getWeightDlg = require('./dlg/GetWeightDelegate');
var deleteWeightDlg = require('./dlg/DeleteWeightDelegate');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, GoogleIdToken");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());

app.get('/', function(req, res) {res.send({status: 'running'});});
app.get('/Weights', function(req, res) {getWeightsDlg.getWeights().then(function(result) {res.send(result);});});
app.post('/Weights', function(req, res) {postWeightDlg.postWeight(req.body).then(function(result) {res.send(result);});});
app.get('/Weights/:id', function(req, res) {getWeightDlg.getWeight(req.params.id).then(function(result) {res.send(result);});});
app.delete('/Weights/:id', function(req, res) {deleteWeightDlg.deleteWeight(req.params.id).then(function() {res.send()});});

app.listen(8080, function() {
  console.log('Weights Microservice up and running');
});
