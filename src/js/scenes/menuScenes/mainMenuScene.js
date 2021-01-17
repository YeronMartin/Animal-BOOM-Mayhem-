class mainMenuScene extends Phaser.Scene{
    constructor (){
        super("mainMenuScene");

        var playButton;
        var creditsButton;
        var button_vector;
        var selected_button;
        var tutorialButton;
        var player;
    }

     preload(){


    }

     create(){

        this.add.image(-config.width/14, 0, "mainMenu_background").setOrigin(0, 0).setDepth(0).setScale(.52);

        //Flechas
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Enter y espacio
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.key_T = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);


        this.selected_button = null;

        this.initAnimButtons();

        this.playButton = this.add.sprite(config.width/2 -10, config.height/1.25).setScale(.17).setDepth(2);
        this.tutorialButton = this.add.sprite(config.width/2 -10, config.height/1.25 +50).setScale(.17).setDepth(2);
        this.creditsButton = this.add.sprite(config.width/2 -10, config.height/1.25 + 100).setScale(.17).setDepth(2);

        this.playButton.play('play');
        this.tutorialButton.play('tutorial');
        this.creditsButton.play('credits');

        this.menuSelectSfx = this.sound.add('menuSelectSfx');
        this.menuSelectSfx.setVolume(0.3);

        this.game.sound.stopAll();

        this.menuBgm = this.sound.add('menu_bgm');
        //this.menuBgm.setVolume(0.1);
        //this.menuBgm.play();

        this.player = "Paco";
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
      this.playButton.play('play_selected')
      break;
    case 1:
      this.tutorialButton.play('tutorial_selected')
      break;
    case 2:
      this.creditsButton.play('credits_selected')
      break;

    default:
    break;
  }
  switch (this.lastSelectedButton) {
    case 0:
      this.playButton.play('play', {player : this.player})
      break;
    case 1:
      this.tutorialButton.play('tutorial')
      break;
    case 2:
      this.creditsButton.play('credits')
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
            this.menuSelectSfx.play();
            this.scene.start("characterScene", {player : this.player});
            this.selectedButton = null;
          }else if (this.selectedButton == 2){
            this.menuSelectSfx.play();
            this.scene.start("creditsScene");
            this.selectedButton = null;
          }else if (this.selectedButton == 1){
            this.menuSelectSfx.play();
            this.scene.start("tutorial");
            this.selectedButton = null;
          }
        }
      }
    };

  initAnimButtons(){
      this.anims.create({
          key: 'play',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [0]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'play_selected',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [1]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'tutorial',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [2]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'tutorial_selected',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [3]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'credits',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [4]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'credits_selected',
          frames: this.anims.generateFrameNames('mainMenu_buttons', {frames: [5]}),
          frameRate: 0,
          repeat: 1
      });
    }

}
