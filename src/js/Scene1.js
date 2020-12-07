class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "././resources/img/space.png");

        this.load.image("cerdete", "././resources/img/cerdete.png");

        this.load.spritesheet('cerdete_sheet', '././resources/img/cerdete_sheet.png', { frameWidth: 100, frameHeight: 97 } );
        //this.load.spritesheet('mummy', 'assets/animations/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });


        this.load.image("bomba", "././resources/img/bomba.png");
        this.load.image("bomba2", "././resources/img/bomba2.png");
        this.load.image("bomba3", "././resources/img/bomba3.png");
        this.load.image("particula1", "././resources/img/particle.png");
    }

    create(){
        this.add.text(20, 20, "Presiona E para jugar");
        //this.scene.start("playGame");

        //this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


        //this.input.keyboard.on('keyup_E', this.toNextScene, this);
        this.input.keyboard.on('keydown_E', this.toNextScene, this);
    }

    update(){
        //if(Phaser.Input.Keyboard.JustDown(this.key_E)){
        //    this.toNextScene();
        //}

    }

    toNextScene(){
        this.scene.start("playGame");
    }
}