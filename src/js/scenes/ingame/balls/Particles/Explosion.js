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
        this.setDepth(4);

        this.anims.play('explosion_anim');
        
        var timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.removeExplosion, callbackScope: this, loop: false });
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.bounce.set(0);
        this.body.setImmovable(true);

        this.colliderRadius = 100;
        this.body.setCircle(this.colliderRadius, (this.width / 2) - this.colliderRadius, (this.height / 2) - this.colliderRadius);

        this.scene.explosionGroup.add(this, true);
    }
    
    removeExplosion(){
        this.scene.explosionGroup.remove(this);
        this.destroy();
    }

}