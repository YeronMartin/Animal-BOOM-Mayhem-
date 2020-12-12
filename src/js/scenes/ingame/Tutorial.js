class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorial");
    }


    preload(){
        this.load.spritesheet('cerdete_sheet', '././././resources/img/characters/juani/cerdete_sheet.png', { frameWidth: 100, frameHeight: 100 } );
        this.load.image("pelota", "././././resources/img/balls/Pelota.png");
        this.load.image("bomba", "././././resources/img/balls/Bomba.png");
        this.load.spritesheet("potato_sheet", "././././resources/img/balls/Patata_sheet.png", { frameWidth: 100, frameHeight: 100 });

        this.load.image("explosion", "././././resources/img/balls/Explosion.png");


        this.load.image("background", "././././resources/img/scenarios/stadium_background.png");
    }

    create(){
        this.background = this.add.image(0, 0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(config.width, config.height);

        this.tutorialPhase = 0;

        this.messageBox = this.add.text(20, 20, "Bienvenido al tutorial de Animal BOOM Mayhem. Utiliza WASD para moverte. Acércate a esa bola.");
        this.messageBox.setWordWrapWidth(750);
        this.messageBox.setDepth(5);

        this.playersGroup = this.add.group();
        this.playersList = [];
        this.playersList[0] = new Player(this, config.width / 2, config.height / 2, 0);
        this.playersGroup.add(this.playersList[0], true);

        this.setupInitialBalls();

        this.explosionGroup = this.add.group();
        this.physics.add.collider(this.playersGroup, this.explosionGroup, this.colisionPlayerExplosion);  
    
        this.input.keyboard.on('keydown_ESC', this.escapePressed, this);
    }

    escapePressed(){
        this.scene.start("mainMenu");
    }

    setupInitialBalls(){
        this.ballsList = [];

        this.ballsList[0] = new BallBasket(this, 100, 200);

        //this.generateNewBall();
        
        this.ballsGroup = this.add.group();
        this.physics.add.collider(this.playersGroup, this.ballsGroup, this.colisionPlayerBall, null, this);  
    }

    colisionPlayerBall(player, ball){
        ball.impact();
        player.takeDamage();

        if(player == this.playersList[0]){
            player.health++;
        }


        if(this.tutorialPhase == 7 && this.playersList[1] != null){
            this.placeBallOnDummy();
            var timedEvent = this.time.addEvent({ delay: 2000, callback:  this.waitingTimeEnded, callbackScope: this, loop: false });
        }
    }

    playerEliminated(){

    }

    generateBalls(){
        for (var i = 0; i < 5; i++) {
            var ballPosition = this.generateValidBallPosition();

            var i = this.ballsList.length;
            if(Phaser.Math.Between(0, 10) > 7){
                this.ballsList[i] = new BallBasket(this, ballPosition.x, ballPosition.y);
            }else if(Phaser.Math.Between(0, 10) > 8){
                this.ballsList[i] = new BallTemporizedBomb(this, ballPosition.x, ballPosition.y);
            }else{
                this.ballsList[i] = new BallBomb (this, ballPosition.x, ballPosition.y);
            }
        }
    }

    generateValidBallPosition(){
        var minDistance = 200;
        var validPosition = false;
        var tries = 10;
        var ballPosition = new Phaser.Math.Vector2(0, 0);

        do{
            while(tries > 0 && !validPosition){
                validPosition = true;

                ballPosition.x = Phaser.Math.Between(0, config.width);
                ballPosition.y = Phaser.Math.Between(0, config.height);

                for (var i = 0; i < this.ballsList.length; i++) {
                    if(this.getDistanceBetweenPoints(ballPosition.x, ballPosition.y, this.ballsList[i].x, this.ballsList[i].y) < minDistance){
                        validPosition = false;
                        break;
                    }
                }
    
                tries--;
            }

            minDistance -= 10;
            tries = 10;
        }while(!validPosition);

        return ballPosition;
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    update(time, delta){
        this.updatePlayers(delta);
        this.updateBalls(delta);

        switch(this.tutorialPhase){
            case 0: //Moverse hacia la pelota
                if(this.hasThePlayerReachedTheBall()){
                    //Avanzar texto y fase
                    this.messageBox.setText("Muy bien, ahora pulsa R para recoger la bola del suelo");
                    this.tutorialPhase++;
                }
                break;
            case 1: //Recoger la pelota
                if(this.ballsList[0].heldByPlayer){
                    this.messageBox.setText("Lanza la bola manteniendo pulsado R y apunta con WASD. La bola rebotará por las paredes, ten cuidado de que no te golpee.");
                    this.tutorialPhase++;
                }
                break;
            case 2: //Lanzar la pelota
                if(!this.ballsList[0].heldByPlayer){
                    this.tutorialPhase++;
                }
                break;
            case 3: //La bola ha dejado de moverse
                if(this.ballsList[0].onGround){
                    this.tutorialPhase++;
                    this.messageBox.setText("Ahora que ya sabes recoger y lanzar bolas, es el momento de practicar con un adversario. Elimina a ese dummy, bastará con golpearlo 3 veces.");
                    this.playersList[1] = new Dummy(this, config.width / 2, config.height / 2);
                    this.playersGroup.add(this.playersList[1], true);
                    this.generateBalls();
                }
                break;
            case 4: //Muñeco destruido
                if(this.playersList[1] == null){
                    this.messageBox.setText("¡Muy bien! Ahora la última lección. Puedes evadir balonazos agachándote manteniendo la tecla T. Ten cuidado porque solo serás invulnerable por unos instantes. Pulsa ENTER cuando estés preparado.");
                    this.tutorialPhase++;


                    //En caso de que el jugador tenga una pelota, se la quitamos
                    if(this.playersList[0].ball){
                        this.playersList[0].ball.setBallOnGround();
                        this.playersList[0].ball = null;
                    }

                    //Eliminamos todos los boloncios menos el primero
                    for (var i = this.ballsList.length - 1; i > 0; i--) {
                        this.ballsList[i].destroyFromScene();
                    }

                    //Colocamos al jugador casi en el centro
                    this.playersList[0].setBodyVelocityToCero();
                    this.playersList[0].x = (config.width / 2) - 100;
                    this.playersList[0].y = config.height / 2;
                    this.playersList[0].body.immovable = true;

                    //Colocamos un dummy en el borde derecho del mapa y le damos una pelota
                    this.playersList[1] = new Dummy(this, config.width - 100, config.height / 2);
                    this.playersGroup.add(this.playersList[1], true);
                    this.placeBallOnDummy();
                    
                    this.input.keyboard.on('keydown_ENTER', this.enterPressed, this);
                }
                break;
            case 6: //Ha finalizado el tiempo de espera hasta que el dummy lance la bola
                this.messageBox.setText("¡Esquiva las bolas con T!");
                var timedEvent = this.time.addEvent({ delay: 2000, callback:  this.waitingTimeEnded, callbackScope: this, loop: false });
                this.tutorialPhase++;
                break;
            case 7:
                if(this.playersList[1] == null){
                    this.messageBox.setText("¡Eso es! Ya estás preparado para competir en Animal BOOM Mayhem. Pulsa ESCAPE para salir al menú");
                    this.playersList[0].body.immovable = false;
                    this.tutorialPhase++;
                }
                break;
        }
    }

    placeBallOnDummy(){
        this.playersList[1].ball = this.ballsList[0];
        this.playersList[1].ball.heldByPlayer = true;
    }

    enterPressed(){
        this.tutorialPhase++;
        this.input.keyboard.off('keydown_ENTER');
    }

    waitingTimeEnded(){
        this.playersList[1].ball.launch(-1, 0);
        this.playersList[1].ball = null;
    }

    hasThePlayerReachedTheBall(){
        return (Math.sqrt(Math.pow(this.playersList[0].x - this.ballsList[0].x, 2) 
        + Math.pow(this.playersList[0].y - this.ballsList[0].y, 2)) < 100);
    }

    updatePlayers(delta){
        for (var i = this.playersList.length - 1; i >= 0; i--) {
            //En la fase 4 del tutorial, limitamos el movimiento del jugador
            if(i == 0 && (this.tutorialPhase >= 5 && this.tutorialPhase <= 7)){
                continue;
            }

            this.playersList[i].update(delta);
        }
    }

    updateBalls(delta){
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].update(delta);
        }
    }
}