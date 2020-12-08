class gameSettings extends Phaser.Scene{
    constructor (){
        super("gameSettings");
        var exitButton;
        var round;
        var health;
        var players;


    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
         this.load.image("exit_arrow", "././resources/img/exit_arrow.png")



    }

    create(){
        this.add.image(400, 300, "background_credits");
        this.add.text(350, 50, 'Pantalla de propiedades de la partida ', {fill: '#000000'}).setDepth(1);
        this.exitButton = this.add.image(50, 50, "exit_arrow");
        this.exitButton.setScale(.1);
        //Creacion de la vida
        this.health = new numbersCard(this, 400, 400, 5, 1, 1);
        this.round = new numbersCard(this, 400, 450, 5, 1, 1);
        this.players = new numbersCard(this, 400, 500, 5, 5, 5);

        //Setteo de la interactividad
        this.exitButton.setInteractive();
        this.exitButton.on('pointerdown', () => this.scene.start('scenario'));
}




    update(){
        /*if(Phaser.Input.Keyboard.JustDown(this.key_E)){
            this.toNextScene();
        }*/


    }

   /* toNextScene(){
        this.scene.start("playGame");
    }*/

}
