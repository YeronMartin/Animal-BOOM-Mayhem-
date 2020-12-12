class onLine extends Phaser.Scene{
    constructor (){
        super("OffLine/OnLine");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png")
    }

    create(){
        this.add.image(400, 300, "background_credits");
        this.add.text(500, 50, 'Pantalla OffLine/OnLine', {fill: '#000000'}).setDepth(1);
        var exitButton = this.add.image(50, 50, "exit_arrow");
        exitButton.setScale(.1);
        
        const offButton = this.add.text( 500, 300, 'OffLine', {fill: '#000000'}).setDepth(1); 
        const onButton = this.add.text( 700, 300, 'OnLine', {fill: '#000000'}).setDepth(1); 
        
        exitButton.setInteractive();
        offButton.setInteractive();
        onButton.setInteractive();
        exitButton.on('pointerdown', () => this.scene.start('mainMenu'));
        offButton.on('pointerdown', () => this.scene.start('mode'));
        onButton.on('pointerdown', () => this.scene.start('mode'));
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