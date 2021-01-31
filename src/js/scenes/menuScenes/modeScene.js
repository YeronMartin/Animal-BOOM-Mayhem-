class modeScene extends Phaser.Scene{
    constructor (){
        super("modeScene");
        var exitButton;
        var offlineButton;
        var onlineButton;
        var lastSelectedButton;
        var selectedButton;
        var player;
    }

    init(data){
      this.player = new serverPlayer();
      this.player.name = data.player;

      console.log("Leido: " + data.player);
    }

     preload(){
    }

    create(){
        this.add.image(0, 0, "character_background").setOrigin(0, 0).setDepth(0).setScale(1.3)
        this.add.text(500, 50, 'Elige el modo de juego',{
          fill: '#fff',
          font: "Arial",
          font: "40px"}).setDepth(1).setOrigin(0.5, 0.5);

          this.selectedButton = 1;
          this.lastSelectedButton = 1;

          this.initAnimArrow();
          this.initAnimOnlineOffLineButtons();

          this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
          this.exitButton.play('white');

          this.offlineButton = this.add.sprite(config.width/3, config.height/1.8).setDepth(1).setScale(.2);
          this.onlineButton = this.add.sprite(config.width/1.5, config.height/1.8).setDepth(1).setScale(.2);
          this.offlineButton.play('offlineSelected');
          this.onlineButton.play('online');


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

    toSelectButton() {
      if (Phaser.Input.Keyboard.JustDown(this.key_A)) { //Si se pulsa la felcha izquierda
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 2;
          this.renderButtons();
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 0) {
            this.selectedButton = 3;
          }
          this.selectedButton--;
          this.renderButtons();
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.key_D)) {
        if (this.selectedButton == null) { //Si previamente no se ha seleccionado ningún elemento
          //Selecciona la flecha de salida
          this.selectedButton = 0;
          this.renderButtons();
        } else {
          //Si la felcha se ha seleccionado
          if (this.selectedButton == 2) {
            this.selectedButton = -1;
          }
          this.selectedButton++;
          this.renderButtons();
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.key_SCAPE)) {
        this.scene.start("mainMenuScene");
      }
    }

    toEnterButton() {
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.selectedButton != null) {
          if (this.selectedButton == 1) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.scene.start("characterScene", {player : this.player});

          } else if (this.selectedButton == 0) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.scene.start("mainMenuScene");

          } else if (this.selectedButton == 2) {
            this.selectedButton = null;
            this.lastSelectedButton = null;
            this.player.character = "rep_Juani_cursed";
            this.scene.start("characterScene", {player : this.player});
          }
        }
      }
    };

    renderButtons() {
      switch (this.selectedButton) {
        case 0:
          this.exitButton.play('selected');
          break;
        case 1:
          this.offlineButton.play('offlineSelected');
          break;
        case 2:
          this.onlineButton.play('onlineSelected');
          break;
        default:
          break;
      }
      switch (this.lastSelectedButton) {
        case 0:
        this.exitButton.play('white');
          break;
        case 1:
          this.offlineButton.play('offline');
          break;
        case 2:
          this.onlineButton.play('online');
          break;
        default:
          break;
      }

      this.lastSelectedButton = this.selectedButton;

    }

    initAnimArrow() {
      this.anims.create({
        key: 'black',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [0]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'white',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [1]
        }),
        frameRate: 0,
        repeat: 1
      });

      this.anims.create({
        key: 'selected',
        frames: this.anims.generateFrameNames('exitArrow', {
          frames: [2]
        }),
        frameRate: 0,
        repeat: 1
      });
    };

    initAnimOnlineOffLineButtons(){
      this.anims.create({
        key: 'online',
        frames: this.anims.generateFrameNames('offLineOnLine', {
          frames: [2]
        }),
        frameRate: 0,
        repeat: 1
      });
      this.anims.create({
        key: 'onlineSelected',
        frames: this.anims.generateFrameNames('offLineOnLine', {
          frames: [3]
        }),
        frameRate: 0,
        repeat: 1
      });
      this.anims.create({
        key: 'offline',
        frames: this.anims.generateFrameNames('offLineOnLine', {
          frames: [0]
        }),
        frameRate: 0,
        repeat: 1
      });
      this.anims.create({
        key: 'offlineSelected',
        frames: this.anims.generateFrameNames('offLineOnLine', {
          frames: [1]
        }),
        frameRate: 0,
        repeat: 1
      });
    }

}
