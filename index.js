var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 5000

app.get('/', function(req, res){
  res.send('<h1>Testando o backend do realtime editor</h1>');
});

io.on('connection', function(client){
    client.on('user connect', function(room){
        console.log('cliente '+client.id+' entrou na sala '+room);
        client.join(room);
        client.on('document change', function(html){
            client.to(room).emit('update document', html)
        })   
    })

    client.on('disconnect', function(){
        console.log('usuário '+client.id+' saiu')
    }) 
});

http.listen(PORT, function(){
    console.log(`listening on *:5000`);
});
