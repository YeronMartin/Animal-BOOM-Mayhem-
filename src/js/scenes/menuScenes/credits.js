class credits extends Phaser.Scene{
    constructor (){
        super("credits");
        var exitButton;
        var button_selected = null;
    }

     preload(){
        this.load.image("background_credits", "././resources/img/background_credits.png");
        this.load.image("exit_arrow", "././resources/img/exit_arrow.png");
        this.load.image("exit_arrow_selected", "././resources/img/exit_arrow_selected.png")
    }

    create(){
        this.add.image(400, 300, "background_credits").setDepth(0);
        this.add.text(500, 50, '¿Quiénes somos?', {fill: '#000000'}).setDepth(1);
        this.exitButton = this.add.image(50, 50, "exit_arrow");
        this.exitButton.setScale(.1);
        //Setteo de la interactividad
        this.exitButton.setInteractive();
        this.exitButton.on('pointerdown', () =>  this.scene.start('mainMenu'));
        
        //Flechas A y D
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        //Enter, ESPACIO y ESCAPE
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        this.toSelectButton();
        this.toEnterButton();
    }

    toSelectButton(){
      if(Phaser.Input.Keyboard.JustDown(this.key_LEFT)){
        if (this.button_selected == null){
          this.button_selected = this.exitButton;
          this.exitButton = this.add.image(50, 50, "exit_arrow_selected");
          this.exitButton.setScale(.1);
        }else {
          this.exitButton = this.add.image(50, 50, "exit_arrow_selected");
          this.exitButton.setScale(.1);
          this.button_selected = null;
        }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){
          if (this.button_selected == null){
            this.button_selected = this.exitButton;
            this.exitButton = this.add.image(50, 50, "exit_arrow");
            this.exitButton.setScale(.1);
          }else {
            this.exitButton = this.add.image(50, 50, "exit_arrow");
            this.exitButton.setScale(.1);
            this.button_selected = null;
          }
      }
    }
    
    toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE) || Phaser.Input.Keyboard.JustDown(this.key_ESC)) {
        if (this.button_selected != null){
          this.scene.start("mainMenu");
        }
      }
    }
}
