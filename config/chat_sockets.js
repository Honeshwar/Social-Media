
exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    //js is an events driven language
    io.sockets.on('connect',function(socket){
        console.log('new connection is received',socket.id);// when receive emit(start to(or the) connect) req and it automatically fired an connect event than automatically send back req for an acknowledge to Front-end (say it is connected)
    });

    io.sockets.on('disconnect',function(){//when client is disconnect (socket ) than automatically an  disconnection  event is fired( take place from BE)
        console.log('socket disconnect');
    });
    


}