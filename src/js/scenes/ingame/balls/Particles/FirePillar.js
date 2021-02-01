class FirePillar extends Phaser.GameObjects.Sprite {
    constructor(scene, posX, posY){
        super(scene, posX, posY, "fire_pillar");
        
        this.setScale(0.2)
        this.setupPhysics(scene);

        this.scene = scene;
        this.scene.add.existing(this);
        this.setDepth(4);

        this.anims.play('firePillar_anim');

        var timedEvent = this.scene.time.addEvent({ delay: 2000, callback: this.removeFromScene, callbackScope: this, loop: false });
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.bounce.set(0);
        this.body.setImmovable(true);

        this.colliderRadius = 100;
        this.body.setCircle(this.colliderRadius, (this.width / 2) - this.colliderRadius, (this.height / 2) - this.colliderRadius + 50);

        this.scene.explosionGroup.add(this, true);
    }

    removeFromScene(){
        this.scene.explosionGroup.remove(this);
        this.destroy();
    }
}