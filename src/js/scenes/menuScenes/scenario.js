class scenario extends Phaser.Scene{
    constructor (){
        super("scenario");

        var exitButton;
        var estadioButton;
        var gameSettingsButtonButtton;
        var selectedButton;
        var lastSelectedButton;
        var player;
    }

    init(data){
      this.player = data.player;
    }

    preload(){
        this.load.image("stage_background", "././resources/img/sceneBackground/stage_background.png");
        this.load.image("rep_estadio", "././resources/img/Interfaces/stageRep/rep_estadio.png");
        this.load.image("rep_estadio_selected", "././resources/img/Interfaces/stageRep/rep_estadio_selected.png");
        this.load.image("rep_estadio_background", "././resources/img/Interfaces/stageRep/rep_estadio_background.png");
        this.load.image("exit_arrow", "././resources/img/Interfaces/buttons/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/Interfaces/buttons/exit_arrow_selected.png")
    }

    create(){
      //Creacion de la imagenes
        this.add.image(0, 0, "stage_background").setOrigin(0, 0);
        this.add.text(config.width/6, config.height/18, 'Selecciona el escenario', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1);

        //Seteo de los botones
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setScale(.1);
        this.estadioButton = new stageCard( this, config.width/2, config.height/1.12, "rep_estadio", "rep_estadio_selected", "rep_estadio_background");

        /*
        //Setteo de la interactividad
        this.exitButton.setInteractive();
        this.estadioButton.stageImageButton.setInteractive();

        //pointerdown
        this.exitButton.on('pointerdown', () => this.scene.start('characterScene'));

        //pointerover
        this.exitButton.on('pointerover', () =>
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow_selected").setDepth(1).setScale(.1));

        //pointerout
        this.exitButton.on('pointerout', () =>
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setDepth(1).setScale(.1));
*/
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
          this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow_selected").setScale(.1);
          break;
        case 1:
          this.estadioButton.renderStage();
          break;
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case  0:
          this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setScale(.1);
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
          this.scene.start("characterScene");
      }
    };

    toEnterButton(){
          if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.selectedButton != null) {
              if (this.selectedButton == 0) {
                this.scene.start("characterScene");
              } else if (this.selectedButton == 1){
                this.scene.start("lobbyScene", {player: this.player});
              }
            }

            this.menuSelectSfx.play();
          }
    };

}
