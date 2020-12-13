class BallTemporizedBomb extends Ball{
    
    id = "BallTemporizedBomb"
    speed = 700;
    distanceToTravel = 2000000;
    distanceToActivateCollisions = 100000;

    activated = false;
    activationTime = Phaser.Math.Between(5000, 8000);
    animationTime = 2000;

    redState = false;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "potato_sheet");

        this.setScale(0.4);
        this.setupPhysics(scene);
        this.setupAnimations(scene);
        
        var scene = scene;
        scene.add.existing(this);

        if(scene.timeEnded){
            this.enterSuddenDeathMode();
        }
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
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


        if(!this.activated){
            this.activated = true;
        }
            
    }

    update(elapsed){
        if (!this.onGround && !this.heldByPlayer){
            //Después de recorrer cierta distancia, que la bola quede en el suelo
            this.distanceToTravel -= this.speed * elapsed;
        
            if(this.distanceToTravel < 0){
                this.setBallOnGround();
            }

            if(this.distanceToActivateCollisions > 0){
                this.distanceToActivateCollisions -= this.speed * elapsed;
    
                if(this.distanceToActivateCollisions < 0){
                    this.addToPhysicsGroup();
                    this.distanceToActivateCollisions = 0;        
                }
            }

            this.angle += 10;
        }



        this.updateActivationTimer(elapsed);
    }

    updateActivationTimer(elapsed){
        if(this.activated && this.activationTime > 0){
            this.activationTime -= elapsed;
            this.animationTime -= elapsed;
            
            if(this.animationTime > 1000) {
                this.play('red');
                this.redState = true;
            } else {
                this.play('normal');
                this.redState = false;
            }
            
            if(this.animationTime < 0){
                this.animationTime = 2000;
            }

            if(this.activationTime < 0){
                this.activationTime = 0;
                this.timedExplode();
            }
        }
    }

    timedExplode(){
        var explosion2 = new Explosion(this.scene, this.x, this.y);

        if(this.heldByPlayer){
            this.heldByPlayer.ball = null;
        }

        this.destroyFromScene();
    }

    impact(player){
        this.timedExplode();
    }
}