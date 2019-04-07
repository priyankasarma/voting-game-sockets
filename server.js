'use strict';

const port = 3001;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

app.set('port', port);
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });/**/

    socket.on('vote', function(appState, callback){
        console.log('appState: ' + JSON.stringify(appState));
        io.emit('vote', appState);
        //callback(msg);
    });
});


http.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
});

