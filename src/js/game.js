var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scene: [loadingRenderScene, loadingScene, mainMenuScene, options, creditsScene, characterScene, stageScene,  postGame,  gameSettings,
        StadiumGame, Tutorial],

    physics: {
        default: "arcade",
        arcade:{
            debug: true
        }
      },

      audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
