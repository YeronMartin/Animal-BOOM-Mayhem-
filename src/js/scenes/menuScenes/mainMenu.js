class mainMenu extends Phaser.Scene{
    constructor (){
        super("mainMenu");

        var playButton;
        var tutorialButton;
        var optionsButton;
        var creditsButton;
        var button_vector;
        var button_selected;
        var tutorialButton;
    }

     preload(){
          this.load.image("background_mainMenu", "././resources/img/background_mainMenu.png");
        this.load.image("mainMenu_background", "././resources/img/mainMenu_background.png");
        this.load.image("play_button", "././resources/img/interfaces/play_button.png");
        this.load.image("play_button_selected", "././resources/img/interfaces/play_button_selected.png");
        this.load.image("settings_button_selected", "././resources/img/interfaces/settings_button_selected.png");
        this.load.image("settings_button", "././resources/img/interfaces/settings_button.png");
        this.load.image("credits_button", "././resources/img/interfaces/credits_button.png");
        this.load.image("credits_button_selected", "././resources/img/interfaces/credits_button_selected.png");
         this.load.image("tutorial_button", "././resources/img/interfaces/tutorial_button.png");
        this.load.image("tutorial_button_selected", "././resources/img/interfaces/tutorial_button_selected.png");
    }

     create(){

        this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button').setDepth(1).setScale(.075);
        //this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 + 50, 'settings_button').setDepth(1).setScale(.075);
        this.creditsButton = this.add.image(config.width/2 -10,config.height/1.3 +100, 'credits_button').setDepth(1).setScale(.075);
         this.tutorialButton =  this.add.image(config.width/2 -10,config.height/1.3 +50, 'tutorial_button').setDepth(1).setScale(.075);

        this.add.image(-config.width/14, 0, "mainMenu_background").setOrigin(0, 0).setDepth(0).setScale(.4);

        //Setteo de la interactividad
        this.playButton.setInteractive ();
        this.creditsButton.setInteractive();
        //this.settingsButton.setInteractive();

        //Setteo de la interactividad
        this.playButton.on('pointerdown', () =>  this.scene.start("character"));
        this.creditsButton.on('pointerdown', () => this.scene.start("credits"));
        this.tutorialButton.on('pointerdown', () => this.scene.start("tutorial"));
         
        //this.settingsButton.on('pointerdown', () => this.scene.start("options"));

        //botones cuando se les pasa por encima
        this.playButton.on('pointerover', () =>
        this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button_selected').setDepth(1).setScale(.075));
        this.creditsButton.on('pointerover', () =>
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +100, 'credits_button_selected').setDepth(1).setScale(.075));
         this.tutorialButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button_selected').setDepth(1).setScale(.075);
        //this.settingsButton.on('pointerover', () =>
        //this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button_selected').setDepth(1).setScale(.075));

        //botones cuando se les pasa por encima
        this.playButton.on('pointerout', () =>
        this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button').setDepth(1).setScale(.075));
        this.creditsButton.on('pointerout', () =>
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +100, 'credits_button').setDepth(1).setScale(.075));
         this.tutorialButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button').setDepth(1).setScale(.075);
        //this.settingsButton.on('pointerout', () =>
        //this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button').setDepth(1).setScale(.075));

        //Flechas
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    };

    update(){
      this.toSelectButton();
      this.toEnterButton();
    }

  renderButtons(i, j){
  switch (this.selectedButton) {
    case 0:
      this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button_selected').setDepth(1).setScale(.075);
      break;
    /*case 1:
      this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button_selected').setDepth(1).setScale(.075);
      break;*/
      case 2:
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +100, 'credits_button_selected').setDepth(1).setScale(.075);
        break;
    case 1:
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button_selected').setDepth(1).setScale(.075);
        break;
    default:
    break;
  }
  switch (this.lastSelectedButton) {
    case 0:
      this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button').setDepth(1).setScale(.075);
      break;
    /*case 1:
      this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button').setDepth(1).setScale(.075);
      break;*/
      case 2:
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +100, 'credits_button').setDepth(1).setScale(.075);
        break;
      case 1:
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button').setDepth(1).setScale(.075);
        break;
    default:
    break;
  }
  this.lastSelectedButton = this.selectedButton;

}

  toSelectButton(){
      if(Phaser.Input.Keyboard.JustDown(this.key_DOWN)){
          if (this.selectedButton == null){
            this.selectedButton = 0;
            this.renderButtons();
          }else{

            if(this.selectedButton == 2){
              this.selectedButton = -1;
            }
            this.selectedButton ++;
            this.renderButtons();
          }
      }else if (Phaser.Input.Keyboard.JustDown(this.key_UP)){
          if (this.selectedButton == null){
            this.selectedButton = 1;
            this.renderButtons();
          }else {
            if(this.selectedButton == 0){
              this.selectedButton = 3;
            }
            this.selectedButton --;
            this.renderButtons();
          }
      }
  }
  toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.selectedButton != null) {
          if (this.selectedButton == 0) {
            this.scene.start("character");
          }/* else if (this.selectedButton == 1){
            this.scene.start("options");
          }*/else if (this.selectedButton == 2){
            this.scene.start("credits")
          }else if (this.selectedButton == 1){
            this.scene.start("tutorial")
          }
        }
      }
    }

}
