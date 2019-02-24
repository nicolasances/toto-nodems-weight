var Controller = require('toto-api-controller');

var getWeightsDlg = require('./dlg/GetWeightsDelegate');
var postWeightDlg = require('./dlg/PostWeightDelegate');
var getWeightDlg = require('./dlg/GetWeightDelegate');
var deleteWeightDlg = require('./dlg/DeleteWeightDelegate');

var apiName = 'weight';

var api = new Controller(apiName);

api.path('GET', '/weights', getWeightsDlg);
api.path('POST', '/weights', postWeightDlg);
api.path('GET', '/weights/:id', getWeightDlg);
api.path('DELETE', '/weights/:id', deleteWeightDlg);

api.listen();
