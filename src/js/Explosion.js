class Explosion extends Phaser.GameObjects.Sprite {
    
    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, "particula1");

        this.setScale(0.3);
        this.setupPhysics(scene);

        this.scene = scene;
        this.scene.add.existing(this);

        this.scene.explosionGroup.add(this, true);
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(0);
    }
    
    prueba(){
        this.scene.explosionGroup.remove(this);
    }
    
    Destroy(){
        this.destroy();
    }
}