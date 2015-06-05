var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/view'));

app.get('/', function(req, res) {

  res.sendFile(__dirname + '/view/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  /**
   ** L'utilisateur rejoins le chat
   */
  socket.on('adduser', function (username) {
    socket.username = username;
    socket.room = 'general';
    socket.join(socket.room);
    socket.emit('res', 'SERVER', 'you have connected to general');
    socket.broadcast.to(socket.room).emit('res', 'SERVER', username + ' has connected to this room');
    socket.emit('updateroom', socket.room);
  });

  /**
   ** Déconection d'un utilisateur
   */
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  /**
   ** Un utilisateur envoi un message
   */
  socket.on('msg', function (msg) {
    io.sockets.in(socket.room).emit('res', socket.username, msg);
  });

})

http.listen(3000, function () {
  console.log('listening on *:3000');
})
