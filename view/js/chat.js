$(document).ready(function () {
  var socket = io();
  var name = '';

  //Connection au serveur reussi
  socket.on('connect', function () {
    if (name === '') {
      var username = prompt("Username");
      name = username;
      socket.emit('adduser', username);
      return (false);
    }
  });

  //Envoi du message au serveur
  $('#btn').click(function () {
    var msg = $('#msg').val();
    socket.emit('msg', msg);
    $('#msg').val('').focus();
    $('#chat').append($('<li>').text(name + ': ' + res));
    return (false);
  });

  //Reception message serveur
  socket.on('res', function (user, res) {
    $('#chat').append($('<li>').text(user + ': ' + res));
  });

  //Update de la room du chat
  socket.on('updateroom', function (nameroom) {
    $('#room').val('');
    $('#room').append(nameroom);
  });

})
