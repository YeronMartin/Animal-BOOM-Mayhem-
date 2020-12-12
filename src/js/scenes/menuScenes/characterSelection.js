class characterSelection extends Phaser.Scene{
    constructor (){
        super("characterSelection");
        var exitButton;
        var button_selected = null;
        var juaniButton;
        var juaniName;
        var character;
    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/exit_arrow_selected.png")
        this.load.image("rep_Juani", "././resources/img/rep_Juani.png");
        this.load.image("rep_Juani_selected", "././resources/img/rep_Juani_selected.png");
    }

    create(){
        this.add.image(400, 300, "background_credits");
        this.add.text(400, 50, 'Pantalla Modo de seleccion del personaje', {fill: '#000000'}).setDepth(1);
        this.exitButton = this.add.image(50, 50, "exit_arrow").setDepth(1);
        this.exitButton.setScale(.1);
        //Juani card
        //this.juaniButton = this.add.image(config.width/2.15, config.height/1.8, "rep_Juani").setDepth(1);
        //this.juaniButton.setScale(.15);
        //this.juaniName = this.add.text(330, 400, "La Juani", {fill: "#fff"}).setDepth(2);
        this.juaniButton =  new characterCard( this, 330, 400, "Madre de 2920 palomas, ama de casa \n"
        + "reina de la clase de aeróbic,\n pero cuando sale de clase...\n" + "Es la futura campeona"
      +"del torneo\n Animal BOOM Mayhem.\n Con esos biceps no hay quién la pare \n");

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
   renderArrow(){
     if (this.button_selected == 1) {
       this.exitButton = this.add.image(50, 50, "exit_arrow_selected").setDepth(1);
       this.exitButton.setScale(.1);
     }else if (this.button_selected == 0){
       this.exitButton = this.add.image(50, 50, "exit_arrow").setDepth(1);
       this.exitButton.setScale(.1);
     }
   }

   toSelectButton(){
      if(Phaser.Input.Keyboard.JustDown(this.key_LEFT)){ //Si se pulsa la felcha izquierda
        if (this.button_selected == null){ //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.button_selected = 1;
          this.renderArrow();
        }else {
          //Si la felcha se ha seleccionado
          if (this.button_selected == 0) { this.button_selected = 1;}
          else {this.button_selected = 0;}
          this.renderArrow();
          this.juaniButton.renderCard(this.button_selected);
        }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){
        if (this.button_selected == null){ //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.button_selected = 0;
          this.juaniButton.renderCard(this.button_selected);
        }else {
          //Si la felcha se ha seleccionado
          if (this.button_selected == 0) { this.button_selected = 1;}
          else {this.button_selected = 0;}
          this.renderArrow();
          this.juaniButton.renderCard();
        }
      }
    }

    toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.button_selected != null) {
          if (this.button_selected == 1) {
            this.button_selected = null;
            this.scene.start("mainMenu");
          } else if (this.button_selected == 0){
            this.button_selected = null;
            this.scene.start("scenario");
          }
        }
      }
    }

}
