class creditsScene extends Phaser.Scene{
    constructor (){
        super("creditsScene");
        var exitButton;
        var button_selected = null;
    }

     preload(){

    }

    create(){
        this.add.image(0, 0, "credits_background").setDepth(1).setOrigin(0, 0).setScale(1.3, 1.2);
        this.add.text(config.width/2, 75, '¿Quiénes somos?', {fill: '#fff', font: "arial", font: "40px"}).setDepth(1).setOrigin(0.5, 0.5);

        this.add.text((config.width/2)- 35, config.height/3.4, "Somos un grupo de amigos haciendo \nnuestro primero juego en PHASER 3", {fill: '#fff', font: "arial", font: "16px"}).setDepth(2)
        .setOrigin(0.5, 0.5);
        this.add.text((config.width/2)- 35, config.height/2, "  !!MUCHAS GRACIAS \n       POR JUGAR!!", {fill: '#fff', font: "arial", font: "25px"}).setDepth(2).setOrigin(0.5, 0.5);

        this.initAnimArrow();
        this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
        this.exitButton.play('white');
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
          this.exitButton.play('selected');
        }else {
          this.exitButton.play('selected');
          this.button_selected = null;
        }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_RIGHT)){
          if (this.button_selected == null){
            this.button_selected = this.exitButton;
            this.exitButton.play('white');
          }else {
            this.exitButton.play('white');
            this.button_selected = null;
          }
      } else if(Phaser.Input.Keyboard.JustDown(this.key_ESC)){
          this.scene.start("mainMenuScene");
      }
    }

    toEnterButton(){
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE) || Phaser.Input.Keyboard.JustDown(this.key_ESC)) {
        if (this.button_selected != null){
          this.scene.start("mainMenuScene");
        }
      }
    };

    initAnimArrow(){
      this.anims.create({
          key: 'black',
          frames: this.anims.generateFrameNames('exitArrow', {frames: [0]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'white',
          frames: this.anims.generateFrameNames('exitArrow', {frames: [1]}),
          frameRate: 0,
          repeat: 1
      });

      this.anims.create({
          key: 'selected',
          frames: this.anims.generateFrameNames('exitArrow', {frames: [2]}),
          frameRate: 0,
          repeat: 1
      });
    };
}
