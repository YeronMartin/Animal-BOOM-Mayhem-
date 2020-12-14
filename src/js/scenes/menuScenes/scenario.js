class scenario extends Phaser.Scene{
    constructor (){
        super("scenario");

        var exitButton;
        var estadioButton;
        var gameSettingsButtonButtton;
        var selectedButton = null;
        var lastSelectedButton = null;
        var button_vector;
    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/exit_arrow_selected.png");
        this.load.image("settings_button", "././resources/img/star.png");
        this.load.image("settings_button_selected", "././resources/img/star_selected.png");
        this.load.image("rep_Juani", "././resources/img/rep_Juani.png");
        this.load.image("rep_Juani_selected", "././resources/img/rep_Juani_selected.png");
    }

    create(){
      //Creacion de la imagenes
        this.add.image(400, 300, "background_credits");
        this.add.text(300, 50, 'Pantalla Modo de seleccion del escenario', {fill: '#000000'}).setDepth(1);
        //Seteo de los botones
        this.exitButton = this.add.image(50, 50, "exit_arrow");
        this.exitButton.setScale(.1);
        this.gameSettingsButton = this.add.image(750, 50, "settings_button");
        this.estadioButton = this.add.image( 600, 300, 'rep_Juani').setDepth(1).setScale(.15);
        //Setteo del array de botones
        this.button_vector = [this.exitButton, this.estadioButton, this.gameSettingsButton];
        //Setteo de la interactividad
        this.exitButton.setInteractive();
        this.estadioButton.setInteractive();
        this.gameSettingsButton.setInteractive();

        this.exitButton.on('pointerdown', () => this.scene.start('character'));
        this.estadioButton.on('pointerdown', () => this.scene.start('stadiumGame'));
        this.gameSettingsButton.on('pointerdown', () =>this.scene.start('gameSettingsButton'));

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

    renderButtons (i, j){
      switch (i) {
        case  0:
          this.exitButton = this.add.image(50, 50, "exit_arrow_selected").setDepth(1).setScale(.1);
          break;
        case 1:
          this.estadioButton = this.add.image( 600, 300, 'rep_Juani_selected').setDepth(1).setScale(.15);
          break;
        case 2:
          this.gameSettingsButton = this.add.image(750, 50, "settings_button_selected");
          break;
        default:
          break;
      }
      switch (j) {
      case  0:
          this.exitButton = this.add.image(50, 50, "exit_arrow").setDepth(1).setScale(.1);
          break;
        case 1:
          this.estadioButton = this.add.image( 600, 300, 'rep_Juani').setDepth(1).setScale(.15);
          break;
        case 2:
          this.gameSettingsButton = this.add.image(750, 50, "settings_button");
          break;
        default:
          break;
      }
    }

    toSelectButton(){
            if(Phaser.Input.Keyboard.JustDown(this.key_LEFT)){ //Si se pulsa la felcha izquierda
              if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
                //Selecciona la flecha de salida
                this.selectedButton = 0;
                this.renderButtons(this.selectedButton, this.lastSelectedButton);
              }else {
                //Si la felcha se ha seleccionado
                this.lastSelectedButton = this.selectedButton;
                if(this.selectedButton == 0){this.selectedButton = 3;}
                this.selectedButton--;
                this.renderButtons(this.selectedButton, this.lastSelectedButton);
              }
          }if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){ //Si se pulsa la felcha izquierda
            if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
              //Selecciona la flecha de salida
              this.selectedButton = 2;
              this.renderButtons(this.selectedButton, this.lastSelectedButton);
            }else {
              //Si la felcha se ha seleccionado
              this.lastSelectedButton = this.selectedButton;
              if(this.selectedButton == 2){this.selectedButton = -1;}
              this.selectedButton++;
              this.renderButtons(this.selectedButton, this.lastSelectedButton);
            }
        }
      }

    toEnterButton(){
          if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.selectedButton != null) {
              if (this.selectedButton == 0) {
                this.scene.start("mainMenu");
              } else if (this.selectedButton == 1){
                this.scene.start("stadiumGame");
              } else if (this.selectedButton == 2){
                this.scene.start("gameSettings");
              }
            }
          }
    }

}
