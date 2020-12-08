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
        
        /*this.explosionGroup = this.scene.add.group();
        
        this.scene.physics.add.collider(this.scene.playersGroup, this.explosionGroup, this.scene.colisionPlayerExplosion);
        console.log("Ahora me salgo de explode.")
        
        this.scene.player.takeDamage();
        this.explosion.Destroy();
        */
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
        console.log("Explosión!");
        this.explode();
        
        this.setBallOnGround();
        this.destroyFromScene();

    }
}