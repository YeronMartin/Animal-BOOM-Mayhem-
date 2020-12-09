class BallBomb extends Ball{

    id = "BallBomb"
    speed = 1000;
    distanceToTravel = 2000000;

    /*
    explosion;
    explosionGroup;
    */

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba3");

        this.setScale(0.1);
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
        this.distanceToTravel -= this.speed * elapsed;

        if(this.distanceToTravel < 0){
            this.explode();
            this.destroyFromScene();
        }
    }


    impact(player){
        this.explode();
        
        this.setBallOnGround();
        this.destroyFromScene();

    }
}