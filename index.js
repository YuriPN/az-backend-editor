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

const colors = ["#c06b74",
"#3cc755",
"#9841b8",
"#76c140",
"#585ed8",
"#d6ba25",
"#3c4dbb",
"#b7c234",
"#9f6ee8",
"#41972d",
"#cd6be3",
"#6fc565",
"#c02f9f",
"#3fc77f",
"#ef69cf",
"#358638",
"#617ff7",
"#ddad39",
"#2f65d0",
"#a1c152",
"#7048b1",
"#969b2a",
"#554baa",
"#e08b28",
"#3f86e3",
"#e2672a",
"#3dbde5",
"#c83923",
"#4ad3b1",
"#e72e6a",
"#7cc283",
"#eb53a5",
"#5a7c1b",
"#d885e0",
"#445a06",
"#8a52ae",
"#7b9e4b",
"#a13386",
"#347f4e",
"#d1377d",
"#5dbc9f",
"#e6514f",
"#46c6cd",
"#af2c3f",
"#43956d",
"#cb5cae",
"#5e7222",
"#666ac8",
"#a17c1c",
"#9889e3",
"#6a6914",
"#7155a7",
"#e3a451",
"#494b93",
"#cbb464",
"#346bb2",
"#b86e2d",
"#6999e5",
"#a4491b",
"#71b5ea",
"#704b0c",
"#6462ad",
"#afb973",
"#934d92",
"#578040",
"#e4a4e8",
"#415a1f",
"#b97bbd",
"#296437",
"#dc566e",
"#288f88",
"#e578a5",
"#226a4d",
"#bb5683",
"#536c31",
"#355799",
"#ed8a66",
"#4388ba",
"#705d18",
"#aaa4e3",
"#885d25",
"#766ea8",
"#8d8542",
"#805391",
"#e5ac79",
"#445082",
"#bc8755",
"#576196",
"#c96e57",
"#5e622c",
"#ea9bc0",
"#886e3f",
"#973763",
"#995b36",
"#a56a95",
"#874327",
"#e88d8c",
"#864863",
"#ad5149",
"#964550"]

function getColor(){
    var id = Math.floor(Math.random()*colors.length);
    var color = colors[id];
    for(var i = colors.length-1;i>=0;i--)
        colors.splice(id, 1);
    return color;
}

io.on('connection', function(client){
    client.on('test', function(){
        console.log('testado')
    })
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
