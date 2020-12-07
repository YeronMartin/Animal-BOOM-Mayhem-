class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    //No hace falta que estén aquí las variables, pero me gusta saber que tengo aquí.
    playersGroup;
    player;

    ballsList;
    ballsGroup;

    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);
        
        this.add.text(20, 20, "Playing game", {
            font: "50px Arial", 
            fill: "yellow",
            
        });
        
        this.deltaTime = 0;

        this.physics.world.setBoundsCollision();

        this.setupPlayers();
        this.setupInitialBalls();
    }

    setupPlayers(){
        this.playersGroup = this.add.group();
        this.player = new Player(this, config.width / 2, config.height / 2);
    }

    setupInitialBalls(){
        this.ballsList = [];
        for (var i = 0; i < 5; i++) {
            this.ballsList[i] = new Ball(this, Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height), "bomba");
        }
        this.ballsList[0] = new BallTal(this, Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height));

        this.ballsGroup = this.add.group();
        this.physics.add.collider(this.playersGroup, this.ballsGroup, this.colisionPlayerBall);
    }

    //Cuando un boloncio choqua contra un jugador
    colisionPlayerBall(player, ball){
        ball.impact();
        //Hostiar al afortunado
        player.takeDamage();
    }

    update(time, delta){

        this.background.tilePositionY -= 0.5;

        this.player.update(delta);
        
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].update(delta);
        }
    }
}