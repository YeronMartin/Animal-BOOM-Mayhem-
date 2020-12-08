class BallTal extends Ball{

    speed = 900;
    distanceToTravel = 2000000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba2");

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        if(scene.timeEnded){
            this.setScale(0.6);
            this.speed = 1000;
        }

    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        
        //Después de recorrer cierta distancia, que la bola quede en el suelo
        this.distanceToTravel -= this.speed * elapsed;

        if(this.distanceToTravel < 0){
            this.setBallOnGround();      
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

        console.log("INDICIÓN");
    }


    impact(){
        console.log("OH NO!");
        this.destroyFromScene()
    }

    enterSuddenDeathMode(){
        this.setScale(0.6);
        this.speed = 1000;
    }

}