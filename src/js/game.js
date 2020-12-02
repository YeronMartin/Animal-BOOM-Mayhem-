var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    
    scene: [mainMenu, options, credits, character, gameSettings, scenario, playGame, postGame]
};

var game = new Phaser.Game(config);
