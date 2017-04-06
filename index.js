var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

io.on('connection', function (socket) {
	console.log('connection made');
});

app.get('/', function (req, res) {
  res.sendFile("index.html", {"root": __dirname});
});

app.post('/alert', function(req, res){
	console.log(req.body);
    io.emit('alert', req.body.msg);
    res.send('200 OK');
});

app.post('/log', function(req, res){
	console.log(req.body);
    io.emit('log', req.body.msg);
    res.send('200 OK');
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:' + process.env.PORT || 3000);
});

