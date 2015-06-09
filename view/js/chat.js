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

  //Changement de room
  $('#roomlist').click(function () {
    alert("plop");
    //socket.emit('changeroom', event.target.text());
  });

  //Creation d'un nouveau salon
  $('#addroom').click(function () {
    var room = prompt("Room name");
    if (room)
      socket.emit('newroom', room);
  });

  //Reception message serveur
  socket.on('res', function (user, res) {
    $('#chat').append($('<li>').text(user + ': ' + res));
  });

  //Ajout d'un salon part un utilisateur
  socket.on('roomlist', function (list) {
    $('li').remove('#roomlist');
    for (var i = 0; i < list.length; i++) {
      $('.dropdown-menu').prepend('<li id="roomlist"><a href="#">' + list[i] + '</a></li>');
    }
  });

  //Update de la room du chat
  socket.on('updateroom', function (nameroom) {
    $('#room').empty();
    $('#room').append(nameroom);
  });

})
