var config = {
    type: Phaser.AUTO,
    parent: 'Animal-boom',
    width: 1024,
    height: 768,
    scene: [ loadingRenderScene, loadingScene, mainMenuScene, options, creditsScene, characterScene, stageScene, lobbyScene,  postGame,  gameSettings,
        StadiumGame, Tutorial],

    physics: {
        default: "arcade",
        arcade:{
            debug: true
        }
      },

      dom: {
        createContainer: true
    },
      audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
