class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, "explosion_sheet");

        switch(keyname){
            case 'bomb': this.setScale(0.5); break;
            case 'potato': this.setScale(0.8); break;
        }
        
        this.setupPhysics(scene);

        this.scene = scene;
        this.scene.add.existing(this);

        this.scene.explosionGroup.add(this, true);

        this.setDepth(4);

        this.setupAnimations();
        
        var timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.removeExplosion, callbackScope: this, loop: false });
    }

    setupAnimations(){
        this.scene.anims.create({
            key: 'explosion_anim',
            frames: this.scene.anims.generateFrameNames('explosion_sheet', {frames: [0,1]}),
            frameRate: 10,
            repeat: -1
        });

        this.play('explosion_anim');
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        //this.body.collideWorldBounds = true;
        this.body.bounce.set(0);
        this.body.setImmovable(true);
    }
    
    removeExplosion(){
        this.scene.explosionGroup.remove(this);
        this.Destroy();
    }
    
    Destroy(){
        this.destroy();
    }
}