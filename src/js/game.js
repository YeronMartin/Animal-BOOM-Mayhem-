var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: [gameSettings, mainMenu, options, credits, character, scenario, playGame, postGame]
};

var game = new Phaser.Game(config);
