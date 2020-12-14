class character extends Phaser.Scene{
    constructor (){
        super("character");
        var exitButton;
        var juaniButton;
        var juaniCursedButton;
        var lastSelectedButton;
        var selectedButton;
        var descriptionText;

    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/exit_arrow_selected.png")
        this.load.image("rep_Juani", "././resources/img/rep_Juani.png");
        this.load.image("rep_Juani_selected", "././resources/img/rep_Juani_selected.png");
        this.load.image("rep_Juani_cursed", "././resources/img/rep_Juani_cursed.png");
        this.load.image("rep_Juani_cursed_selected", "././resources/img/rep_Juani_cursed_selected.png");
        this.load.image("character_description_area", "././resources/img/interfaces/character_description_area.png");

    }

    create(){
        this.add.image(-config.width/3.5, 0, "background_credits").setOrigin(0, 0).setDepth(0);
        this.add.text(config.width/6, config.height/10, 'Selecciona a tu campeón', {fill: '#000000', font: "40px"}).setDepth(1);
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setDepth(1).setScale(.1);
        this.add.image(config.width/6, config.height/1.5, "character_description_area").setDepth(2)
        .setScale(1.8,1).setOrigin(0, 0);
        this.descriptionText = this.add.text(config.width/5, config.height/1.4, "", {fill: "#000"}).setDepth(3);
        this.juaniButton =  new characterCard( this, config.width/4, config.height/4, "Madre de 2920 palomas, ama de casa \n"
        + "reina de la clase de aeróbic,\n pero cuando sale de clase...\n" + "Es la futura campeona"
        +"del torneo\n Animal BOOM Mayhem.\n Con esos biceps no hay quién la pare \n", "rep_Juani", "rep_Juani_selected");
        this.juaniCursedButton =  new characterCard( this, config.width/1.7, config.height/4, "perros", "rep_Juani_cursed", "rep_Juani_cursed_selected");

        //Setteo de la interactivdad
        this.exitButton.setInteractive();
        this.juaniButton.characterImage.setInteractive();
        this.exitButton.on('pointerdown', () => this.scene.start('mainMenu'));
        this.juaniButton.characterImage.on('pointerdown', () => this.scene.start('scenario'));
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

    renderButtons(){
    switch (this.selectedButton) {
      case 0:
        this.exitButton = this.add.image(config.width/20, config.height/11, 'exit_arrow_selected')
        .setDepth(2).setScale(.1);
        this.descriptionText.setText("");
        break;
      case 1:
        this.juaniButton.renderCard();
        this.descriptionText.setText(this.juaniButton.description);
        break;
      case 2:
        this.juaniCursedButton.renderCard();
        this.descriptionText.setText(this.juaniCursedButton.description);
        break;
      default:
      break;
    }
    switch (this.lastSelectedButton) {
      case 0:
        this.exitButton = this.add.image(config.width/20, config.height/11, 'exit_arrow')
        .setDepth(2).setScale(.1);
        break;
      case 1:
        this.juaniButton.renderCard();
        break;
      case 2:
        this.juaniCursedButton.renderCard();
        break;
      default:
      break;
    }

    this.lastSelectedButton = this.selectedButton;

    }

   toSelectButton(){
      if(Phaser.Input.Keyboard.JustDown(this.key_LEFT)){ //Si se pulsa la felcha izquierda
        if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 2;
          this.renderButtons();
        }else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 0) { this.selectedButton = 3;}
          this.selectedButton--;
          this.renderButtons();
        }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){
        if (this.selectedButton == null){ //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 0;
          this.renderButtons();
        }else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 2) { this.selectedButton = -1;}
          this.selectedButton++;
          this.renderButtons();
        }
      }
    }

    toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.selectedButton != null) {
          if (this.selectedButton == 1) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.scene.start("scenario");
          } else if (this.selectedButton == 0){
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.scene.start("mainMenu");
          }
        }
      }
    }

}
