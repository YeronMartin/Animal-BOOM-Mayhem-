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
  }

  preload() {
  }

  create() {
    this.add.image(0, 0, "character_background").setOrigin(0, 0).setDepth(0);
    this.textoTitulo = this.add.text(config.width / 2, config.height / 11, 'Personajes', {
      fill: '#fff',
      font: "Arial",
      font: "40px"
    }).setDepth(1);
    this.textoTitulo.setOrigin(0.5, 0.5);

    this.initAnimArrow();
    this.exitButton = this.add.sprite(config.width/20, config.height/11).setScale(.1).setDepth(1);
    this.exitButton.play('white');

    this.descriptionArea = this.add.image(config.width / 6, config.height / 1.4, "character_description_area").setDepth(2)
      .setScale(1.6, 0.9).setOrigin(0, 0).setVisible(false);
    this.descriptionText = this.add.text(config.width / 5, config.height / 1.33, "", {
      fill: "#fff",
      font: "Arial",
      font: "18px"
    }).setDepth(3).setWordWrapWidth(450);

    this.juaniButton = new characterCard(this, (config.width / 4) + 80, config.height / 2.2, "Tras limpiar, cocinar, cuidar a sus 4302 palomas " +
      " y salir de su 'AEROBIC ULTRA INTENSIVE class' La Juani está lista " +
      "\npara participar en Aniaml BOOM Mayhem.", "rep_Juani", "rep_Juani_selected", -config.width / 50, config.height / 1.5, "juani_dialogue");

    this.juaniCursedButton = new characterCard(this, (config.width / 1.4) - 80, config.height / 2.2, "Juani Cursed fue una vez una fan acosadora de" +
      "La Juani. Ahora mismo su meta es suplantarla y ser 'La Juani Original'. \n'Todo lo que diga sobre mí es mentira'", "rep_Juani_cursed",
      "rep_Juani_cursed_selected", config.width / 1.3, config.height / 1.5, "juani_cursed_dialogue");

    this.keys1 = this.add.image(0, 200, 'controls1');
    this.keys1.setOrigin(0, 0);
    this.keys1.setDepth(1);
    this.keys1.setScale(0.3);

    this.keys2 = this.add.image(config.width, 200, 'controls2');
    this.keys2.setOrigin(1, 0);
    this.keys2.setDepth(1);
    this.keys2.setScale(0.3);

    //Inicalizacion de varibales de seleccion
    this.selectedButton = null;
    this.lastSelectedButton = null;

    //Flechas
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    //Enter y espacio
    this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Scape
    this.key_SCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


    this.menuSelectSfx = this.sound.add('menuSelectSfx');
    this.menuSelectSfx.setVolume(0.2);
  }

  update() {

    this.toSelectButton();
    this.toEnterButton();


  }

  renderButtons() {
    switch (this.selectedButton) {
      case 0:
        this.exitButton.play('selected');
        this.descriptionText.setText("");
        this.descriptionArea.setVisible(false);
        break;
      case 1:
        this.juaniButton.renderCard();
        this.descriptionText.setText(this.juaniButton.description);
        this.descriptionArea.setVisible(true);
        break;
      case 2:
        this.juaniCursedButton.renderCard();
        this.descriptionText.setText(this.juaniCursedButton.description);
        this.descriptionArea.setVisible(true);
        break;
      default:
        break;
    }
    switch (this.lastSelectedButton) {
      case 0:
      this.exitButton.play('white');
        break;
      case 1:
        this.juaniButton.renderCard();
        break;
      case 2:
        this.juaniCursedButton.renderCard();
        break;
      default:
        break;
    }

    this.lastSelectedButton = this.selectedButton;

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

          this.menuSelectSfx.play();

          this.scene.start("stageScene");
        } else if (this.selectedButton == 0) {
          this.selectedButton = null;
          this.lastSelectedButton = null;

          this.menuSelectSfx.play();

          this.scene.start("mainMenuScene");
        } else if (this.selectedButton == 2) {
          this.selectedButton = null;
          this.lastSelectedButton = null;

          this.menuSelectSfx.play();

          this.scene.start("stageScene");
        }
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
