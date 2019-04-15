var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 12345;

app.get('/', function(req, res){
  res.send(`
    <h1>Testando o backend do realtime editor</h1>
    <p>A aplicação está rodando na porta ${PORT}</p>
`);
});

const colors = []

function getColor(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  colors.push(color);
  return color;
}

io.on('connection', function(client){
    
    client.on('user connect', function(newConnection){

        var name = newConnection.user
        var room = newConnection.docId
        var clientId = client.id
        var color = getColor();

        client.join(room);

        io.to(room).emit('new user', {name, room, clientId,color});

        client.on('disconnect', function () {
            io.to(room).emit('user disconnected', {name, room, clientId});
        });
        client.on('document change', function(document){
            client.to(room).emit('update document', document);            
        });
    });
    client.on('others users on room', function(received){
        var users = received.users
        var toUser = received.toUser

        io.to(toUser).emit('users on room', users)
    });

    client.on('msg', function(msg, id){
        client.to(id).emit('user Message', msg);
    });
    
});


http.listen(PORT, function(){
    console.log(`listening on *:5000`);
});
