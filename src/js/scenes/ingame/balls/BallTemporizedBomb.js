class BallTemporizedBomb extends Ball{
    name = "BallTemporizedBomb";
    speed = 700;
    distanceToTravel = 2500000;
    distanceToActivateCollisions = 100000;

    activated = false;
    activationTime = Phaser.Math.Between(3000, 8000);
    animationTime = 2000;
    currentAnimationTime = 2000;

    redState = false;

    constructor(scene, id, posX, posY){
        super(scene, posX, posY, "potato_sheet");
        
        this.id = id;

        this.setScale(0.4);
        this.setupPhysics(scene);
        this.setupAnimations(scene);
        
        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);
        this.enterSuddenDeathIfNeeded();
    }

    setupAnimations(scene){
        this.anim1 = this.scene.anims.create({
            key: 'normal',
            frames: this.scene.anims.generateFrameNames('potato_sheet', {frames: [0]}),
            frameRate: 0,
            repeat: -1
        });
        this.anim2 = this.scene.anims.create({
            key: 'red',
            frames: this.scene.anims.generateFrameNames('potato_sheet', {frames: [1]}),
            frameRate: 0,
            repeat: -1
        });
    }

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;
        this.onGround = false;
        this.heldByPlayer = null;
        this.distanceToTravel = 1500000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);
        this.distanceToActivateCollisions = 100000;

        if(!this.activated)
            this.activated = true;
    }

    
    update(elapsed){
        this.updateActivationTimer(elapsed);

        if (this.onGround || this.heldByPlayer)
            return;
    
        this.updateTraveledDistance(elapsed);
        this.updateDistanceToActivateCollisions(elapsed);

        this.angle += 10;
    }

    updateActivationTimer(elapsed){
        if(this.activated && this.activationTime > 0){
            this.activationTime -= elapsed;
            this.currentAnimationTime -= elapsed;
            
            this.updateAnimationState();
            
            if(this.activationTime < 0){
                this.activationTime = 0;
                this.timedExplode();
            }
        }
    }

    updateAnimationState(){
        if(this.currentAnimationTime > (this.animationTime / 2)) {
            this.play('red');
            this.redState = true;
        } else {
            this.play('normal');
            this.redState = false;
        }

        if(this.currentAnimationTime <= 0){
            //Reducir el tiempo entre animaciones dependiendo del tiempo restante
            this.animationTime = this.activationTime / 5;
            this.currentAnimationTime = this.animationTime;
        }
    }

    timedExplode(){
        var explosion2 = new Explosion(this.scene, this.x, this.y, 'potato');
        this.scene.explosionSfx.play();

        if(this.heldByPlayer){
            this.heldByPlayer.ball = null;
        }

        this.destroyFromScene();
    }

    impact(player){
        this.scene.hitSfx.play();
        this.timedExplode();
    }
}