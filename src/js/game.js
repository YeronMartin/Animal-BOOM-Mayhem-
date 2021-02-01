var config = {
    type: Phaser.AUTO,
    parent: 'Animal-boom',
    width: 1024,
    height: 768,
    scene: [loadingRenderScene, loadingScene, postGame, mainMenuScene, modeScene, creditsScene, characterScene, characterScene2, stageScene,  gameSettings,
        StadiumGame, Tutorial, lobbyScene],

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
