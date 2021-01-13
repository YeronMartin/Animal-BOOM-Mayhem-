class loadingRenderScene extends Phaser.Scene{
    constructor (){
        super("loadingRenderScene");
        var background;
        var length;
        var bool;

    };
    preload(){
      this.load.image("juani_loadingScene", "././././resources/img/Interfaces/characterRep/carrusel/juani.png");
      this.load.image('loadingScene_juani', '././././resources/img/sceneBackground/loadingScene/loadingScene_Juani.png');
      this.load.image('loadingScene_pelota', '././././resources/img/sceneBackground/loadingScene/loadingScene_pelota.png');
      this.load.image('loadingScene_gatoFinanzas_golpeado', '././././resources/img/sceneBackground/loadingScene/loadingScene_gatoFinanzas_golpeado.png');
      this.load.image('loadingScene_gatoFinanzas', '././././resources/img/sceneBackground/loadingScene/loadingScene_gatoFinanzas.png');
    };


    create(){
      this.scene.launch('loadingScene');
    };

    update(){

    };





  }
