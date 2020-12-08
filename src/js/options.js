class options extends Phaser.Scene{
    constructor (){
        super("options");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
         this.load.image("exit_arrow", "././resources/img/exit_arrow.png")
        

        
    }

    create(){
        
       
        
        this.add.image(400, 300, "background_credits");
         this.add.text(500, 50, 'Ajustes', {fill: '#000000'}).setDepth(1);
        var exitButton = this.add.image(50, 50, "exit_arrow");
        exitButton.setScale(.1);
        
        exitButton.setInteractive();
         exitButton.on('pointerdown', () => this.scene.start('mainMenu'));
        
        
;

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