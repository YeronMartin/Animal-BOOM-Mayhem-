class Dummy extends Phaser.GameObjects.Sprite{

    stunned = false;
    crouching = false;

    health = 3;

    hurtAnimationDelay = 200;
    timeBetweenFlickeringCycles = 25;
    invulnerabilityDuration = 1000;

    flickeringEnded = false;

    constructor(scene, x, y) {
        super(scene, x, y, "cerdete_sheet");

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        //Añadir elemento a una lista en la escena
        scene.playersGroup.add(this);

        this.setupAnimations(scene);

        this.body.immovable = true;

        this.play('idle');
    }

    setupAnimations(scene){
        this.anim1 = this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [0]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim3 = this.scene.anims.create({
            key: 'crouch',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [3]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim4 = this.scene.anims.create({
            key: 'hurt',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [4]}),
            frameRate: 0,
            repeat: -1
        });
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);
    }

    update(){
        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }
    }

     //Metodiños para gestionar la recogida o lanzamiento de bolindres

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    takeDamage(){
        this.health --;

        if(this.health <= 0){
            this.destroyFromScene();
        }else{
            this.enterHurtState();
            this.setBodyVelocityToCero();
        }
    }

    destroyFromScene(){
        this.scene.playersList.splice(this.scene.playersList.lastIndexOf(this), 1);
        this.scene.playersGroup.remove(this);

        this.scene.playerEliminated();

        //Destruir objeto de la escena
        this.destroy();
    }

    enterHurtState(){
        this.play('hurt');
        var hurtAnimTimer = this.scene.time.addEvent({ delay: this.hurtAnimationDelay, callback: this.endHurtAnimation, callbackScope: this, loop: false });
        this.stunned = true;

        this.startHurtInvulnerableFrames();
    }

    startHurtInvulnerableFrames(){
        this.flickeringEnded = false;
        var flickeringCicleTimer = this.scene.time.addEvent({ delay: this.timeBetweenFlickeringCycles, callback: this.flickeringCicle, callbackScope: this, loop: false });
        var flickeringEndTimer = this.scene.time.addEvent({ delay: this.invulnerabilityDuration, callback: this.endFlickeringCicle, callbackScope: this, loop: false });
    }

    flickeringCicle(){
        this.visible = !this.visible;

        if(!this.flickeringEnded){
            var timedEvent = this.scene.time.addEvent({ delay: this.timeBetweenFlickeringCycles, callback: this.flickeringCicle, callbackScope: this, loop: false });
        }else{
            this.visible = true;
            this.scene.playersGroup.add(this, true);
        }  
    }

    endFlickeringCicle(){
        this.flickeringEnded = true;
    }

    endHurtAnimation(){
        this.play('idle');
        this.stunned = false;
    }
}