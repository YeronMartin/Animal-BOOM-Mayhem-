class characterScene extends Phaser.Scene {
  constructor() {
    super("characterScene");
    var exitButton;
    var juaniButton;
    var juaniCursedButton;
    var lastSelectedButton;
    var selectedButton;
    var descriptionText;
    var descriptionArea;
    var carrusel;
    var isSelected;
    var mode;
    var firstPlayer;
    var secondPlayer;
  }

  init(data) {
    this.player = new serverPlayer();
    this.player.name = data.name;
    this.mode = data.mode;
  }

  preload() {
  }

  create() {
    this.add.image(0, 0, "character_background").setOrigin(0, 0).setDepth(0).setScale(1.3);
    this.textoTitulo = this.add.text(config.width / 2, config.height / 11, 'Personajes', {
      fill: '#fff',
      font: "Arial",
      font: "40px"
    }).setDepth(1);
    this.textoTitulo.setOrigin(0.5, 0.5);

    this.initAnimArrow();
    this.exitButton = this.add.sprite(config.width / 20, config.height / 11).setScale(.1).setDepth(1);
    this.exitButton.play('white');

    //CARROUSEL
    this.carrusel = new Carrousel(this, 2 * config.height / 3, 1.2 * config.height / 3, (1.5 * config.width / 5),
      (3.5 * config.width / 5), 3);
    this.isSelected = true;

    this.keys1 = this.add.image(0, 500, 'controls1');
    this.keys1.setOrigin(0, 0);
    this.keys1.setDepth(1);
    this.keys1.setScale(0.3);

    if (this.mode == 'local') {
      this.keys2 = this.add.image(config.width, 500, 'controls2');
      this.keys2.setOrigin(1, 0);
      this.keys2.setDepth(1);
      this.keys2.setScale(0.3);
      this.textoTitulo.setText('Jugador 1 elige personaje');
    }

    //Inicalizacion de varibales de seleccion
    this.selectedButton = null;
    this.lastSelectedButton = null;

    //Flechas
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    //Enter y espacio
    this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Scape
    this.key_SCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


    this.menuSelectSfx = this.sound.add('menuSelectSfx');
    this.menuSelectSfx.setVolume(0.2);

    //Informacion de los jugadores
    this.firstPlayer = new serverPlayer();
    this.secondPlayer = new serverPlayer();
  }

  update() {

    //this.toSelectButton();
    //this.toEnterButton();
    if (Phaser.Input.Keyboard.JustDown(this.key_W) && this.isSelected == true) {
      this.exitButton.play('selected');
      this.isSelected = false;
    }
    if (Phaser.Input.Keyboard.JustDown(this.key_S) && this.isSelected == false) {
      this.exitButton.play('black');
      this.isSelected = true;
    }
    if (Phaser.Input.Keyboard.JustDown(this.key_A) && this.isSelected == true) {
      this.carrusel.updateLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.key_D) && this.isSelected == true) {
      this.carrusel.updateRight();
    }

    if (this.mode == 'online') {
      this.toEnterButtonON();
    } else if (this.mode == 'local') {
      this.toEnterButtonOFF();
    }


  };

  toEnterButtonON() {
    if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
      if (this.isSelected == true) {
        this.player.character = this.carrusel.getCurrent();

        var p = { name: this.player.name, character: this.player.character };

        console.log(p);

        this.scene.start('stageScene', { player: p, mode: this.mode });
      } else {
        this.scene.start('modeScene', { player: this.player.name });
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.key_SCAPE)) {
      this.scene.start("modeScene");
    }
  };

  toEnterButtonOFF() {

    if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
      if (this.isSelected == true) {
        this.firstPlayer.character = this.carrusel.getCurrent();
        this.player.character = this.carrusel.getCurrent();
        this.scene.start('characterScene2', { player: this.player, mode: this.mode, firstPlayer: this.firstPlayer });
      } else {
        this.scene.start('modeScene', { player: this.player.name });
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.key_SCAPE)) {
      this.scene.start("modeScene");
    }
  };

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

}
