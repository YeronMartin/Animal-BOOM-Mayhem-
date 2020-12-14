class scenario extends Phaser.Scene{
    constructor (){
        super("scenario");

        var exitButton;
        var estadioButton;
        var gameSettingsButtonButtton;
        var selectedButton;
        var lastSelectedButton;
    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("game_settings_button", "././resources/img/star.png");
        this.load.image("game_settings_button_selected", "././resources/img/star_selected.png");
        }

    create(){
      //Creacion de la imagenes
        this.add.image(-config.width/3.5, 0, "background_credits").setOrigin(0, 0);
        this.add.text(config.width/6, config.height/18, 'Selecciona el escenario', {fill: '#000000', font: "40px"}).setDepth(1);
        //Seteo de los botones
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setScale(.1);
        //this.gameSettingsButton = this.add.image(config.width/1.1,config.height/11, "game_settings_button");
        this.estadioButton = this.add.image(config.width/1.5,config.height/1.5, 'rep_Juani').setDepth(1).setScale(.15);
        //Setteo de la interactividad
        this.exitButton.setInteractive();
        this.estadioButton.setInteractive();
        //this.gameSettingsButton.setInteractive();

        this.exitButton.on('pointerdown', () => this.scene.start('character'));
        this.estadioButton.on('pointerdown', () => this.scene.start('stadiumGame'));
        //this.gameSettingsButton.on('pointerdown', () =>this.scene.start('gameSettingsButton'));

        //Flechas
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
          this.estadioButton = this.add.image(config.width/1.5,config.height/1.5, 'rep_Juani_selected').setDepth(1).setScale(.15);
          break;
        /*case 2:
          this.gameSettingsButton = this.add.image(config.width/1.1,config.height/11, "game_settings_button_selected");
          break;*/
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case  0:
          this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setScale(.1);
          break;
        case 1:
          this.estadioButton = this.add.image(config.width/1.5,config.height/1.5, 'rep_Juani').setDepth(1).setScale(.15);
          break;
        /*case 2:
          this.gameSettingsButton = this.add.image(config.width/1.1,config.height/11, "game_settings_button");
          break;*/
        default:
          break;
      }
    }

    toSelectButton(){
            if(Phaser.Input.Keyboard.JustDown(this.key_LEFT)){ //Si se pulsa la felcha izquierda
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
          }if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){ //Si se pulsa la felcha izquierda
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
        }
      }

    toEnterButton(){
          if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.selectedButton != null) {
              if (this.selectedButton == 0) {
                this.scene.start("character");
              } else if (this.selectedButton == 1){
                this.scene.start("stadiumGame");
              }/* else if (this.selectedButton == 2){
                this.scene.start("gameSettings");
              }*/
            }
          }
    }

}
