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


    minutesRemaining = 2;
    secondsRemaining = 30;

    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);
        
        this.matchTimer = this.add.text(20, 20, "Playing game", {
            font: "25px Arial", 
            fill: "white",
            
        });
        
        this.deltaTime = 0;

        this.physics.world.setBoundsCollision();

        this.setupPlayers();
        this.setupInitialBalls();
    }

    setupPlayers(){
        this.playersGroup = this.add.group();

        this.playersList = [];

        this.playersList[0] = new Player(this, config.width / 2, config.height / 2);
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

    generateNewBall(){
        var i = this.ballsList.length;

        if(Phaser.Math.Between(0, 10) > 4){
            this.ballsList[i] = new Ball(this, Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height), "bomba");
        }else{
            this.ballsList[i] = new BallTal(this, Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height));
        }
    }

    //Cuando un boloncio choqua contra un jugador
    colisionPlayerBall(player, ball){
        ball.impact();

        player.takeDamage();
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

        if(this.acumulatedDelta >= 200){
            this.secondsRemaining -= 1;


            if(this.secondsRemaining == -1 && this.minutesRemaining > 0){
                this.secondsRemaining = 59;
                this.minutesRemaining -= 1;
            }

            if(this.secondsRemaining == 0 && this.minutesRemaining == 0){
                this.timeEnded = true;
                console.log("EL FINAL DE TODOOOOOOOOOOOOO");
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
}