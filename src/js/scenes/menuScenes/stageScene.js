class stageScene extends Phaser.Scene{
    constructor (){
        super("stageScene");

        var exitButton;
        var estadioButton;
        var gameSettingsButtonButtton;
        var selectedButton;
        var lastSelectedButton;
    }

    preload(){
    }

    create(){
      //Creacion de la imagenes
        this.add.image(0, 0, "stage_background").setOrigin(0, 0);
        this.add.text(config.width/6, config.height/18, 'Selecciona el escenario', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1);

        //Seteo de los botones
        this.estadioButton = new stageCard( this, config.width/2, config.height/1.12, "rep_estadio", "rep_estadio_selected", "rep_estadio_background");

        //creación de el sprite de flecha
        this.initAnimArrow();
        this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
        this.exitButton.play('white');

        //Inicalizacion de las variables de seleccion
        this.selectedButton = null;
        this.lastSelectedButton = null;

        //Flechas
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Escape
        this.key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.menuSelectSfx = this.sound.add('menuSelectSfx');
        this.menuSelectSfx.setVolume(0.2);
    }

    update(){
        this.toSelectButton();
        this.toEnterButton();
    }

    renderButtons (){
      switch (this.selectedButton) {
        case  0:
          this.exitButton.play('selected');
          break;
        case 1:
          this.estadioButton.renderStage();
          break;
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case  0:
          this.exitButton.play('white');
          break;
        case 1:
          this.estadioButton.renderStage();
          break;
        default:
          break;
      }
    }

    toSelectButton(){
            if(Phaser.Input.Keyboard.JustDown(this.key_A)){ //Si se pulsa la felcha izquierda
              if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
                //Selecciona la flecha de salida
                this.selectedButton = 0;
                this.renderButtons();
              }else {
                //Si la felcha se ha seleccionado
                this.lastSelectedButton = this.selectedButton;
                if(this.selectedButton == 0){this.selectedButton = 2;}
                this.selectedButton--;
                this.renderButtons();
              }
          }if(Phaser.Input.Keyboard.JustDown(this.key_D)){ //Si se pulsa la felcha izquierda
            if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
              //Selecciona la flecha de salida
              this.selectedButton = 1;
              this.renderButtons(this.selectedButton, this.lastSelectedButton);
            }else {
              //Si la felcha se ha seleccionado
              this.lastSelectedButton = this.selectedButton;
              if(this.selectedButton == 1){this.selectedButton = -1;}
              this.selectedButton++;
              this.renderButtons();
            }
        }if(Phaser.Input.Keyboard.JustDown(this.key_ESC)){ //Si se pulsa la felcha izquierda
          this.scene.start("character");
      }
    };

    toEnterButton(){
          if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.selectedButton != null) {
              if (this.selectedButton == 0) {
                this.scene.start("character");
              } else if (this.selectedButton == 1){
                this.scene.start("stadiumGame", {players: 2, characters: ['juani', 'juani_cursed'], mode: 'local'});
              }
            }

            this.menuSelectSfx.play();
          }
    };

    initAnimArrow() {
      this.anims.create({
        key: 'black',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [0]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'white',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [1]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'selected',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [2]
        }),
        frameRate: 0,
        repeat: 1
      });
    };

}
