class BallTemporizedBomb extends Ball{
    
    id = "BallBomb"
    speed = 700;
    distanceToTravel = 2000000;
    activated = false;
    activationTime = 5000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba4");

        this.setScale(0.7);
        this.setupPhysics(scene);
        

        var scene = scene;
        scene.add.existing(this);
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
    }

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;
        this.onGround = false;
        this.heldByPlayer = false;
        this.distanceToTravel = 1500000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);

        //Después de un pequeño retardo, añadimos la bola al grupo de bolas para colisiones
        var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });


        if(!this.activated)
            this.activated = true;
    }

    update(elapsed){
        
        this.updateActivationTimer(elapsed);

        if (this.onGround || this.heldByPlayer){
            return;
        }
        
        //Después de recorrer cierta distancia, que la bola quede en el suelo
        this.distanceToTravel -= this.speed * elapsed;
        
        
        if(this.distanceToTravel < 0){
            this.setBallOnGround();
        }
    }

    updateActivationTimer(elapsed){
        if(this.activated && this.activationTime > 0){
            this.activationTime -= elapsed;

            if(this.activationTime < 0){
                this.activationTime = 0;
                this.timedExplode();
            }
        }

        console.log(this.activationTime);
    }

    timedExplode(){
        //this.activated = false;
        var explosion2 = new Explosion(this.scene, this.x, this.y);
        this.destroyFromScene();
    }

    impact(player){
        this.timedExplode();
    }
}