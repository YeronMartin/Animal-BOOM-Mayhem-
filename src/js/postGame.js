class postGame extends Phaser.Scene{
    constructor (){
        super("postGame");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        

        
    }

    create(){
        
        this.add.image(400, 300, "background_credits");
        this.add.text(300, 50, 'Pantalla PostGame', {fill: '#000000'}).setDepth(1);
        this.add.text(250, 350, 'Pulsa M para ir al menú principal', {fill: '#000000'}).setDepth(1);
        this.add.text(250, 400, 'Pulsa N para ir a la pantalla de selección de personaje', {fill: '#000000'}).setDepth(1);
        this.add.text(250, 450, 'Pulsa B para volver a jugar', {fill: '#000000'}).setDepth(1);
        
        
        
                
        this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        
        //estadioButton.on('pointerdown', () => this.scene.start('character'));
        
        
;

}
        

                    

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.key_M)){
            this.toMenuScene();
        }else if(Phaser.Input.Keyboard.JustDown(this.key_N)){
            this.toCharacterScene();
        }else if(Phaser.Input.Keyboard.JustDown(this.key_B)){
            this.toGameScene();
        }
        /*if(Phaser.Input.Keyboard.JustDown(this.key_M)){
            this.toMenuScene();
        }else if (Phaser.Input.KeyBoard.JustDown(this.key_N)){
            this.toCharacterScene();
        }else if (Phaser.Input.KeyBoard.JustDown(this.key_B)){
            this.toGameScene();
        }
        */

    }

    toMenuScene(){
        this.scene.start("mainMenu");
    }
    toCharacterScene(){
        this.scene.start("character");
    }
    toGameScene(){
        this.scene.start("playGame");
    }

}