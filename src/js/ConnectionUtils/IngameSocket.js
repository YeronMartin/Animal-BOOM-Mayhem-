class IngameSocket {
    constructor (scene, playerData, playerObject, roomId){
       this.scene = scene;
       this.playerId = playerData.id;
       this.playerName = playerData.name;
       this.playerCharacter = playerData.character;

       this.playerObject = playerObject;

       this.room = roomId;
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

        
        this.connection.onclose = function(e) {
            console.log('ws is closed with code: ' + e.code + ' reason: ' + e.reason);
        }
    }

    // ================================== 
    // ENVIO DE MENSAJES 
    // ==================================

    //Confirmación de carga
    sendLoadConfirmation(){
        console.log("He cargado todo guay");

        var msg = {
            "type": "LOADED",
            "room": this.room,
            "id": this.playerId,
            "name": this.playerName,
            "character": this.playerCharacter
        };

        this.sendMessage(msg);
    }

    startUpdateTimer(){
        this.sendStatusTimer = this.scene.time.addEvent({ delay: 50, callback: this.sendCurrentStatus, callbackScope: this, loop: true });
    }

    sendCurrentStatus(){
        var movX = 0;
        var movY = 0;

        if(!this.playerObject.crouching && !this.playerObject.aiming && !this.playerObject.stunned){
            if(this.playerObject.pressingRight)
                movX = 1;
            else if(this.playerObject.pressingLeft)
                movX = -1;

            if(this.playerObject.pressingUp)
                movY = -1;
            else if(this.playerObject.pressingDown)
                movY = 1;
        }

        var msg = {
            "type": "UPDATE_PLAYER_STATUS",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "movX": movX,
            "movY": movY
        };

        //console.log(msg);

        this.sendMessage(msg);
    }

    sendEnterCrouchState(){
        console.log("Me agacho");

        var msg = {
            "type": "ENTER_CROUCH_MODE",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendExitCrouchState(){
        console.log("Me dejo de agachar");

        var msg = {
            "type": "EXIT_CROUCH_MODE",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendBallPickupMessage(){
        console.log("Envio de recoger bola: "+this.playerObject.ball.id);

        var msg = {
            "type": "BALL_PICKUP",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "ballId": this.playerObject.ball.id
        };

        this.sendMessage(msg);
    }

    sendEnterAimModeMessage(){
        console.log("Envio de Apuntado");

        var msg = {
            "type": "ENTER_AIM_MODE",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
        };

        this.sendMessage(msg);
    }

    sendBallThrowMessage(dirX, dirY){
        console.log("Envio de lanzar bola: "+this.playerObject.ball.id);

        //En caso de que hayamos lanzado una patata
        var potatoTime = 0;
        if(this.playerObject.ball.name == "BallTemporizedBomb")
            potatoTime = this.playerObject.ball.activationTime;

        var msg = {
            "type": "BALL_THROW",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "ballId": this.playerObject.ball.id,
            "potatoActivation": potatoTime,
            "dirX": dirX,
            "dirY": dirY
        };

        this.sendMessage(msg);
    }

    sendEnterHurtState(ballId){
        console.log("Me hirieron wey "+ballId);

        if(ballId == null)
            ballId = -1;


        var msg = {
            "type": "ENTER_HURT_STATE",
            "room": this.room,
            "id": this.playerId,
            "posX": this.playerObject.x,
            "posY": this.playerObject.y,
            "ballId": ballId,
            "life": this.playerObject.health
        };

        this.sendMessage(msg);
    }

    sentEnterOtherHurtState(ballId, dummyObject){
        console.log("Han herido a este wey con "+ballId);
        
        if(ballId == null)
            ballId = -1;

        var msg = {
            "type": "ENTER_HURT_STATE",
            "room": this.room,
            "id": dummyObject.id,
            "posX": dummyObject.x,
            "posY": dummyObject.y,
            "ballId": ballId,
            "life": dummyObject.health
        };

        this.sendMessage(msg);
    }

    sendEliminatedState(dummyObject){

        if(dummyObject != null){
            console.log("Este la palmó no mas");

            console.log(dummyObject.id+" ha muerto por "+dummyObject.killerId);

            if(dummyObject.killerId == null)
                dummyObject.killerId == -1;

            var msg = {
                "type": "ENTER_ELIMINATED_STATE",
                "room": this.room,
                "id": dummyObject.id,
                "posX": dummyObject.x,
                "posY": dummyObject.y,
                "killerId": dummyObject.killerId
            };

            this.sendMessage(msg);
        }else{
            console.log("Me morí no mas");

            var msg = {
                "type": "ENTER_ELIMINATED_STATE",
                "room": this.room,
                "id": this.playerId,
                "posX": this.playerObject.x,
                "posY": this.playerObject.y,
                "killerId": this.playerObject.killerId
            };

            this.sendMessage(msg);
        }
    }

    sendBallDeleted(id){
        console.log("Bola eliminada: "+id);

        var msg = {
            "type": "BALL_DELETED",
            "room": this.room,
            "id": id
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
            case "UPDATE_PLAYERS_STATE":
                this.updateGameState(msg);
                break;
            case "UPDATE_BALLS_STATE":
                this.updateBallsState(msg);
                break;
            case "GAME_OVER":
                this.startGameOverState(msg);
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
            case "ENTER_AIM_MODE":
                this.updateEnterAimMode(msg);
                break;
            case "ENTER_HURT_STATE":
                this.updateEnterHurtState(msg);
                break;
            case "ENTER_ELIMINATED_STATE":
                this.updateEnterEliminatedState(msg);
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
                case 3:
                    this.scene.ballsList[i] = new FlamingBall(this.scene, ballsData[i].id, ballsData[i].posX, ballsData[i].posY);
                    break;
                case 4:
                    this.scene.ballsList[i] = new BlackHoleBall(this.scene, ballsData[i].id, ballsData[i].posX, ballsData[i].posY);
                    break;
            }
        }

        this.startUpdateTimer();
        console.log("COMIENZA LA PARTIDA");

        this.scene.matchStarted = true;
    }

    updateGameState(msg){
        var playersData = msg.players;

        //Posicionar jugadores y asignar los datos recibidos
        for(var i = 0; i < playersData.length; i++){
            //Buscamos en la lista de jugadores el jugador al que se corresponde
            var p = this.findPlayerById(playersData[i].id);

            if(p == null)
                continue;
            
            p.x = playersData[i].posX;
            p.y = playersData[i].posY;

            if(p.id != this.playerId){
                p.movX = playersData[i].movX;
                p.movY = playersData[i].movY;
            }

            if(p.health != playersData[i].health){
                console.log("UN MOMEEENTO, yo tengo "+p.health+" y este dice que tengo "+playersData[i]);
                p.health = playersData[i].health;
            }

          
        }
    }

    updateBallsState(msg){
        var ballsData = msg.balls;

        for(var i = 0; i < ballsData.length; i++){
            var b = this.findBallById(ballsData[i].id);

            if(b == null){
                //Esta bola no está en la escena, lo más probable es que sea nueva
                console.log("Esta bola no está, tenemos "+this.scene.ballsList.length);
                this.scene.ballsList[this.scene.ballsList.length] = this.createNewBallFromData(ballsData[i]);
            }
        }


        if(ballsData.length > this.scene.ballsList.length){
            //Sobran bolas
            for(var i = 0; i < this.scene.ballsList.length; i++){
                //Buscar la pelota
                var b = this.findBallInData(ballsData, this.scene.ballsList[i].id);
                
                //Si no hay pelota, es que sobra
                if(b == null){
                    console.log("ELIMINADA");
                    this.scene.ballsList.splice(this.scene.ballsList.lastIndexOf(b), 1);
                }
            }
        }

        /*
        for(var i = 0; i < this.scene.ballsList.length; i++){
            for(var j = 0; j < ballsData.length; j++){
                if(this.findBallById() == null){

                }
            }
        }
        */
    }

    createNewBallFromData(ballData){
        switch(ballData.type){
            case 0:
                return new BallBasket(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 1:
                return new BallBomb(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 2:
                return new BallTemporizedBomb(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 3:
                return new FlamingBall(this.scene, ballData.id, ballData.posX, ballData.posY);
            case 4:
                return new BlackHoleBall(this.scene, ballData.id, ballData.posX, ballData.posY);
        }
    }

    findBallInData(data, id){
        for(var i = 0; i < data.length; i++){
            if(data[i].id == id)
                return data[i];
        }
        return null;
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
            if(this.scene.ballsList[i] == null)
                continue;

            if(this.scene.ballsList[i].id == id)
                return this.scene.ballsList[i];
        }
        return null;
    }

    updatePlayerCrouchState(msg, state){
        console.log("Un dummy se agacha");

        var p = this.findPlayerById(msg.id);

        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
    
            if(state)
                p.enterCrouchMode();
            else
                p.exitCrouchMode();
        }
    }

    updateBallPickState(msg){
        console.log("Un dummy ha recogido una bola");
        var p = this.findPlayerById(msg.id);

        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
        }

        var ball = this.findBallById(msg.ballId);

        if(ball != null){
            ball.x = msg.posX;
            ball.y = msg.posY;
        }

        if(p != null && ball != null)
            p.pickBomb(ball);
    }

    updateBallThrowState(msg){
        console.log("Un dummy ha lanzado la bola "+msg.ballId);

        var p = this.findPlayerById(msg.id);

        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
        }

        var ball = this.findBallById(msg.ballId);

        if(ball != null){
            ball.x = msg.posX;
            ball.y = msg.posY;
        }

        if(p != null && ball != null){
            p.throwBall(ball, msg.dirX, msg.dirY);

             //Si la bola es una patata, tenemos que asignar el mismo tiempo de activación
            if(ball.name == "BallTemporizedBomb")
                ball.activationTime = msg.potatoActivation;
        }
    }

    updateEnterAimMode(msg){
        console.log("JUGADOR apunta");
        
        var p = this.findPlayerById(msg.id);
        
        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
            p.enterAimMode();
        }
    }

    updateEnterHurtState(msg){
        console.log("Alguien ha sido herido");

        var p = this.findPlayerById(msg.id);

        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
    
            if(p.health > msg.life){
                p.takeDamage();
            }
        }
       
        //Si ha sido hostiado por un boloncio, hay que aplicar ese cambio en la bola
        if(msg.ballId > -1){
            console.log("por un boloncio");
            var b = this.findBallById(msg.ballId);

            if(b != null){
                b.x = msg.posX;
                b.y = msg.posY;
    
                b.impact();
            }
        }
    }

    updateEnterEliminatedState(msg){
        console.log("Alguien ha sido eliminado");

        var p = this.findPlayerById(msg.id);

        if(p != null){
            p.x = msg.posX;
            p.y = msg.posY;
        }
    }

    startGameOverState(msg){
        //La partida ha terminado, hay que decidir quien ha ganado y esas cosas
        this.connection.close();

        var p = this.findPlayerById(msg.id);

        this.scene.startGameOver(p);
    }
}