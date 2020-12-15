class character extends Phaser.Scene{
    constructor (){
        super("character");
        var exitButton;
        var juaniButton;
        var juaniCursedButton;
        var lastSelectedButton;
        var selectedButton;
        var descriptionText;
        var descriptionArea;

    }

     preload(){
        this.load.image("character_background", "././resources/img/sceneBackground/character_background.png");
        this.load.image("exit_arrow", "././resources/img/Interfaces/buttons/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/Interfaces/buttons/exit_arrow_selected.png")
        this.load.image("rep_Juani", "././resources/img/Interfaces/characterRep/rep_Juani.png");
        this.load.image("rep_Juani_selected", "././resources/img/Interfaces/characterRep/rep_Juani_selected.png");
        this.load.image("rep_Juani_cursed", "././resources/img/Interfaces/characterRep/rep_Juani_cursed.png");
        this.load.image("juani_dialogue", "././resources/img/Interfaces/characterRep/juani_dialogue.png");
        this.load.image("juani_cursed_dialogue", "././resources/img/Interfaces/characterRep/juani_cursed_dialogue.png");

        this.load.image("rep_Juani_cursed_selected", "././resources/img/Interfaces/characterRep/rep_Juani_cursed_selected.png");
        this.load.image("character_description_area", "././resources/img/interfaces/areas/character_description_area.png");

    }

    create(){
        this.add.image(0, 0, "character_background").setOrigin(0, 0).setDepth(0);
        this.add.text(config.width/6, config.height/18, 'Selecciona a tu campeón', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1);
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setDepth(1).setScale(.1);
        this.descriptionArea = this.add.image(config.width/6, config.height/1.4, "character_description_area").setDepth(2)
        .setScale(1.6,0.9).setOrigin(0, 0).setVisible(false);
        this.descriptionText = this.add.text(config.width/5, config.height/1.33, "", {fill: "#fff" ,font: "Arial", font: "18px"}).setDepth(3).setWordWrapWidth(450);
        this.juaniButton =  new characterCard( this, config.width/4, config.height/2.2, "Tras limpiar, cocinar, cuidar a sus 4302 palomas "
        + " y salir de su 'AEROBIC ULTRA INTENSIVE class' La Juani está lista "
        +"\npara participar en Aniaml BOOM Mayhem.", "rep_Juani", "rep_Juani_selected",-config.width/50, config.height/1.5, "juani_dialogue");
        this.juaniCursedButton =  new characterCard( this, config.width/1.4, config.height/2.2, "Juani Cursed fue una vez uan fan acosadora de"+
        "La Juani. Ahora mismo su meta es suplantarla y ser 'La Juani Original'. \n'Todo lo que diga sobre mí es mentira'", "rep_Juani_cursed",
         "rep_Juani_cursed_selected", config.width/1.3, config.height/1.5,  "juani_cursed_dialogue");

        //Setteo de la interactivdad
        this.exitButton.setInteractive();
        this.juaniButton.characterImage.setInteractive();
        this.juaniCursedButton.characterImage.setInteractive();

        //pointerdown
        this.exitButton.on('pointerdown', () => this.scene.start('mainMenu'));

        //pointerover
        this.exitButton.on('pointerover', () =>
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow_selected").setDepth(1).setScale(.1));


        //pointerout
        this.exitButton.on('pointerout', () =>
        this.exitButton = this.add.image(config.width/20, config.height/11, "exit_arrow").setDepth(1).setScale(.1));

        //Flechas
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Scape
        this.key_SCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


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
        this.descriptionArea.setVisible(false);
        break;
      case 1:
        this.juaniButton.renderCard();
        this.descriptionText.setText(this.juaniButton.description);
        this.descriptionArea.setVisible(true);
        break;
      case 2:
        this.juaniCursedButton.renderCard();
        this.descriptionText.setText(this.juaniCursedButton.description);
        this.descriptionArea.setVisible(true);
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
      if(Phaser.Input.Keyboard.JustDown(this.key_A)){ //Si se pulsa la felcha izquierda
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
      } else if(Phaser.Input.Keyboard.JustDown(this.key_D)){
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
      }else if (Phaser.Input.Keyboard.JustDown(this.key_SCAPE)){
          this.scene.start("mainMenu");
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
          } else if (this.selectedButton == 2){
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.scene.start("scenario");
          }
        }
      }
    }

}
