class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }


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

        this.players = this.add.group();
        this.player = new Player(this);


        this.ballsList = [];

        this.ballsGroup = this.add.group();

        console.log(this.ballsGroup);
        this.physics.add.collider(this.players, this.ballsGroup, this.colisionPlayerBall);
    }


    //Se llama a esto cada vez que un boloncio choque contra un jugador
    colisionPlayerBall(player, ball){
        //¿Qué quiero hacer aquí?
        //Quiero tan solo eliminar o al menos parar la bola con la que ha colisionado el jugador para hacer pruebas y eso)


        //Aquí estoy intentando eliminar la bola del array, pero por algún motivo no funciona
        //this.ballsList.splice(this.ballsList.lastIndexOf(ball), 1);
        
        //ball.destroy();

       
        //Por algún motivo, en este punto concreto, ballsGroup es undefined BECAUSE OF YES
        //console.log(this.ballsGroup);
        //this.ballsGroup.remove(ball);
    }

    update(time, delta){

        this.background.tilePositionY -= 0.5;

        //console.log(delta);

        this.player.update(delta);
        
        //console.log(this.ballsGroup);

        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].update(delta);
        }
       
    }
}