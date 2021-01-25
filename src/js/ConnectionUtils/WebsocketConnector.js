class WebSocketConnector {
    constructor (){
       
    }

    setupConnection(){
        this.connection = new WebSocket('ws://127.0.0.1:8080/chat');
    
        connection.onopen = function(e){

        }
        
        connection.onerror = function(e) {
            console.log("WS error: " + e);
        }

        connection.onmessage = function(msg) {
            console.log("WS message: " + msg.data);
            var message = JSON.parse(msg.data)


            $('#chat').val($('#chat').val() + "\n" + message.name + ": " + message.message);
        }


        connection.onclose = function() {
            console.log("Closing socket");
        }
    
        //Ejemplo de enviar mensaje (Sacado del ejercicio del chat)
        $('#send-btn').click(function() {
            var msg = {
                name : $('#name').val(),
                message : $('#message').val()
            }
            $('#chat').val($('#chat').val() + "\n" + msg.name + ": " + msg.message);
            connection.send(JSON.stringify(msg));
        });

    }

    sendLoginDataToServer(nick, character){
        var msg = {
            name : nick,
            character : character,
        }

        console.log(msg);

        this.connection.send(JSON.stringify(msg));
    }

}