var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
