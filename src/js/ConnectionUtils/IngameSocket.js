class IngameSocket {
    constructor (scene, playerData, playerObject){
       this.scene = scene;

       this.playerId = playerData.id;
       this.playerName = playerData.name;
       this.playerCharacter = playerData.character;

       this.playerObject = playerObject;
    }

    startConnection(){
        this.setupConnection(this);
    }

    setupConnection(scene){
        this.connection = new WebSocket('ws://127.0.0.1:8080/ingame');

        this.connection.onopen = function(e){
            console.log("Conexión abierta");

            //En el momento que establecemos conexión, tenemos que enviar nuestros datos
            scene.sendLoadConfirmation();
        }
        
        this.connection.onerror = function(e) {
            console.log("WS error: " + e);
        }

        this.connection.onmessage = function(msg) {
            var msg = JSON.parse(msg.data);

            //Procesamos el mensaje recibido
            //scene.processIncomingMessage(msg);
            scene.processIncomingMessage(msg);
        }

        
        this.connection.onclose = function() {
            console.log("Closing socket");
        }
    }

    // ================================== 
    // ENVIO DE MENSAJES 
    // ==================================

    //Confirmación de carga
    sendLoadConfirmation(){
        console.log("Id: "+this.playerId);
        console.log("name: "+this.playerName);
        console.log("character: "+this.playerCharacter);

        var msg = {
            "type": "LOADED",
            "id": this.playerId,
            "name": this.playerName,
            "character": this.playerCharacter
        };

        this.sendMessage(msg);
    }

    startUpdateTimer(){
        this.sendStatusTimer = this.scene.time.addEvent({ delay: 30, callback: this.sendCurrentStatus, callbackScope: this, loop: true });
    }

    sendCurrentStatus(){
        var movX = 0;
        if(this.playerObject.pressingRight && !this.playerObject.crouching)
            movX = 1;
        else if(this.playerObject.pressingLeft && !this.playerObject.crouching)
            movX = -1;

        var movY = 0;
        if(this.playerObject.pressingUp && !this.playerObject.crouching)
            movY = -1;
        else if(this.playerObject.pressingDown && !this.playerObject.crouching)
            movY = 1;

        var msg = {
            "type": "UPDATE_PLAYER_STATUS",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "movX": movX,
            "movY": movY
        };
        //En un futuro, meter más datos que mandar

        this.sendMessage(msg);
    }

    sendEnterCrouchState(){
        var msg = {
            "type": "ENTER_CROUCH_MODE",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendExitCrouchState(){
        var msg = {
            "type": "EXIT_CROUCH_MODE",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendBallPickupMessage(){
        var msg = {
            "type": "BALL_PICKUP",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "ballId": this.playerObject.ball.id
        };

        this.sendMessage(msg);
    }

    sendBallThrowMessage(dirX, dirY){
        var msg = {
            "type": "BALL_THROW",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "ballId": this.playerObject.ball.id,
            "dirX": dirX,
            "dirY": dirY
        };

        this.sendMessage(msg);
    }

    sendEnterHurtState(){
        var msg = {
            "type": "ENTER_HURT_STATE",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "life": this.playerObject.health
        };

        this.sendMessage(msg);
    }

    sendEliminatedState(){
        var msg = {
            "type": "ENTER_ELIMINATED_STATE",
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendMessage(msg){
        this.connection.send(JSON.stringify(msg));
    }

    // ================================== 
    // RECIBO DE MENSAJES 
    // ==================================

    processIncomingMessage(msg){
        //Actuaremos dependiendo del tipo del mensaje
        switch(msg.type){
            case "READY":
                this.placePlayersAndBalls(msg);
                break;
            case "UPDATE_GAME_STATE":
                this.updateGameState(msg);
                break;
            case "MATCH_END":
                break;
            case "ENTER_CROUCH_MODE":
                this.updatePlayerCrouchState(msg, true);
                break;
            case "EXIT_CROUCH_MODE":
                this.updatePlayerCrouchState(msg, false);
                break;
            case "BALL_PICKUP":
                this.updateBallPickState(msg);
                break;
            case "BALL_THROW":
                this.updateBallThrowState(msg);
                break;
            case "ENTER_HURT_STATE":

                break;
            case "ENTER_ELIMINATED_STATE":

                break;
        }

        //Seguramente habrá que añadir más opciones
        //como la de jugador dañado, lanzamientos, etc
    }

    placePlayersAndBalls(msg){

        var playersData = msg.players;
        var ballsData = msg.balls;

        console.log(playersData);

        //Posicionar jugadores y asignar los datos recibidos
        for(var i = 0; i < playersData.length; i++){
            //Buscamos en la lista de jugadores el jugador al que se corresponde
            var p = this.findPlayerById(playersData[i].id);

            p.x = playersData[i].posX;
            p.y = playersData[i].posY;
        }

        console.log(ballsData);

        //Generar bolas y posicionarlas con los datos recibidos
        for(var i = 0; i < ballsData.length; i++){
            console.log("bolindre");

            switch(ballsData[i].type){
                case 0:
                    this.scene.ballsList[i] = new BallBasket(this.scene, ballsData[i].id, ballsData[i].posX, ballsData[i].posY);
                    break;
                case 1:
                    this.scene.ballsList[i] = new BallBomb(this.scene, ballsData[i].id, ballsData[i].posX, ballsData[i].posY);
                    break;
                case 2:
                    this.scene.ballsList[i] = new BallTemporizedBomb(this.scene, ballsData[i].id, ballsData[i].posX, ballsData[i].posY);
                    break;
            }
        }

        this.startUpdateTimer();
        console.log("COMIENZA LA PARTIDA");

        this.scene.matchStarted = true;
    }

    updateGameState(msg){
        var playersData = msg.players;
        var ballsData = msg.balls;

        //Posicionar jugadores y asignar los datos recibidos
        for(var i = 0; i < playersData.length; i++){
            //Buscamos en la lista de jugadores el jugador al que se corresponde
            var p = this.findPlayerById(playersData[i].id);

            p.x = playersData[i].posX;
            p.y = playersData[i].posY;

            if(p.id != this.playerId){
                p.movX = playersData[i].movX;
                p.movY = playersData[i].movY;
            }
        }

        
        for(var i = 0; i < ballsData.length; i++){
            var b = this.findBallById(ballsData[i]);

            if(b == null){
                //Esta bola no está en la escena, lo más probable es que sea nueva
                this.scene.ballsList[this.scene.ballsList.length] = this.createNewBallFromData(ballsData[i]);
            }else{
                //Actualizamos su posición como toca
                //b.x = ballsData[i].posX;
                //b.y = ballsData[i].posY;
            }

            this.scene.ballsList[i];
        }

        //Hay que comprobar también que no haya bolas en escena que sobran.
        /*
        for(var i = 0; i < this.scene.ballsList.length; i++){
            if(this.findBallById){

            }
        }
        */
    }

    createNewBallFromData(ballData, id){
        switch(ballData.type){
            case 0:
                return new BallBasket(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 1:
                return new BallBomb(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 2:
                return new BallTemporizedBomb(this.scene, ballData.id, ballData.posX, ballData.posY);
        }
    }

    findPlayerById(id){
        for(var i = 0; i < this.scene.playersList.length; i++){
            if(this.scene.playersList[i].id == id)
                return this.scene.playersList[i];
        }
        return null;
    }

    findBallById(id){
        for(var i = 0; i < this.scene.ballsList.length; i++){
            if(this.scene.ballsList[i].id == id)
                return this.scene.ballsList[i].id;
        }
        return null;
    }

    updatePlayerCrouchState(msg, state){
        var p = this.findPlayerById(msg.id);

        p.x = msg.posX;
        p.y = msg.posY;

        if(state)
            p.enterCrouchMode();
        else
            p.exitCrouchMode();
    }

    updateBallPickState(msg){
        var p = this.findPlayerById(msg.id);

        p.x = msg.posX;
        p.y = msg.posY;

        var ball = this.findBallById(msg.ballId);
        ball.x = msg.posX;
        ball.y = msg.posY;
        p.pickBomb(ball);
    }

    updateBallThrowState(msg){
        var p = this.findPlayerById(msg.id);

        p.x = msg.posX;
        p.y = msg.posY;

        var ball = this.findBallById(msg.ballId);
        ball.x = msg.posX;
        ball.y = msg.posY;

        p.throwBall(ball, msg.dirX, msg.dirY);
    }
}