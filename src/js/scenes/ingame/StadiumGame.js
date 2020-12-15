class StadiumGame extends Phaser.Scene {
    constructor(){
        super("stadiumGame");
    }

    preload(){
        this.load.spritesheet('juani_sheet0', '././././resources/img/characters/juani/juani_sheet1.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('juani_sheet1', '././././resources/img/characters/juani/juani_sheet2.png', { frameWidth: 180, frameHeight: 250 } );
       
        this.load.spritesheet('player_none', '././././resources/img/characters/juani/player_none.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_basketball', '././././resources/img/characters/juani/player_basketball.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_bomb', '././././resources/img/characters/juani/player_bomb.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_potato', '././././resources/img/characters/juani/player_potato1.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_potato_red', '././././resources/img/characters/juani/player_potato2.png', { frameWidth: 180, frameHeight: 250 } );

        this.load.spritesheet('lifebar_0', '././././resources/img/hud/lifebar_blue.png', { frameWidth: 230, frameHeight: 45 });
        this.load.spritesheet('lifebar_1', '././././resources/img/hud/lifebar_red.png', { frameWidth: 230, frameHeight: 45 });

        this.load.image("pelota", "././././resources/img/balls/Pelota.png");
        this.load.image("bomba", "././././resources/img/balls/Bomba.png");
        this.load.spritesheet("potato_sheet", "././././resources/img/balls/Patata_sheet.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('explosion_sheet', "././././resources/img/explosion_sheet.png", { frameWidth: 431, frameHeight: 400 });

        this.load.image('marcador', '././././resources/img/hud/marcador.png');

        this.load.image('fondo_texto', "././././resources/img/interfaces/areas/character_description_area.png");
        this.load.image("background", "././././resources/img/scenarios/stadium_background.png");
    }

    //No hace falta que estén aquí las variables, pero me gusta saber que tengo aquí.
    playersGroup;
    playersList;

    ballsList;
    ballsGroup;

    explosion;
    explosionGroup;

    maxBallsInScene = 10;

    minutesRemaining;
    secondsRemaining5;
    acumulatedDelta = 1000;
    timeEnded = false;

    create() {
        this.background = this.add.image(0, 0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(config.width, config.height);
        
        this.minutesRemaining = 1;
        this.secondsRemaining = 0;
        this.acumulatedDelta = 1000;
        this.timeEnded = false;
        this.noMorechetos = false;
        this.matchEnd = false;

        this.matchTimer = this.add.text(config.width / 2, 30, this.minutesRemaining+":"+this.secondsRemaining+'0', {
            font: "25px Consolas", 
            fill: "red",
        });
        this.matchTimer.setOrigin(0.5, 0.5);

        this.marcador = this.add.image(config.width / 2, 40, 'marcador');
        this.marcador.setScale(0.3);
        this.marcador.setDepth(5);

        this.matchTimer.setDepth(6);
        
        this.deltaTime = 0;

        this.physics.world.setBoundsCollision();

        this.setupPlayers();
        this.setupInitialBalls();

        this.setupExplosionGroup();

        this.input.keyboard.on('keydown_ESC', this.escapePressed, this);
        this.input.keyboard.on('keydown_ZERO', this.chetosPressed, this);
    }

    escapePressed(){
        this.scene.start("mainMenu");
    }

    noMorechetos = false;

    chetosPressed(){
        if(!this.noMorechetos){
            this.minutesRemaining = 0;
            this.secondsRemaining = 5;

            this.noMorechetos = true;
        }
    }

    setupPlayers(){
        this.playersGroup = this.add.group();
        this.playersList = [];

        this.playersList[0] = new Player(this, (config.width / 2) - 100, config.height / 2, 0);
        this.playersList[1] = new Player(this, (config.width / 2) + 100, config.height / 2, 1);
    }

    setupInitialBalls(){
        this.ballsList = [];

        for (var i = 0; i < this.maxBallsInScene; i++) {
            this.generateNewBall();
        }
    
        this.ballsGroup = this.add.group();

        this.physics.add.collider(this.playersGroup, this.ballsGroup, this.colisionPlayerBall);

        var timedEvent = this.time.addEvent({ delay: 1000, callback:  this.ballRespawnerTimerEnded, callbackScope: this, loop: true });
    }

    ballRespawnerTimerEnded(){
        if(this.ballsList.length < this.maxBallsInScene){
            this.generateNewBall();
        }
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    generateNewBall(){
        var ballPosition = this.generateValidBallPosition();
        var i = this.ballsList.length;

        if(Phaser.Math.Between(0, 10) > 8){
            this.ballsList[i] = new BallBasket(this, ballPosition.x, ballPosition.y);
        }else if(Phaser.Math.Between(0, 10) > 7){
            this.ballsList[i] = new BallTemporizedBomb(this, ballPosition.x, ballPosition.y);
        }else{
            this.ballsList[i] = new BallBomb (this, ballPosition.x, ballPosition.y);
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

    //Cuando un boloncio choqua contra un jugador
    colisionPlayerBall(player, ball){
        player.takeDamage();
        ball.impact();
    }

    setupExplosionGroup(){
        this.explosionGroup = this.add.group();
        this.physics.add.collider(this.playersGroup, this.explosionGroup, this.colisionPlayerExplosion);  
    }

    colisionPlayerExplosion(player, explosion){
        player.takeDamage();
    }

    playerEliminated(){
        this.victoryText = this.add.text(config.width / 2, (config.height / 2) - 100, "FIN DE LA RONDA", {
            font: "50px Arial", 
            fill: "white",
        });

        this.victoryText.setOrigin(0.5, 0.5);
        this.victoryText.setDepth(5);

        this.textBackground = this.add.image(config.width / 2, (config.height / 2) - 100, 'fondo_texto');
        this.textBackground.setOrigin(0.5, 0.5);
        this.textBackground.scaleX = 2.5;
        this.textBackground.scaleY = 0.5;
        this.textBackground.setDepth(4);

        //Esperar 3 segundetes para que se vea qué ha pasado.

        this.matchEnd = true;
        //var timedEvent = this.time.addEvent({ delay: 3000, callback:  this.toPostGame, callbackScope: this, loop: true });
        this.toPostGame();
    }

    matchEnd = false;

    toPostGame(){
        console.log(this.playersList[0].id + 1);
        this.scene.start('postGame', "Jugador "+(this.playersList[0].id + 1));
    }

    update(time, delta){

        if(this.matchEnd)
            delta = delta / 5;

        this.updatePlayers(delta);
        this.updateBalls(delta);

        this.updateClock(time, delta);
    }

    updateClock(time, delta){
        if(this.timeEnded || this.matchEnd)
            return;
        
        this.acumulatedDelta += delta;

        if(this.acumulatedDelta >= 1000){
            this.secondsRemaining -= 1;

            if(this.secondsRemaining == -1 && this.minutesRemaining > 0){
                this.secondsRemaining = 59;
                this.minutesRemaining -= 1;
            }

            if(this.secondsRemaining == 0 && this.minutesRemaining == 0){
                this.timeEnded = true;
                this.activateSuddenDeath();
            }

            var text = '';

            if(this.minutesRemaining < 10)
                text += '0'+this.minutesRemaining+":";
        
            if(this.secondsRemaining < 10){
                text+= '0'+this.secondsRemaining;
            }else{
                text+= this.secondsRemaining;
            }

            this.matchTimer.setText(text);

            this.acumulatedDelta = 0;
        }
    }

    updatePlayers(delta){
        for (var i = this.playersList.length - 1; i >= 0; i--) {
            this.playersList[i].update(delta);
        }
    }

    updateBalls(delta){
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].update(delta);
        }
    }

    activateSuddenDeath(){
        //Actualizar todas las bolas existentes
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].enterSuddenDeathMode();
        }

        //Poner la salud de todo el mundo a 1.
        for (var i = this.playersList.length - 1; i >= 0; i--) {
            this.playersList[i].enterSuddenDeathMode();
        }
    }
}