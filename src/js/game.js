var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'Animal-boom',
    scene: [TextboxTests, VolcanoGame, loadingRenderScene, loadingScene, mainMenuScene, options, creditsScene, characterScene, stageScene,  postGame,  gameSettings,
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