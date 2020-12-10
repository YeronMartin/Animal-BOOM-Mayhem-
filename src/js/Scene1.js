class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "././resources/img/space.png");

        this.load.image("cerdete", "././resources/img/cerdete.png");

        this.load.spritesheet('cerdete_sheet', '././resources/img/cerdete_sheet.png', { frameWidth: 100, frameHeight: 100 } );

        this.load.image("bomba", "././resources/img/bomba.png");
        this.load.image("bomba2", "././resources/img/bomba2.png");
    }

    create(){
        this.add.text(20, 20, "Presiona E para jugar. Presiona R para jugar el tutorial");

        this.input.keyboard.on('keydown_E', this.toPlayScene, this);
        this.input.keyboard.on('keydown_R', this.toTutorialScene, this);
    }

    update(){

    }

    toPlayScene(){
        this.scene.start("playGame");
    }

    toTutorialScene(){
        //this.scene.start("playGame");
        this.scene.start("tutorial");
    }
}