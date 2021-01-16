class VolcanoGame extends IngameScene {
    constructor(){
        super("volcano");
    }

    init(msj){
        this.numberOfPlayers = msj.players;
        this.charactersToLoad = ['juani', 'juani_cursed'];
        this.gameMode = msj.mode;

        this.ballsToLoad = ['basketball', 'bomb', 'potato', 'potato_red', 'flaming_ball', 'mini_black_hole'];
    }

    loadStageBackground(){
        this.load.spritesheet('background', '././././resources/img/scenarios/volcano/lava_fondo.png', { frameWidth: 1000, frameHeight: 250 });
        this.load.image("foreground", '././././resources/img/scenarios/volcano/volcano_platform.png');
    }

    loadObstacles(){
        this.load.spritesheet('lava_pool_sheet', '././././resources/img/effects/lava_pool_sheet.png', { frameWidth: 160, frameHeight: 160 });
    }

    //====================================================================================================
    // Setup de cosas
    //====================================================================================================

    createBackground(){
        this.background = this.add.sprite(0, 0, "background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(config.width, config.height);

        this.anims.create({
            key: 'background_anim',
            frames: this.anims.generateFrameNames('background', {frames: [0, 1]}),
            frameRate: 5,
            repeat: -1
        });

        this.background.anims.play('background_anim');

        this.foreground = this.add.image(config.width / 2, config.height / 2, "foreground");
        //this.foreground.setOrigin(0,0);
        this.foreground.setDisplaySize(900, 700);
    }

    setupObstaclesGroup(){
        this.lavaPoolList = [];
        this.lavaPoolGroup = this.add.group();

        this.lavaPoolList[this.lavaPoolList.length] = new LavaPool(this, 100, 100);
    }

    setupCollisions(){
        this.physics.add.collider(this.playersGroup, this.ballsGroup, this.colisionPlayerBall, null, this);
        this.physics.add.collider(this.playersGroup, this.explosionGroup, this.colisionPlayerExplosion, null, this);
        
        this.physics.add.collider(this.playersGroup, this.lavaPoolGroup, this.colisionPlayerLavaPool, null, this);
    }

    colisionPlayerLavaPool(player, lavaPool){
        player.takeDamage();
    }

    setupObstacleAnimations(){
        this.anims.create({
            key: 'lava_pool_warning',
            frames: this.anims.generateFrameNames('lava_pool_sheet', {frames: [0]}),
            frameRate: 10,
            repeat: -1
        });

        //Pilar fuego
        this.anims.create({
            key: 'lava_pool_anim',
            frames: this.anims.generateFrameNames('lava_pool_sheet', {frames: [1, 2]}),
            frameRate: 10,
            repeat: -1
        });
    }

    //====================================================================================================
    // Update de cosas
    //====================================================================================================
    
    updateStage(delta){
        
        this.updateLavaPools(delta);
    }

    updateLavaPools(delta){
        


        for (var i = this.lavaPoolList.length - 1; i >= 0; i--) {
            this.lavaPoolList[i].update(delta);
        }
    }
}