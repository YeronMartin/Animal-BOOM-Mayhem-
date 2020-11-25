class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);
        
        this.cerdo1 = this.add.image(0,100,"cerdete");
        this.cerdo2 = this.add.image(150,100,"cerdete");
        this.cerdo3 = this.add.image(300,200,"cerdete");


        this.cerdo1.setScale(0.2);
        this.cerdo2.setScale(0.2);
        this.cerdo3.setScale(0.2);

        this.bomba = this.add.image(200,200,"bomba");

        this.bomba.setScale(0.5);

        this.add.text(20, 20, "Playing game", {
            fond: "25px Arial", 
            fill: "yellow"
        });
    }

    update(){
        this.moveCerdo(this.cerdo1, 1);
        this.moveCerdo(this.cerdo2, 2);
        this.moveCerdo(this.cerdo3, 3);

        this.background.tilePositionY -= 0.5;
    }

    moveCerdo(cerdo, speed){
        cerdo.y += speed;

        if(cerdo.y > config.height){
            this.resetCerdoPos(cerdo);
        }
    }

    resetCerdoPos(cerdo){
        cerdo.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        cerdo.x = randomX;
    }
}