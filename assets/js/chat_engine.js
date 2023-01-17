class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);//string that by using ${}
        this.userEmail = userEmail;

        this.socket =  io.connect('http://localhost:5000');//emit ,io ,connect() func present in cdn socket.io already present
        //when i do io.connect() an socket req to server ,to establish an socket connection
        //automatically req to server

        if(this.userEmail){

        }
    }

 //js is an events driven language
    connectionHandler(){// that tell us socket connect is connect or not
        this.socket.on('connect',function(){//server receive an emit req than pass req to front-end  whether it connect or not
            console.log('connection established using sockets....!');
            
        })
    }
}