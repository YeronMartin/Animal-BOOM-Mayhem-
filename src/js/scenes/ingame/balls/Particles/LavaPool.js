class LavaPool extends Phaser.GameObjects.Sprite {
    constructor(scene, posX, posY){
        super(scene, posX, posY, "lava_pool");
        
        this.setScale(0.2)
        //this.setupPhysics(scene);
        this.setDepth(2);


        this.scene = scene;
        this.scene.add.existing(this);

        this.setupWarningPhase();
    }

    setupWarningPhase(){
        console.log("FASE 0");

        //Reproducir animación de aviso
        this.anims.play('lava_pool_warning');
        this.state = 0;
        var timedEvent = this.scene.time.addEvent({ delay: 2000, callback: this.setupExpansionPhase, callbackScope: this, loop: false });
    }

    setupExpansionPhase(){
        console.log("FASE 1");

        //Reproducir animación normal
        this.anims.play('lava_pool_anim');
        this.state++;

        this.setupPhysics();

        var timedEvent = this.scene.time.addEvent({ delay: 3000, callback: this.setupRelaxedPhase, callbackScope: this, loop: false });
    }

    setupRelaxedPhase(){
        console.log("FASE 2");
        this.state++;
        var timedEvent = this.scene.time.addEvent({ delay: 3000, callback: this.setupDecreasingPhase, callbackScope: this, loop: false });
    }

    setupDecreasingPhase(){
        console.log("FASE 3");
        this.state++;
        var timedEvent = this.scene.time.addEvent({ delay: 3000, callback: this.removeFromScene, callbackScope: this, loop: false });
    }

    scaleChangeValue = 0.0008;
    
    setupPhysics()
    {
        this.scene.physics.world.enableBody(this);
        this.body.bounce.set(0);
        this.body.setImmovable(true);

        this.colliderRadius = 80;
        //No entiendo por qué este offset funciona al revés, pero OK.
        this.body.setCircle(this.colliderRadius, (this.width / 2) - this.colliderRadius, (this.height / 2) - this.colliderRadius);

        this.scene.lavaPoolGroup.add(this, true);
    }

    removeFromScene(){
        this.scene.lavaPoolGroup.remove(this);
        this.scene.lavaPoolList.splice(this.scene.lavaPoolList.lastIndexOf(this), 1);
        this.destroy();
    }

    update(elapsed){
        switch(this.state){
            case 1:
                //Expansión
                this.setScale(this.scaleX += (this.scaleChangeValue * elapsed))
                break;
            case 3:
                this.setScale(this.scaleX -= (this.scaleChangeValue * elapsed))
                break;
        }
    }
}