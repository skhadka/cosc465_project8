var express = require('express.io');
var app = express().http().io();

var baseurl = "http://localhost:3000"; // default development URL
if (process.env.BASE_URL) {            // if env var is set, use it
  baseurl = process.env.BASE_URL;
}
var url = require('url');
var port = url.parse(baseurl).port;    // parse out the port number
if (process.env.PORT) {
    port = process.env.PORT;
}
console.log("Using baseurl: " + baseurl);
console.log("Port: " + port);

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'secretkeywhichmustnotbenamed'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// set up socket.io routes
var perftests = require('./perftests.js');
app.io.route('ping', perftests.ping);
app.io.route('latency_test', perftests.latency_test);
//
app.io.route('upload_ping', perftests.upload_ping);
app.io.route('upload_test', perftests.upload_test); //

// set up "normal" http routes
var views = require('./views.js');
app.get('/', views.index);
app.get('/tests', views.tests);
app.get('/upload', views.upload);
app.get('/download', views.download);

app.listen(port);
console.log("App started on port " + port);
