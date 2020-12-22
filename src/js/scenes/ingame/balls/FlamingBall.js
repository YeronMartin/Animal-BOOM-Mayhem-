class FlamingBall extends Ball{
    id = "FlamingBall"
    speed = 700;
    distanceToTravel = 2000000;
    distanceToActivateCollisions = 100000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "pelota");

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
        //Cada x tiempo, generar una explosión petit en esta posición


        if(this.initialDistanceToStartFire > 0){
            this.initialDistanceToStartFire -= elapsed;
            return;
        }

        this.currentTimeBetweenFireCycles += elapsed;

        if(this.currentTimeBetweenFireCycles > this.timeBetweenFireCycles){
            this.currentTimeBetweenFireCycles = 0;

            var explosion = new Explosion(this.scene, this.x, this.y, 'bomb', 500);
            explosion.setScale(0.2);
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