class creditsScene extends Phaser.Scene{
    constructor (){
        super("creditsScene");
        var exitButton;
        var button_selected = null;
    }

     preload(){

    }

    create(){
        this.initAnimArrow();
        this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
        this.exitButton.play('white');

        this.add.image(0, 0, "credits_background").setDepth(0).setOrigin(0, 0);
        this.add.text(config.width/4.5, 25, '¿Quiénes somos?', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1);
       
        this.add.text((config.width / 2), config.height - 400, "Miembros del equipo", {fill: '#fff', font: "Arial", font: "20px"}).setDepth(2).setWordWrapWidth(350).setOrigin(0.5, 0.5);
        
        this.add.text((config.width / 2), config.height - 350, "Grupo 5:", {fill: '#fff', font: "Arial", font: "20px"}).setDepth(2).setWordWrapWidth(350).setOrigin(0.5, 0.5);

        this.add.text((config.width / 2), config.height - 280, " Carlos del Águila Mateu\n Jesús David Rojo Martín\n María Busto Ramos\n Yerón Martín Sánchez", {fill: '#fff', font: "Arial", font: "20px"}).setDepth(2).setWordWrapWidth(350).setOrigin(0.5, 0.5);

        this.add.text((config.width / 2), config.height - 100, "!MUCHAS GRACIAS POR JUGAR!", {fill: '#fff', font: "Arial", font:  "20px"}).setDepth(2).setWordWrapWidth(350).setOrigin(0.5, 0.5);




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
