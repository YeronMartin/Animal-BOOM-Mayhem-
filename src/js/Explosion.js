class Explosion extends Phaser.GameObjects.Sprite {
    
    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, "particula1");

        this.setScale(0.5);
        this.setupPhysics(scene);

        this.scene = scene;
        this.scene.add.existing(this);

        this.scene.explosionGroup.add(this, true);
        
        var timedEvent = this.scene.time.addEvent({ delay: 1000, callback: this.prueba, callbackScope: this, loop: false });
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(0);
        this.body.setImmovable(true);
    }
    
    prueba(){
        this.scene.explosionGroup.remove(this);
        this.Destroy();
    }
    
    Destroy(){
        this.destroy();
    }
}