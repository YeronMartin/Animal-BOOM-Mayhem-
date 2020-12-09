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
        //No hace falta hacer nada más con la explosión, se va a configurar ella sola nada mas crearse
        var explosion = new Explosion(this.scene, this.x, this.y);
        
        //explosion.prueba();
        //var timedEvent = this.scene.time.addEvent({ delay: 400, callback: this.destroyExplosion, callbackScope: this, loop: false });
        this.destroyExplosion(this.explosion);
        
    }
    

    destroyExplosion(explosion){
        
        //this.scene.explosionGroup.remove(this);
        console.log(this.explosion);
        //this.explosion.Destroy();
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