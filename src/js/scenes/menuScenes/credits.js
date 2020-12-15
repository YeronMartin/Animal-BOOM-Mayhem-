class credits extends Phaser.Scene{
    constructor (){
        super("credits");
        var exitButton;
        var button_selected = null;
    }

     preload(){
       this.load.image("exit_arrow", "././resources/img/Interfaces/buttons/exit_arrow.png");
       this.load.image("exit_arrow_selected", "././resources/img/Interfaces/buttons/exit_arrow_selected.png");
       this.load.image("credits_background", "././resources/img/sceneBackground/credits_background.png");

    }

    create(){
        this.add.image(0, 0, "credits_background").setDepth(0).setOrigin(0, 0);
        this.add.text(config.width/4.5, 25, '¿Quiénes somos?', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1);
        this.exitButton = this.add.image(50, 50, "exit_arrow").setScale(.1);
        this.add.text((config.width/3)- 25, config.height/3.4, "Somos un grupo de amigos haciendo nuestro primero juego en PHASER 3", {fill: '#fff', font: "Arial", font: "20px"}).setDepth(2).setWordWrapWidth(350);
        this.add.text((config.width/3)- 25, config.height/2, "!!MUCHAS GRACIAS POR JUGAR!!", {fill: '#fff', font: "Arial", font:  "30px"}).setDepth(2).setWordWrapWidth(350);

        //Setteo de la interactividad
        this.exitButton.setInteractive();

        //pointerdown
        this.exitButton.on('pointerdown', () =>  this.scene.start('mainMenu'));

        //pointerover
        this.exitButton.on('pointerover', () =>
        this.exitButton = this.add.image(50, 50, "exit_arrow_selected").setScale(.1));

        //pointerout
        this.exitButton.on('pointerout', () =>
        this.exitButton = this.add.image(50, 50, "exit_arrow").setScale(.1));

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
          this.exitButton = this.add.image(50, 50, "exit_arrow_selected").setScale(.1);
        }else {
          this.exitButton = this.add.image(50, 50, "exit_arrow_selected").setScale(.1);
          this.button_selected = null;
        }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){
          if (this.button_selected == null){
            this.button_selected = this.exitButton;
            this.exitButton = this.add.image(50, 50, "exit_arrow").setScale(.1);
          }else {
            this.exitButton = this.add.image(50, 50, "exit_arrow").setScale(.1);
            this.button_selected = null;
          }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_ESC)){
          this.scene.start("mainMenu");
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
