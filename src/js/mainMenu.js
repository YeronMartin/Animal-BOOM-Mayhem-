class mainMenu extends Phaser.Scene{
    constructor (){
        super("mainMenu");
    }
    
     preload(){
        this.load.image("background_mainMenu", "././resources/img/background_mainMenu.png");

        
    }

    create(){
        
        const playButton = this.add.text(390, 400, 'Play', {fill: '#000000'}).setDepth(1);
        const optionsButton = this.add.text(390, 450, 'Options', {fill: '#000000'}).setDepth(1);
        const creditsButton = this.add.text(390, 500, 'Credits', {fill: '#000000'}).setDepth(1);
        const salirButton = this.add.text(390, 550, 'Exit', {fill: '#000000'}).setDepth(1);  
        
        
        this.add.image(425, 300, "background_mainMenu").setDepth(0);
        
        //this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        playButton.setInteractive ();
        creditsButton.setInteractive();
        optionsButton.setInteractive();
        playButton.on('pointerdown', () =>  this.scene.start("character"));
        creditsButton.on('pointerdown', () => this.scene.start("credits"));
        optionsButton.on('pointerdown', () => this.scene.start("options"));
        

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
