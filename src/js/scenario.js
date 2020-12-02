class scenario extends Phaser.Scene{
    constructor (){
        super("scenario");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
         this.load.image("settings_button", "././resources/img/star.png")
        

        
    }

    create(){
        
       
        
        this.add.image(400, 300, "background_credits");
         this.add.text(300, 50, 'Pantalla Modo de seleccion del escenario', {fill: '#000000'}).setDepth(1);
        var exitButton = this.add.image(50, 50, "exit_arrow");
        exitButton.setScale(.1);
        var gameSettings = this.add.image(750, 50, "settings_button");
        
        const estadioButton = this.add.text( 600, 300, 'Estadio', {fill: '#000000'}).setDepth(1); 
        
        
        exitButton.setInteractive();
        estadioButton.setInteractive();
        gameSettings.setInteractive();
        
        exitButton.on('pointerdown', () => this.scene.start('character'));
        estadioButton.on('pointerdown', () => this.scene.start('playGame'));
        gameSettings.on('pointerdown', () => this.scene.start('gameSettings'));
        
        
        
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