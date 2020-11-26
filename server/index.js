var express = require('express');
var app=express();
var server=require('http').Server(app);
var io = require('socket.io')(server);

//Middleware
app.use(express.static('client'));


//Crear ruta:
app.get('/hola-mundo',function(req,res){
    res.status(200).send("Hola mundo desde una ruta");
});

var messages=[{
    id:1,
    text:'Bienvenido al chat privado de socket.io y NodeJs',
    nickname:'Bot DALS'
}];

io.on('connection',function(socket){
    console.log("El nodo con IP:"+socket.handshake.address+" se ha conectado...");
    socket.emit('messages',messages);
    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);    
    });

});

//servidor o:
server.listen("process.env.PORT",function(){
    console.log("Servidor funcionando en Http://localhost:6677/");
});
