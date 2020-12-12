class juego extends Phaser.Scene{
    constructor (){
        super("playGame");
    }
    
    preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
    }

    create(){
        
        this.add.image(400, 300, "background_credits");
        this.add.text(300, 50, 'Pantalla  de juego', {fill: '#000000'}).setDepth(1);
        var nextScene = this.add.text(300, 400, 'Continuar', {fill: '#000000'}).setDepth(1);
        
        
        nextScene.setInteractive();
        nextScene.on('pointerdown', () => this.scene.start('postGame'));
        //estadioButton.on('pointerdown', () => this.scene.start('character'));
    }
        
    update(){
        
    }

}