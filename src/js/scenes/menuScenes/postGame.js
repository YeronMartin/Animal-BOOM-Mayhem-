class postGame extends Phaser.Scene{
    constructor (){
        super("postGame");

        var winner;
    }

    init(msg){
      this.winner = msg.winner;
    }

     preload(){
       this.load.image("character_background", "././resources/img/sceneBackground/character_background.png");
       this.load.image("character_description_area", "././resources/img/interfaces/areas/character_description_area.png");
       this.load.image("juani_winner", "././resources/img/Interfaces/characterRep/juani_winner.png");
       this.load.image("juani_cursed_winner", "././resources/img/Interfaces/characterRep/juani_cursed_winner.png");

    }

    create(){

        this.add.image(0, 0, "character_background").setOrigin(0, 0);
        this.add.text(config.width/3 -10, config.height/18, 'Ganador', {fill: '#fff', font: "Arial", font: "60px"}).setDepth(1);
        this.add.text(config.width/20, config.height/1.4, 'Pulsa M para ir al menú\nprincipal', {fill: '#fff', font: "Arial", font: "16px"}).setDepth(2);
        this.add.text(config.width/20, config.height/1.4 +40, 'Pulsa N para ir a la\npantalla de selección\nde personaje', {fill: '#fff', font: "Arial", font: "16px"}).setDepth(2);
        this.add.text(config.width/20, config.height/1.4 +100, 'Pulsa B para volver a\njugar', {fill: '#fff', font: "Arial", font: "16px"}).setDepth(2);
        this.add.image(config.width/80, config.height/1.5 +3, 'character_description_area').setDepth(1).setScale(.9, 1.1).setOrigin(0,0);

        this.renderWinner();


        this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.key_N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

}




    update(){
        if(Phaser.Input.Keyboard.JustDown(this.key_M)){
            this.toMenuScene();
        }else if(Phaser.Input.Keyboard.JustDown(this.key_N)){
            this.toCharacterScene();
        }else if(Phaser.Input.Keyboard.JustDown(this.key_B)){
            this.toGameScene();
        }

    }

    toMenuScene(){
        this.scene.start("mainMenu");
    }
    toCharacterScene(){
        this.scene.start("character");
    }
    toGameScene(){
        this.scene.start("stadiumGame");
    }

    renderWinner(){
      if(this.winner == 'Jugador 1'){
        this.add.image(config.width/2, config.height/1.8, "juani_winner").setScale(.33).setDepth(1);
      }else if (this.winner == 'Jugador 2'){
        this.add.image(config.width/2, config.height/1.8, "juani_cursed_winner").setScale(.33).setDepth(1);

      }
    };

}
