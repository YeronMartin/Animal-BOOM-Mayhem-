class loadingRenderScene extends Phaser.Scene{
    constructor (){
        super("loadingRenderScene");

    };
    preload(){
      this.load.image("juani_loadingScene", "././././resources/img/Interfaces/characterRep/carrusel/juani.png");
    };


    create(){
      this.scene.start('loadingScene');
    };

    update(){

    };
  }
