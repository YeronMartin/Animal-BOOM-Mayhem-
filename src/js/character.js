class character extends Phaser.Scene{
    constructor (){
        super("character");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
         this.load.image("exit_arrow", "././resources/img/exit_arrow.png")
        

        
    }

    create(){
        
       
        
        this.add.image(400, 300, "background_credits");
         this.add.text(400, 50, 'Pantalla Modo de seleccion del personaje', {fill: '#000000'}).setDepth(1);
        var exitButton = this.add.image(50, 50, "exit_arrow");
        exitButton.setScale(.1);
        
        const juaniButton = this.add.text( 600, 300, '¡¡LA JUANI!!', {fill: '#000000'}).setDepth(1); 
        
        
        exitButton.setInteractive();
        juaniButton.setInteractive();
         exitButton.on('pointerdown', () => this.scene.start('mainMenu'));
         juaniButton.on('pointerdown', () => this.scene.start('scenario'));
        
        
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