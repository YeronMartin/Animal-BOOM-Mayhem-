class BallBomb extends Ball{
    name = "BallBomb";
    speed = 700;
    distanceToTravel = 2500000;
    distanceToActivateCollisions = 100000;

    constructor(scene, id, posX, posY){
        super(scene, posX, posY, "bomba");

        this.id = id;

        this.setScale(0.4);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);
        this.enterSuddenDeathIfNeeded();
    }

    explode(){
        var explosion = new Explosion(this.scene, this.x, this.y, 'bomb');
        this.scene.explosionSfx.play();

        if(this.scene.gameMode == "online"){
            explosion.launchedByPlayer = this.launchedByPlayer;
        }
    }

    updateTraveledDistance(elapsed){
        if(this.distanceToTravel > 0){
            this.distanceToTravel -= this.speed * elapsed;

            //Después de recorrer cierta distancia, que la bola quede en el suelo
            if(this.distanceToTravel < 0){
                this.explode();
                this.destroyFromScene();        
            }
        }
    }

    impact(player){
        this.scene.hitSfx.play();

        this.explode();
        
        this.setBallOnGround();
        this.destroyFromScene();
    }
}