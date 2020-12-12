class BallTal extends Ball{

    speed = 900;
    distanceToTravel = 2000000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba");

        this.setDepth(2);
        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        if(scene.timeEnded){
            this.setScale(0.6);
            this.speed = 1000;
        }

    }

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;

        this.onGround = false;
        this.heldByPlayer = false;
        this.distanceToTravel = 2000000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);

        //Después de un pequeño retardo, añadimos la bola al grupo de bolas para colisiones
        var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });
    }

    enterSuddenDeathMode(){
        this.setScale(0.6);
        this.speed = 1000;
    }

}