class Dummy extends Player{
    constructor(scene, x, y) {
        super(scene, 2, x, y, "juani_cursed", -1, 2);
        this.setDepth(2);
        this.setScale(0.4);

        this.team = 2;

        this.animator = new PlayerAnimator(scene, this, "juani_cursed");

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);
        this.body.immovable = true

        this.animator.playIdle();
    }

    takeDamage(){
        this.health --;

        if(this.health > 0){
            this.enterHurtState();
            this.animator.lifebar.anims.play('lifebar_'+this.team+'_'+this.health);
        }else{
            //Muertini
            this.animator.lifebar.destroy();
            this.removeFromSceneLists();
            this.destroy();
        }
    }
}