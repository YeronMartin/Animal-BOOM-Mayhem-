class loadingScene extends Phaser.Scene {
  constructor() {
    super("loadingScene");
    var gatoFinanzas;
  };

  preload() {

    var juani = this.add.image(config.width / 6,  config.height / 1.9, 'loadingScene_juani').setDepth(4).setScale(.15);
    var pelota = this.add.image(config.width / 5.5, config.height / 1.85, 'loadingScene_pelota').setDepth(4).setScale(.2);
    this.gatoFinanzas = this.add.image(config.width / 1.15, config.height / 1.9, 'loadingScene_gatoFinanzas').setDepth(4).setScale(.15);
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8).setDepth(2);
    progressBox.fillRoundedRect(config.width / 5, config.height / 2, 620, 70, 32);
    progressBar.fillRoundedRect(config.width / 5, config.height / 2 + 5, 605 * 0, 30, 32).setDepth(3);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var advice;
    var loadingText = this.make.text({
      x: width / 2-40,
      y: height / 1.85,
      text: 'Cargando...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5).setDepth(3);

    var percentText = this.make.text({
      x: width / 1.8,
      y: height / 1.85,
      text: '(0%)',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5).setDepth(3);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 1.55,
      text: '',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5);

    assetText.setOrigin(0.5, 0.5);

    this.load.on('start', function() {
      function init (){
        advice = ['Gato Iluminado no es de fiar', 'Las patatas pueden explotar de un momento para otro',
        'Vota a Juani', 'Si, yo sé que quieres un bailecito', 'Soy La JUANIIIII', 'Si, bueno, me da igual',
      '¿Quién escribe esto?'];
    };

      init();
    });

    this.load.on('progress', function(value) {
      percentText.setText('(' + parseInt(value * 100) + '%)');
      progressBar.clear();
      progressBar.fillStyle(0xf36c14, 1);
      progressBar.fillRoundedRect(config.width / 4.9,  config.height / 2 + 5, 605 * value, 60, 32);
      pelota.setX(config.width / 5 + (605 * value));
      pelota.setRotation((605 * value));

      if(((value*100) % 20) == 0){
        var i = Phaser.Math.Between(0, advice.length -1);
        assetText.setText(advice[i]);
      }

    });

    this.loadResorces();

    //Cosas que tengo que veriguar dónde meter
    this.load.image("white_flat_background", "././resources/img/sceneBackground/white_flat_background.png");
    this.load.image("juani_carrousel", "././././resources/img/Interfaces/characterRep/carrusel/juani.png");
    this.load.image("stage_background", "././resources/img/sceneBackground/stage_background.png");
    this.load.image("rep_estadio", "././resources/img/Interfaces/stageRep/rep_estadio.png");
    this.load.image("rep_estadio_selected", "././resources/img/Interfaces/stageRep/rep_estadio_selected.png");
    this.load.image("rep_estadio_background", "././resources/img/Interfaces/stageRep/rep_estadio_background.png");
  }

  create() {
    this.gatoFinanzas.destroy();
    this.gatoFinanzas = this.add.image(config.width / 1.15, config.height / 1.9, 'loadingScene_gatoFinanzas_golpeado').setDepth(4).setScale(.15);
    //var t = this.add.image(config.width / 2,  config.height / 2, 'loadingScene_juani').setDepth(4).setScale(.15);
    //t.destroy();
    this.time.addEvent({
      delay: 1000,
      callback: this.toMainMenuScene,
      callbackScope: this
    });
  }

  toMainMenuScene() {
    this.scene.start('mainMenuScene');
  }

  loadResorces (){

    //mainMenuScene
    this.load.image("mainMenu_background", "././resources/img/sceneBackground/mainMenu_background.png");
    this.load.spritesheet('mainMenu_buttons', '././././resources/img/Interfaces/buttons/mainMenu_buttons.png', { frameWidth: 913, frameHeight: 226 } );
    this.load.audio('menuSelectSfx', ['././resources/audio/sonido/co_cartoon_splodge_splat_010.mp3']);
    this.load.audio('menu_bgm', ['././resources/audio/musica/Use-Your-Time-Wisely_AdobeStock_357365454_preview.m4a']);

    //creditsScene
    this.load.image("credits_background", "././resources/img/sceneBackground/credits_background.png");
    this.load.spritesheet('exitArrow', '././././resources/img/Interfaces/buttons/exitArrow.png', { frameWidth: 512, frameHeight: 512 } );

    //modeScene
    this.load.spritesheet('offLineOnLine', '././././resources/img/Interfaces/buttons/offlineOnLine.png', { frameWidth: 1075, frameHeight: 1671} );

    //characterScene
    this.load.image("character_background", "././resources/img/sceneBackground/character_background.png");
    this.load.image("rep_Juani", "././resources/img/Interfaces/characterRep/rep_Juani.png");
    this.load.image("rep_Juani_selected", "././resources/img/Interfaces/characterRep/rep_Juani_selected.png");
    this.load.image("rep_Juani_cursed", "././resources/img/Interfaces/characterRep/rep_Juani_cursed.png");
    this.load.image("juani_dialogue", "././resources/img/Interfaces/characterRep/juani_dialogue.png");
    this.load.image("juani_cursed_dialogue", "././resources/img/Interfaces/characterRep/juani_cursed_dialogue.png");

    this.load.image("rep_Juani_cursed_selected", "././resources/img/Interfaces/characterRep/rep_Juani_cursed_selected.png");
    this.load.image("character_description_area", "././resources/img/interfaces/areas/character_description_area.png");

    this.load.image("controls1", "././resources/img/interfaces/areas/Keyboard.png");
    this.load.image("controls2", "././resources/img/interfaces/areas/Keyboard2.png");

    this.load.image("juani_carrousel", "././resources/img/Interfaces/characterRep/carrusel/juani_carrousel.png");
    this.load.image("juani_Cursed_carrousel", "././resources/img/Interfaces/characterRep/carrusel/juani_Cursed_carrousel.png");
    this.load.image("gato_Finanzas_carrousel", "././resources/img/Interfaces/characterRep/carrusel/gato_Finanzas_carrousel.png");

    //stageScene
    this.load.image("stage_background", "././resources/img/sceneBackground/stage_background.png");
    this.load.image("rep_estadio", "././resources/img/Interfaces/stageRep/rep_estadio.png");
    this.load.image("rep_estadio_selected", "././resources/img/Interfaces/stageRep/rep_estadio_selected.png");
    this.load.image("rep_estadio_background", "././resources/img/Interfaces/stageRep/rep_estadio_background.png");

    //postGame
    this.load.image("character_background", "././resources/img/sceneBackground/character_background.png");
    this.load.image("character_description_area", "././resources/img/interfaces/areas/character_description_area.png");
    this.load.image("juani_winner", "././resources/img/Interfaces/characterRep/juani_winner.png");
    this.load.image("juani_cursed_winner", "././resources/img/Interfaces/characterRep/juani_cursed_winner.png");
    this.load.spritesheet('postGame_buttons', '././././resources/img/Interfaces/buttons/postGame_buttons.png', { frameWidth: 913, frameHeight: 226} );


  }

}
