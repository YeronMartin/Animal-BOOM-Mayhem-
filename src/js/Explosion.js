class Explosion extends Phaser.GameObjects.Sprite {
    
    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, "particula1");

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(0);
    }
    
    Destroy(){
        this.destroy();
    }
}