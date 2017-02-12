var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var userCount = 0;
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('An user connected');
    userCount ++;
    io.emit('userCount', userCount);
    socket.on('disconnect', function(){
        userCount --;
        io.emit('userCount', userCount);
    });
});

http.listen(port, function(){
    console.log('Running on port ' + port);
});
