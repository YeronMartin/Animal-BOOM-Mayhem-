class postGame extends Phaser.Scene{
    constructor (){
        super("postGame");

        var winner;
        var mode;
        var selectedButton;
        var lastSelectedButton;
        var menuButton;
        var characterButton;
        var playButton;
    }

    init(msg){
      console.log(msg);

      this.mode = msg.mode;
      

      if(this.mode == "local"){
        console.log("Winner tal: "+msg.character);
        this.winnerCharacter = msg.character;
      }else{
        this.winner = msg.winner;
        this.winnerCharacter = msg.winner.character;
       
      }
    }

    preload(){

    }

    create(){
        this.add.image(0, 0, "character_background").setOrigin(0, 0).setScale(1.3);
        this.add.text(config.width/2, 75, 'Ganador', {fill: '#fff', font: "Arial", font: "60px"}).setDepth(1).setOrigin(0.5, 0.5);

        //this.mode = 'local';



        this.initAnimButtons();

        this.lastSelectedButton = 1;
        this.selectedButton = 1;


        //Flechas
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.renderWinner();

        this.createButtons()
}

    update(){
      if (this.mode == 'local') {
        this.toEnterButtonOFF();
        this.toSelectButtonOFF();
      }else if (this.mode == 'online'){
        this.toEnterButtonON();
        this.toSelectButtonON();
      }
    }

    createButtons (){
      if (this.mode == 'local') {
        this.playButton = this.add.sprite(config.width/2, config.height/1.1).setScale(.2).setDepth(2);
        this.characterButton = this.add.sprite(config.width/1.4, config.height/1.1).setScale(.2).setDepth(2);
        this.menuButton = this.add.sprite(config.width/3.5, config.height/1.1 ).setScale(.2).setDepth(2);

        this.playButton.play('play_selected');
        this.characterButton.play('personajes');
        this.menuButton.play('menu');

      }else if (this.mode == 'online'){
        this.characterButton = this.add.sprite(config.width/1.5, config.height/1.1).setScale(.2).setDepth(2);
        this.menuButton = this.add.sprite(config.width/3, config.height/1.1 ).setScale(.2).setDepth(2);

        this.characterButton.play('personajes');
        this.menuButton.play('menu_selected');
      }
    }

    toMenuScene(){

        this.game.sound.stopAll();
        this.game.sound.play('menu_bgm', {volume: 0.1});
        this.scene.start("mainMenuScene");
    }

    toCharacterScene(){
        this.game.sound.stopAll();
        this.game.sound.play('menu_bgm', {volume: 0.1});
        this.scene.start("characterScene");
    }

    toGameScene(){
        this.scene.start("stadiumGame");
    }

    renderWinner(){
        //console.log("Ganador: "+this.winner.character);
        if(this.winnerCharacter == 'juani'){
            this.add.image(config.width/2, config.height/1.8, "juani_winner").setScale(.33).setDepth(1);
        }else if (this.winnerCharacter == 'juani_cursed'){
            this.add.image(config.width/2, config.height/1.8, "juani_cursed_winner").setScale(.33).setDepth(1);
        }else if(this.winnerCharacter == 'gato_finanzas'){
          this.add.image(config.width/2, config.height/1.8, "gato_finanzas_winner").setScale(.33).setDepth(1);
        }

        if(this.mode == "online"){
          this.add.text(200, 200, this.winner.name, {fill: '#fff', font: "Arial", font: "60px"}).setDepth(1);
        }
       
        /*
      if(this.winner == 'Jugador 1'){
        this.add.image(config.width/2, config.height/1.8, "juani_winner").setScale(.33).setDepth(1);
      }else if (this.winner == 'Jugador 2'){
        this.add.image(config.width/2, config.height/1.8, "juani_cursed_winner").setScale(.33).setDepth(1);

      }
      */

    }

    toSelectButtonOFF() {
      if (Phaser.Input.Keyboard.JustDown(this.key_A)) { //Si se pulsa la felcha izquierda
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 2;
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 0) {
            this.selectedButton = 3;
          }
          this.selectedButton--;
        }
        this.renderButtonsOFF();
      } else if (Phaser.Input.Keyboard.JustDown(this.key_D)) {
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 0;
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 2) {
            this.selectedButton = -1;
          }
          this.selectedButton++;
        }
        this.renderButtonsOFF();
      }

    };

    toEnterButtonOFF() {
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.selectedButton != null) {
          if (this.selectedButton == 1) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.toGameScene();

          } else if (this.selectedButton == 0) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.toMenuScene();

          } else if (this.selectedButton == 2) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.toCharacterScene();
          }
        }
      }
    };

    renderButtonsOFF() {
      switch (this.selectedButton) {
        case 0:
          this.menuButton.play('menu_selected');
          break;
        case 1:
          this.playButton.play('play_selected');
          break;
        case 2:
          this.characterButton.play('personajes_selected');
          break;
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case 0:
        this.menuButton.play('menu');
          break;
        case 1:
          this.playButton.play('play');
          break;
        case 2:
          this.characterButton.play('personajes');
          break;
        default:
          break;
      }

      this.lastSelectedButton = this.selectedButton;

    }

    initAnimButtons() {
      this.anims.create({
        key: 'play',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [0]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'play_selected',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [1]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'personajes',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [2]
        }),
        frameRate: 0,
        repeat: 1
      });
      this.anims.create({
        key: 'personajes_selected',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [3]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'menu',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [4]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'menu_selected',
        frames: this.anims.generateFrameNames('postGame_buttons', {
          frames: [5]
        }),
        frameRate: 0,
        repeat: 1
      });
    };

    toSelectButtonON() {
      if (Phaser.Input.Keyboard.JustDown(this.key_A)) { //Si se pulsa la felcha izquierda
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 1;
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 0) {
            this.selectedButton = 2;
          }
          this.selectedButton--;
        }
        this.renderButtonsON();
      } else if (Phaser.Input.Keyboard.JustDown(this.key_D)) {
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 0;
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 1) {
            this.selectedButton = -1;
          }
          this.selectedButton++;
        }
        this.renderButtonsON();
      }

    };

    toEnterButtonON() {
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.selectedButton != null) {
          if (this.selectedButton == 0) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.toMenuScene();

          } else if (this.selectedButton == 1) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.toCharacterScene();
          }
        }
      }
    };

    renderButtonsON() {
      switch (this.selectedButton) {
        case 0:
          this.menuButton.play('menu_selected');
          break;
        case 1:
          this.characterButton.play('personajes_selected');
          break;
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case 0:
        this.menuButton.play('menu');
          break;
        case 1:
          this.characterButton.play('personajes');
          break;
        default:
          break;
      }

      this.lastSelectedButton = this.selectedButton;

    }

}
