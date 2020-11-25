class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "img/space.png");

        this.load.image("cerdete", "img/cerdete.png");
        this.load.image("bomba", "img/bomba.png");
    }

    create(){
        this.add.text(20, 20, "Presiona E para jugar");
        //this.scene.start("playGame");

        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.key_E)){
            this.toNextScene();
        }

    }

    toNextScene(){
        this.scene.start("playGame");
    }
}