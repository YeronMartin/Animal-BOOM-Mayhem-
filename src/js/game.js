var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ mainMenu, options, credits, character, scenario,  postGame,  gameSettings,
        StadiumGame, Tutorial],

    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
      },
      
      audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
