class mainMenu extends Phaser.Scene{
    constructor (){
        super("mainMenu");

        var playButton;
        var tutorialButton;
        var optionsButton;
        var creditsButton;
        var button_vector;
        var button_selected;
    }

     preload(){
        this.load.image("background_mainMenu", "././resources/img/background_mainMenu.png");
    }

    create(){
        var style = { font: "25px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

        this.playButton = this.add.text(config.width/2.15, config.height/1.8, 'Jugar', style).setDepth(1);
        this.tutorialButton = this.add.text(config.width/2.25, config.height/1.8 + 50, 'Tutorial', style).setDepth(1);
        this.optionsButton = this.add.text(config.width/2.25, config.height/1.8 + 100, 'Ajustes', style).setDepth(1);
        this.creditsButton = this.add.text(config.width/2.25, config.height/1.8 +150, 'Créditos', style).setDepth(1);

        this.add.image(config.width/2, config.height/2, "background_mainMenu").setDepth(0);

        //Creación de un array con los botones
        this.button_selected = null;
        this.button_vector=  [this.playButton, this.tutorialButton, this.optionsButton, this.creditsButton];

        //Setteo de la interactividad
        this.playButton.setInteractive();
        this.tutorialButton.setInteractive()
        this.creditsButton.setInteractive();
        this.optionsButton.setInteractive();

        //Setteo de la interactividad
        this.playButton.on('pointerdown', () =>  this.scene.start("characterSelection"));
        this.tutorialButton.on('pointerdown', () => this.scene.start("tutorial"));
        this.creditsButton.on('pointerdown', () => this.scene.start("credits"));
        this.optionsButton.on('pointerdown', () => this.scene.start("options"));

        //botones cuando se les pasa por encima
        this.playButton.on('pointerover', () =>  this.playButton.setStyle({ fill: '#ff8000'}));
        this.tutorialButton.on('pointerover', () =>  this.tutorialButton.setStyle({ fill: '#ff8000'}));
        this.creditsButton.on('pointerover', () => this.creditsButton.setStyle({ fill: '#ff8000'}));
        this.optionsButton.on('pointerover', () => this.optionsButton.setStyle({ fill: '#ff8000'}));

        //botones cuando se les pasa por encima
        this.playButton.on('pointerout', () =>  this.playButton.setStyle({ fill: '#000'}));
        this.tutorialButton.on('pointerout', () =>  this.tutorialButton.setStyle({ fill: '#000'}));
        this.creditsButton.on('pointerout', () => this.creditsButton.setStyle({ fill: '#000'}));
        this.optionsButton.on('pointerout', () => this.optionsButton.setStyle({ fill: '#000'}));


        /*
        //Flechas
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        */

        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    };

    update(){
      this.toSelectButton();
      this.toEnterButton();
    }

    toSelectButton(){
        if(Phaser.Input.Keyboard.JustDown(this.key_DOWN)){
            if(this.button_selected == null){
                this.button_selected = 0;
                this.button_vector[0].setStyle({ fill: '#ff8000'});
            }else{
                this.button_vector[this.button_selected].setStyle({ fill: '#000'});
                
                if(this.button_selected == 3){
                    this.button_selected = -1;
                }
                this.button_selected ++;
                this.button_vector[this.button_selected].setStyle({ fill: '#ff8000'});
            }
        }else if (Phaser.Input.Keyboard.JustDown(this.key_UP))
            if (this.button_selected == null){
                this.button_selected = 0;
                this.button_vector[0].setStyle({ fill: '#ff8000'});
            }else{
                this.button_vector[this.button_selected].setStyle({ fill: '#000'});
                if(this.button_selected == 0){
                    this.button_selected = 4;
                }
                this.button_selected --;
                this.button_vector[this.button_selected].setStyle({ fill: '#ff8000'});
            }
        }
        
    toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.button_selected != null) {
          if (this.button_selected == 0) {
            this.scene.start("characterSelection");
          } else if (this.button_selected == 1){
            this.scene.start("tutorial");
          }else if (this.button_selected == 2){
            this.scene.start("options")
          }else if(this.button_selected == 3){
            this.scene.start("credits");
          }
        }
      }
    }

}
