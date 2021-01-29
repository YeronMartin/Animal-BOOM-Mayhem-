class FlamingBall extends Ball{
    name = "FlamingBall"
    speed = 700;
    distanceToTravel = 2000000;
    distanceToActivateCollisions = 100000;

    constructor(scene, id, posX, posY){
        super(scene, posX, posY, "bola_flamigera");

        this.id = id;
        this.setScale(0.4);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);
        this.enterSuddenDeathIfNeeded();
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        
        this.updatePathOfFire(elapsed);
        this.updateTraveledDistance(elapsed);
        this.updateDistanceToActivateCollisions(elapsed);

        this.angle += 10;
    }

    initialDistanceToStartFire = 100;
    timeBetweenFireCycles = 50;
    currentTimeBetweenFireCycles = 0;

    updatePathOfFire(elapsed){
        if(this.initialDistanceToStartFire > 0){
            this.initialDistanceToStartFire -= elapsed;
            return;
        }

        this.currentTimeBetweenFireCycles += elapsed;

        if(this.currentTimeBetweenFireCycles > this.timeBetweenFireCycles){
            this.currentTimeBetweenFireCycles = 0;

            var pillar = new FirePillar(this.scene, this.x, this.y);
        }
    }

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;

        this.onGround = false;
        this.heldByPlayer = null;
        this.distanceToTravel = 1500000;
        this.distanceToActivateCollisions = 100000;

        this.initialDistanceToStartFire = 100;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);
    }
}