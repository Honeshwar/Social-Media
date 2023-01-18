class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);//string that by using ${}
        this.userEmail = userEmail;

        //socket an connection
        this.socket =  io.connect('http://localhost:5000');// this connect to BE socket,req-->BE for connection
        //emit ,io ,connect() func present in cdn socket.io already present
        //when i do io.connect(server address) an socket req to server ,to establish an socket connection
        //automatically req to server

        if(this.userEmail){
           this.connectionHandler();//when server send something to FE than this event occur


        }
    }

 //js is an events driven language
    connectionHandler(){// that tell us socket connection is connected or not

        let self = this;//this belong class,because func this is nothing,refer outer this

        this.socket.on('connect',function(){//server receive an emit req than pass req to front-end  whether it connect or not
            console.log('connection established using sockets....!');
            
        });

        //send an req to join chat room
        self.socket.emit('join_room',{
            user_email:self.userEmail ,
             chatroom:'social room'
            });


        // receive an req( event + data) from server when it emit, now it detect event ,which event is this
        self.socket.on('user_joined',function(data){
            console.log(' a Anew user joined ',data);
        })


        // get message from html and sent to server(observer)

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();//[name='chat-message-input'] now i change id="chat-message-input"
            
            console.log('message ',msg);

         if(msg != ''){
            self.socket.emit('send_message',{//send req(with event + data) to server(localhost:5000) socket
                message:msg,
                user_email:self.userEmail,
                chatroom:'social room'
            });
        }

        
        });

        //receive event + data from server, when event matches,when server req to an receive_message event below on event get occur and get data
        self.socket.on('receive_message',function(data){ //on event
            
            console.log('message received ', data);
            let newMessage = $('<li>');
            let messageType = 'other-message';//same script both user have check for class(align provide)

            if(data.user_email == self.userEmail){//receive message belong to this user than align(class = self-message ,create at html)
                messageType = 'self-message'
            }

            newMessage.append($('<span>',{
                "html":data.message //instead of html also text
            }));
            newMessage.append($('<sub>',{//sub=subscript
                'html':data.user_email
            }));

            newMessage.addClass(messageType);
            $('#chat-message-list').append(newMessage);
        });

    }
}

//js event driven language 
// here in socket emit(send) and detection(receive and detect event in server socket/client script socket code)