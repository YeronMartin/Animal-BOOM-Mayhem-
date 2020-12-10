class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    //No hace falta que estén aquí las variables, pero me gusta saber que tengo aquí.
    playersGroup;
    playersList;

    ballsList;
    ballsGroup;

    maxBallsInScene = 10;

    minutesRemaining = 1;
    secondsRemaining = 0;

    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);
        
        this.matchTimer = this.add.text(20, 20, "Playing game", {
            font: "25px Arial", 
            fill: "white",
            
        });
        
        this.deltaTime = 0;

        this.physics.world.setBoundsCollision();

        this.minutesRemaining = 1;
        this.secondsRemaining = 0;

        this.setupPlayers();
        this.setupInitialBalls();

        this.input.keyboard.on('keydown_ESC', this.escapePressed, this);
    }

    escapePressed(){
        this.scene.start("bootGame");
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
        if(Phaser.Math.Between(0, 10) > 4){
            this.ballsList[i] = new Ball(this, ballPosition.x, ballPosition.y, "bomba");
        }else{
            this.ballsList[i] = new BallTal(this, ballPosition.x, ballPosition.y);
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
        ball.impact();

        player.takeDamage();
    }

    playerEliminated(){
        this.victoryText = this.add.text(config.width / 2, (config.height / 2) - 100, "Victoria Royale", {
            font: "50px Arial", 
            fill: "white",
        });

        this.victoryText.setOrigin(0.5, 0.5);
        this.victoryText.setDepth(5);

        this.exitText = this.add.text(config.width / 2, (config.height / 2), "Pulsa ESCAPE para salir", {
            font: "35px Arial", 
            fill: "white",
        });
        this.exitText.setOrigin(0.5, 0.5);
        this.exitText.setDepth(5);

        //this.scene.restart();
        //this.scene.start("bootGame");
    }

    update(time, delta){

        this.background.tilePositionY -= 0.5;

        this.updatePlayers(delta);
        this.updateBalls(delta);

        this.updateClock(time, delta);
    }

    acumulatedDelta = 0;

    timeEnded = false;

    updateClock(time, delta){
        if(this.timeEnded)
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
                console.log("EL FINAL DE TODOOOOOOOOOOOOO");
                this.activateSuddenDeath();
            }
            if(this.secondsRemaining < 10){
                this.matchTimer.setText(this.minutesRemaining+":0"+this.secondsRemaining);
            }else{
                this.matchTimer.setText(this.minutesRemaining+":"+this.secondsRemaining);
            }
            
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
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].enterSuddenDeathMode();
        }
    }
}