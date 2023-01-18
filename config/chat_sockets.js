//Access to XMLHttpRequest at 'http://localhost:5000/socket.io/?EIO=4&transport=polling&t=ON3wLmX' from origin 'http://localhost:8000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

exports.chatSockets = function(socketServer){// socketServer
    let io = require('socket.io')(socketServer, {
                cors: {// for access to  to xhr req from 5000 port too 8000 (to origin) //
                origin: "http://localhost:8000",
                methods: ["GET", "POST"]
                }
      });//socket need an server to established socket connection,import an func and pass it server

    //js is an events driven language
    io.sockets.on('connection',function(socket){ // socket(FE) = server//when new  socket connection is receive (from user front-end)
        console.log('new connection is received',socket.id);// when receive emit(start to(or the) connect) req(SEND) and it automatically fired an connect event than automatically send back req for an acknowledge to Front-end (say it is connected)
        //(io.connect(server address))FE-->BE-->FE
    

        socket.on('disconnect',function(){//disconnect happens when user close web application ,browser close,....(script remove FE)
            //when client is disconnect (socket ) than automatically an  disconnection  event is fired( take place from BE)
                console.log('socket disconnect');
        });


        //receive an req ( event and data) and check(detect) on event ,which event is this(from req ,down listed event detect)
        socket.on('join_room',function(data){
            console.log('join request received ',data );

            socket.join(data.chatroom);// user joined to chatroom ,if chatroom by this name data.chatroom='social room' exist it enter user into it ,if not exist than create new chat room, 
            // an array(chat room) inside it email of user store who who want  to join chat room

            //send  req to FE to notify all that new user is join a chat room, as notification to all user in chat room and also current join user(part of chat room),that some on is joined
            io.in(data.chatroom).emit('user_joined',data);//all  user in array sent notification that new user is join a chat room
        });
    
    });//all things inside connection because we want  connect established to do all things that done after connection

}