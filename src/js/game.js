var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [mainMenu, options, credits, characterSelection, scenario, playGame, postGame, gameSettings, 
        StadiumGame, Tutorial],

    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
      }
};

var game = new Phaser.Game(config);
