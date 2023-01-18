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
             chatroom:'socials room'
            });


        // receive an req( event + data) from server when it emit, now it detect event ,which event is this
        self.socket.on('user_joined',function(data){
            console.log(' a Anew user joined ',data);
        })


    }
}