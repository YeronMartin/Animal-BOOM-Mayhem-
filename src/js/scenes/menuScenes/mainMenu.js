class mainMenu extends Phaser.Scene{
    constructor (){
        super("mainMenu");

        var playButton;
        var tutorialButton;
        var optionsButton;
        var creditsButton;
        var button_vector;
        var selected_button;
        var tutorialButton;
    }

    preload(){
        this.load.image("mainMenu_background", "././resources/img/sceneBackground/mainMenu_background.png");
        this.load.image("play_button", "././resources/img/interfaces/buttons/play_button.png");
        this.load.image("play_button_selected", "././resources/img/interfaces/buttons/play_button_selected.png");
        this.load.image("settings_button_selected", "././resources/img/interfaces/buttons/settings_button_selected.png");
        this.load.image("settings_button", "././resources/img/interfaces/buttons/settings_button.png");
        this.load.image("credits_button", "././resources/img/interfaces/buttons/credits_button.png");
        this.load.image("credits_button_selected", "././resources/img/interfaces/buttons/credits_button_selected.png");
        this.load.image("tutorial_button", "././resources/img/interfaces/buttons/tutorial_button.png");
        this.load.image("tutorial_button_selected", "././resources/img/interfaces/buttons/tutorial_button_selected.png");

        this.load.audio('menuSelectSfx', ['././resources/audio/sonido/co_cartoon_splodge_splat_010.mp3']);
        this.load.audio('menu_bgm', ['././resources/audio/musica/Use-Your-Time-Wisely_AdobeStock_357365454_preview.m4a']);
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
        this.tutorialButton.setInteractive();
        //this.settingsButton.setInteractive();

/*

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
        this.tutorialButton.on('pointerover', () =>
        this.tutorialButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button_selected').setDepth(1).setScale(.075));
        //this.settingsButton.on('pointerover', () =>
        //this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button_selected').setDepth(1).setScale(.075));

        //botones cuando se les pasa por encima
        this.playButton.on('pointerout', () =>
        this.playButton = this.add.image(config.width/2 -10, config.height/1.3, 'play_button').setDepth(1).setScale(.075));
        this.creditsButton.on('pointerout', () =>
        this.creditsButton = this.add.image(config.width/2 -10, config.height/1.3 +100, 'credits_button').setDepth(1).setScale(.075));
        this.tutorialButton.on('pointerout', () =>
         this.tutorialButton = this.add.image(config.width/2 -10, config.height/1.3 +50, 'tutorial_button').setDepth(1).setScale(.075));
        //this.settingsButton.on('pointerout', () =>
        //this.settingsButton = this.add.image(config.width/2 -10, config.height/1.5 +50, 'settings_button').setDepth(1).setScale(.075));

        */

        //Flechas
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.menuSelectSfx = this.sound.add('menuSelectSfx');
        this.menuSelectSfx.setVolume(0.3);

        this.game.sound.stopAll();
        
        this.menuBgm = this.sound.add('menu_bgm');
        //this.menuBgm.setVolume(0.1);
        //this.menuBgm.play();

        this.game.sound.play('menu_bgm', {volume: 0.1});
        this.game.sound.volume = 0.1;
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
      if(Phaser.Input.Keyboard.JustDown(this.key_S)){
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
      }else if (Phaser.Input.Keyboard.JustDown(this.key_W)){
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
            this.menuSelectSfx.play();
          }/* else if (this.selectedButton == 1){
            this.scene.start("options");
          }*/else if (this.selectedButton == 2){
            this.scene.start("credits")
            this.menuSelectSfx.play();
          }else if (this.selectedButton == 1){
            this.scene.start("tutorial")
            this.menuSelectSfx.play();
          }
        }
      }
    }

}
