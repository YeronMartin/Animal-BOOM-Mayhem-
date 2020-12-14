class Dummy extends Phaser.GameObjects.Sprite{

    id;
    stunned = false;
    crouching = false;

    health = 3;

    hurtAnimationDelay = 200;
    timeBetweenFlickeringCycles = 25;
    invulnerabilityDuration = 1000;

    flickeringEnded = false;

    constructor(scene, x, y, id) {
        super(scene, x, y, "juani_sheet"+id);

        this.id = id;

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);


        this.setDepth(1);
        this.setScale(0.4);

        //Añadir elemento a una lista en la escena
        scene.playersGroup.add(this);

        this.setupAnimations(scene);

        this.play('idle'+id);

        this.setupLifeBar(id);
    }

    setupLifeBar(id){
        this.lifebar = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y + 50, 'lifebar_'+id);
        this.scene.add.existing(this.lifebar);
        this.lifebar.setDepth(3);
        this.lifebar.setScale(0.3);

        this.lifebar.anim0 = this.scene.anims.create({
            key: 'lifebar_'+id+'_3',
            frames: this.scene.anims.generateFrameNames('lifebar_'+id, {frames: [0]}),
        });

        this.lifebar.anim1 = this.scene.anims.create({
            key: 'lifebar_'+id+'_2',
            frames: this.scene.anims.generateFrameNames('lifebar_'+id, {frames: [1]}),
        });

        this.lifebar.anim2 = this.scene.anims.create({
            key: 'lifebar_'+id+'_1',
            frames: this.scene.anims.generateFrameNames('lifebar_'+id, {frames: [2]}),
        });
    }

    setupAnimations(scene){
        this.anim0 = this.scene.anims.create({
            key: 'idle'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [0]}),
            frameRate: 0,
            repeat: 1
        });

        this.anim1 = this.scene.anims.create({
            key: 'walk'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });

        this.anim2 = this.scene.anims.create({
            key: 'throw'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [6, 7]}),
            frameRate: 20,
            repeat: 0
        });

        this.anim3 = this.scene.anims.create({
            key: 'aim'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [6]}),
            frameRate: 10,
            repeat: 0
        });

        this.anim4 = this.scene.anims.create({
            key: 'crouch'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [4, 5]}),
            frameRate: 10,
            repeat: 0
        });

        this.anim5 = this.scene.anims.create({
            key: 'hurt'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [8]}),
            frameRate: 0,
            repeat: -1
        });
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);
        this.body.immovable = true;
    }

    update(){
        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }

        this.updateLifebarPosition();
    }

    updateLifebarPosition(){
        this.lifebar.x = this.x;
        this.lifebar.y = this.y + 50;
    }

     //Metodiños para gestionar la recogida o lanzamiento de bolindres

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    takeDamage(){
        this.health --;

        if(this.health <= 0){
            this.lifebar.destroy();
           this.destroyFromScene();
        }else{
            this.lifebar.play('lifebar_'+this.id+'_'+this.health);
            this.enterHurtState();
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
        this.play('hurt'+this.id);
        var hurtAnimTimer = this.scene.time.addEvent({ delay: this.hurtAnimationDelay, callback: this.endHurtAnimation, callbackScope: this, loop: false });
        this.stunned = true;

        this.startHurtInvulnerableFrames();
    }

    startHurtInvulnerableFrames(){
        this.scene.playersGroup.remove(this);

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
        this.play('idle'+this.id);
        this.stunned = false;
    }
}