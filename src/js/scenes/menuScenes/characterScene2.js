class characterScene2 extends Phaser.Scene {
  constructor() {
    super("characterScene2");
    var exitButton;
    var lastSelectedButton;
    var selectedButton;
    var descriptionText;
    var descriptionArea;
    var carrusel;
    var isSelected;
    var mode;
    var firstPlayer;
    var secondPlayer;
    var error_same_char;
  }

  init(data){
    this.player = data.player;
    this.mode = data.mode;
    this.firstPlayer = data.firstPlayer;


  }

  preload() {
  }

  create() {
    this.add.image(0, 0, "character_background").setOrigin(0, 0).setDepth(0).setScale(1.3);
    this.textoTitulo = this.add.text(config.width / 2, config.height / 11, 'Jugador 2 elige personaje', {
      fill: '#fff',
      font: "Arial",
      font: "40px"
    }).setDepth(1);

    this.error_same_char = this.add.text(config.width / 2, config.height / 4.5, '', {
      fill: '#f00',
      font: "Arial",
      font: "20px"
    }).setDepth(1).setOrigin(0.5, 0.5);

    this.textoTitulo.setOrigin(0.5, 0.5);

    this.initAnimArrow();
    this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
    this.exitButton.play('white');

    //CARROUSEL
    this.carrusel = new Carrousel(this, 2*config.height/3, 1.2*config.height/3, (1.5*config.width/5),
            (3.5*config.width/5), 3);
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
    this.secondPlayer = new serverPlayer();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.key_W) && this.isSelected == true){
        this.exitButton.play('selected');
        this.isSelected = false;
      }
    if (Phaser.Input.Keyboard.JustDown(this.key_S) && this.isSelected == false){
        this.exitButton.play('black');
        this.isSelected = true;
    }
    if (Phaser.Input.Keyboard.JustDown(this.key_A) && this.isSelected == true){
        this.carrusel.updateLeft();
      }else if (Phaser.Input.Keyboard.JustDown(this.key_D) && this.isSelected == true){
        this.carrusel.updateRight();
    }

    this.toEnterButton();
  }

  toEnterButton() {
      if (Phaser.Input.Keyboard.JustDown(this.key_ENTER) || Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
        if (this.isSelected == true) {
          this.secondPlayer.character = this.carrusel.getCurrent();
          if (this.firstPlayer.character == this.carrusel.getCurrent()) {
            this.error_same_char.setText('No puedes elegir el mismo personaje que el jugador 1');
          }else{
              this.scene.start('stageScene',{player : this.player, mode: this.mode, firstPlayer: this.firstPlayer, secondPlayer: this.secondPlayer});
          }
        }else{
          this.scene.start('modeScene',  {player : this.player.name});
        }
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
