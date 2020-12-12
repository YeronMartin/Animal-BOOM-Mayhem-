class BallBomb extends Ball{

    id = "BallBomb"
    speed = 700;
    distanceToTravel = 2000000;
    distanceToActivateCollisions = 100000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba");

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

    explode(player){
        var explosion = new Explosion(this.scene, this.x, this.y);
        
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        
        //Después de recorrer cierta distancia, que la bola quede en el suelo
        if(this.distanceToTravel > 0){
            this.distanceToTravel -= this.speed * elapsed;

            if(this.distanceToTravel < 0){
                this.explode();
                this.destroyFromScene();        
            }
        }

        if(this.distanceToActivateCollisions > 0){
            this.distanceToActivateCollisions -= this.speed * elapsed;

            if(this.distanceToActivateCollisions < 0){
                this.addToPhysicsGroup();
                this.distanceToActivateCollisions = 0;        
            }
        }
    }

    impact(player){
        this.explode();
        
        this.setBallOnGround();
        this.destroyFromScene();
    }
}