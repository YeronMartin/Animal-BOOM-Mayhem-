class gameModeSelection extends Phaser.Scene{
    constructor (){
        super("gameModeSelection");
    }
    
     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png")
    }

    create(){
        this.add.image(400, 300, "background_credits");
        this.add.text(500, 50, 'Pantalla Modo de juego', {fill: '#000000'}).setDepth(1);
        var exitButton = this.add.image(50, 50, "exit_arrow");
        exitButton.setScale(.1);
        
        const teamButton = this.add.text( 400, 300, '¡¡En equipo!!', {fill: '#000000'}).setDepth(1); 
        const hungerButton = this.add.text( 600, 300, 'Juegos del hambre', {fill: '#000000'}).setDepth(1); 
        
        exitButton.setInteractive();
        teamButton.setInteractive();
        hungerButton.setInteractive();
        exitButton.on('pointerdown', () => this.scene.start('OffLine/OnLine'));
        teamButton.on('pointerdown', () => this.scene.start('character'));
        hungerButton.on('pointerdown', () => this.scene.start('character'));
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