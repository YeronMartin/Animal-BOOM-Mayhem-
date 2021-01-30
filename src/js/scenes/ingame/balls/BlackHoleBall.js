class BlackHoleBall extends Ball{

    name = "BlackHoleBall"
    speed = 700;
    distanceToTravel = 2500000;
    distanceToActivateCollisions = 100000;

    constructor(scene, id, posX, posY){
        super(scene, posX, posY, "mini_agujero_negro");
        this.id = id;

        this.setScale(0.4);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);
        this.enterSuddenDeathIfNeeded();
    }

    explode(){
        var blackHole = new BlackHoleArea(this.scene, this.x, this.y);
        //this.scene.explosionSfx.play();
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