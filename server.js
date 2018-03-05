var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//just for socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);


var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/fcsRoutes'); //importing route
routes(app); //register the route

//https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
//app.listen(port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

console.log('todo list RESTful API server started on: ' + port);
