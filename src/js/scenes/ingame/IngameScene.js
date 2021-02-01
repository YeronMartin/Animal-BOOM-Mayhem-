class IngameScene extends Phaser.Scene {

    //====================================================================================================
    // Precarga de cosas
    //====================================================================================================

    init(msj){
        console.log(msj);

        this.charactersToLoad = msj.characters;
        this.gameMode = msj.mode;

        console.log(this.gameMode);

        if(this.gameMode == "online"){
            console.log(msj.players);

            this.roomId = msj.room;
            this.playerId = msj.id;
            this.playersInGame = msj.players; //(id, name, personaje)
        }

        this.ballsToLoad = ['basketball', 'bomb', 'potato', 'potato_red', 'flaming_ball', 'mini_black_hole'];
    }

    preload(){
        //Cargar personajes
        this.loadCharactersSprites();
        this.loadHealthBarsSprites();
        //Cargar pelotas y animaciones
        this.loadBallSprites();

        this.loadHud();

        this.loadStageBackground();

        //Cargar sonidos y efectos
        this.loadSfx();
    }

    loadStageBackground(){
        this.load.image("background", "././././resources/img/scenarios/stadium_background.png");
    }

    loadCharactersSprites(){

        if(this.gameMode == "local"){
            for(var i = 0; i < this.charactersToLoad.length; i++){
                console.log(this.charactersToLoad[i].character);
                this.load.spritesheet(this.charactersToLoad[i].character, '././././resources/img/characters/'+this.charactersToLoad[i].character+'_sheet.png', { frameWidth: 180, frameHeight: 250 } );
            }
        }else{
            for(var i = 0; i < this.charactersToLoad.length; i++){
                console.log(this.charactersToLoad[i]);
                this.load.spritesheet(this.charactersToLoad[i], '././././resources/img/characters/'+this.charactersToLoad[i]+'_sheet.png', { frameWidth: 180, frameHeight: 250 } );
            }
        }
    }

    loadHealthBarsSprites(){
        this.load.spritesheet('lifebar_1', '././././resources/img/hud/lifebar_blue.png', { frameWidth: 230, frameHeight: 45 });
        this.load.spritesheet('lifebar_2', '././././resources/img/hud/lifebar_red.png', { frameWidth: 230, frameHeight: 45 });
    }

    loadBallSprites(){
        this.load.image("pelota", "././././resources/img/balls/Pelota.png");
        this.load.image("bomba", "././././resources/img/balls/Bomba.png");
        this.load.spritesheet("potato_sheet", "././././resources/img/balls/Patata_sheet.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('explosion_sheet', "././././resources/img/effects/explosion_sheet.png", { frameWidth: 431, frameHeight: 400 });
        this.load.spritesheet('fire_pillar', "././././resources/img/effects/fire_pillar.png", { frameWidth: 336, frameHeight: 388 });

        this.load.image("bola_flamigera", "././././resources/img/balls/Pelota_flamigera.png");
        this.load.image("mini_agujero_negro", "././././resources/img/balls/Mini_agujero_negro.png");
        this.load.spritesheet('black_hole_area_sheet', "././././resources/img/effects/black_hole_area_sheet.png", { frameWidth: 500, frameHeight: 500 });

        this.load.spritesheet('player_none', '././././resources/img/balls/player_none.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_basketball', '././././resources/img/balls/player_basketball.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_bomb', '././././resources/img/balls/player_bomb.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_potato', '././././resources/img/balls/player_potato1.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_potato_red', '././././resources/img/balls/player_potato2.png', { frameWidth: 180, frameHeight: 250 } );
    
        this.load.spritesheet('player_flaming_ball', '././././resources/img/balls/player_bola_flamigera.png', { frameWidth: 180, frameHeight: 250 } );
        this.load.spritesheet('player_mini_black_hole', '././././resources/img/balls/player_mini_agujero_negro.png', { frameWidth: 180, frameHeight: 250 } );
    }
   
    loadHud(){
        this.load.image('marcador', '././././resources/img/hud/marcador.png');
        this.load.image('fondo_texto', "././././resources/img/interfaces/areas/character_description_area.png");
    }

    loadSfx(){
        this.load.audio('hit', ['././././resources/audio/sonido/hit.ogg']);
        this.load.audio('throwsfx', ['././././resources/audio/sonido/346373__denao270__throwing-whip-effect.wav']);
        this.load.audio('explosionSfx', ['././././resources/audio/sonido/explosion01.wav']);

        this.load.audio('game_bgm', ['././resources/audio/musica/US-Sports-BGM_AdobeStock_372213012_preview.m4a']);
    }

    //====================================================================================================
    // Setup de cosas
    //====================================================================================================

    create(){
        this.createBackground();

        this.setupMatchValues();

        this.physics.world.setBoundsCollision();
        this.matchClock = new MatchClock(this, 1, 20);
        
        this.setupLifeBarsAnims();

        this.setupPlayers();
        this.setupBalls();
        this.setupExplosionGroup();
        this.setupBlackHoleAreasList();


        this.setupCollisions();

        this.setupBallAnimations();
        this.setupParticleAnimations();


        this.setupInputControls();

        this.setupSFX();

        this.matchStarted = true;
        if(this.gameMode == "online"){
            //Montar conexión con el servidor
            var playerData = this.findClientPlayer();
            this.ingameSocket = new IngameSocket(this, playerData, this.playerObject, this.roomId);
            this.ingameSocket.startConnection();
            this.matchStarted = false;
        }
    }

    findClientPlayer(){
        for(var i = 0; i < this.playersInGame.length; i++){
            var p = this.playersInGame[i];

            if(p.id == this.playerId){
                return p;
            }
        }
        return null;
    }

    setupBlackHoleAreasList(){
        this.blackHoleAreasList = [];
    }

    createBackground(){
        this.background = this.add.image(0, 0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(config.width, config.height);
    }

    setupMatchValues(){
        this.maxBallsInScene = 10;
        this.noMorechetos = false;
        this.matchEnd = false;
        this.timeEnded = false;
    }

    setupPlayers(){
        this.playersGroup = this.add.group();
        this.playersList = [];

        if(this.gameMode == "local"){
            this.playersList[0] = new Player(this, 0, (config.width / 2) - 150, config.height / 2, this.charactersToLoad[0].character, 0, 1);
            this.playersList[1] = new Player(this, 1, (config.width / 2) + 150, config.height / 2, this.charactersToLoad[1].character, 1, 2);
        }else{
            //Suponiendo que ya "sabemos qué jugadores hay" porque nos lo han mandado de la escena anterior

            var posi = 20;

            for(var i = 0; i < this.playersInGame.length; i++){
                var p = this.playersInGame[i];

                console.log(p);

                if(p.id == this.playerId){
                    this.playersList[i] = new Player(this, this.playerId, posi, 0, p.character, 0, 1);
                    this.playerObject = this.playersList[i];
                    console.log("Me he identificado, tengo la id "+p.id);
                }else{
                    this.playersList[i] = new PlayerOnline(this, p.id, posi, 0, p.character, 2);
                    console.log("Jugador online: "+p.name+" con id "+p.id);
                }
                posi+= 50;
            }
        }
    }

    setupBalls(){
        this.ballsList = [];
        this.ballsGroup = this.add.group();

        if(this.gameMode == "local"){    
            this.ballPlacer = new BallPlacer(this, this.ballsToLoad);
    
            this.ballsList[0] = new FlamingBall(this, 0, 50, 50);

            this.ballPlacer.createNewBallsByAmount(this.maxBallsInScene);
        }
    }

    setupExplosionGroup(){
        this.explosionGroup = this.add.group();
    }

    setupCollisions(){
        this.physics.add.collider(this.playersGroup, this.ballsGroup, this.colisionPlayerBall, null, this);
        this.physics.add.collider(this.playersGroup, this.explosionGroup, this.colisionPlayerExplosion, null, this);
    }

    //Cuando un boloncio choqua contra un jugador
    colisionPlayerBall(player, ball){
        player.takeDamage(ball, true);
        ball.impact();
    }

    colisionPlayerExplosion(player, explosion){
        player.takeDamage(explosion, false);
    }

    setupBallAnimations(){
        for(var i = 0; i < this.ballsToLoad.length; i++){
            this.anims.create({
                key: this.ballsToLoad[i] + '_idle',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [0]}),
                frameRate: 0,
                repeat: 1
            });
        
            this.anims.create({
                key: this.ballsToLoad[i] + '_walk',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [1, 2, 3]}),
                frameRate: 10,
                repeat: -1
            });
        
            this.anims.create({
                key: this.ballsToLoad[i] + '_throw',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [6, 7]}),
                frameRate: 20,
                repeat: 0
            });
        
            this.anims.create({
                key: this.ballsToLoad[i] + '_aim',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [6]}),
                frameRate: 10,
                repeat: 0
            });
        
            this.anims.create({
                key: this.ballsToLoad[i] + '_crouch',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [4, 5]}),
                frameRate: 300,
                repeat: 0
            });
        
            this.anims.create({
                key: this.ballsToLoad[i] + '_hurt',
                frames: this.anims.generateFrameNames('player_'+this.ballsToLoad[i], {frames: [8]}),
                frameRate: 0,
                repeat: -1
            });
        }
    }

    setupParticleAnimations(){
        //Explosión
        this.anims.create({
            key: 'explosion_anim',
            frames: this.anims.generateFrameNames('explosion_sheet', {frames: [0,1]}),
            frameRate: 10,
            repeat: -1
        });

        //Pilar fuego
        this.anims.create({
            key: 'firePillar_anim',
            frames: this.anims.generateFrameNames('fire_pillar', {frames: [0,1]}),
            frameRate: 10,
            repeat: -1
        });

        //Área del agujero negro
        this.anims.create({
            key: 'blackHoleArea_anim',
            frames: this.anims.generateFrameNames('black_hole_area_sheet', {frames: [0,1,2]}),
            frameRate: 10,
            repeat: -1
        });
    }

    setupLifeBarsAnims(){
        var lifebarColors = [1, 2];

        for(var i = 0; i < lifebarColors.length; i++){
            this.anims.create({
                key: 'lifebar_'+lifebarColors[i]+'_3',
                frames: this.anims.generateFrameNames('lifebar_'+lifebarColors[i], {frames: [0]}),
            });
    
            this.anims.create({
                key: 'lifebar_'+lifebarColors[i]+'_2',
                frames: this.anims.generateFrameNames('lifebar_'+lifebarColors[i], {frames: [1]}),
            });
    
            this.anims.create({
                key: 'lifebar_'+lifebarColors[i]+'_1',
                frames: this.anims.generateFrameNames('lifebar_'+lifebarColors[i], {frames: [2]}),
            });
        } 
    }

    setupInputControls(){
        this.input.keyboard.on('keydown_ESC', this.escapePressed, this);
        this.input.keyboard.on('keydown_ZERO', this.chetosPressed, this);

        this.noMorechetos = false;
    }

    escapePressed(){
        if(this.gameMode == "online")
            this.ingameSocket.connection.close();
        this.scene.start("mainMenuScene");
    }

    chetosPressed(){
        if(!this.noMorechetos){
            this.matchClock.minutesRemaining = 0;
            this.matchClock.secondsRemaining = 5;

            this.noMorechetos = true;
        }
    }

    setupSFX(){
        this.throwSfx = this.sound.add('throwsfx');
        this.hitSfx = this.sound.add('hit');
        this.hitSfx.setVolume(0.2);

        this.explosionSfx = this.sound.add('explosionSfx');
        this.explosionSfx.setVolume(0.5);

        this.game.sound.stopAll();
        this.gameBgm = this.sound.add('game_bgm');
        this.gameBgm.setVolume(0.5);
        this.gameBgm.play();
    }

    //====================================================================================================
    // Updates varios
    //====================================================================================================

    update(time, delta){
        if(!this.matchStarted)
            return;

        this.updatePlayers(delta);
        this.updateBalls(delta);

        this.updateBlackHoleAreas(delta);
        this.matchClock.updateClock(time, delta);
    }

    updatePlayers(delta){
        for (var i = this.playersList.length - 1; i >= 0; i--) {
            this.playersList[i].update(delta);
        }
    }

    updateBalls(delta){
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].update(delta);
        }
    }

    updateBlackHoleAreas(delta){
        for (var i = this.blackHoleAreasList.length - 1; i >= 0; i--) {
            this.blackHoleAreasList[i].update(delta);
        }
    }

    //====================================================================================================
    // Otros
    //====================================================================================================

    activateSuddenDeath(){
        for (var i = this.ballsList.length - 1; i >= 0; i--) {
            this.ballsList[i].enterSuddenDeathMode();
        }

        for (var i = this.playersList.length - 1; i >= 0; i--) {
            this.playersList[i].enterSuddenDeathMode();
        }
    }

    startGameOver(winnerObject){
        //Hay que buscar el nick del usuario que ha ganado
        var winnerData = this.playersInGame[0];

        for(var i = 0; i < this.playersInGame.length; i++){
            if(this.playersInGame[i].id == winnerObject.id){
                winnerData = this.playersInGame[i];
                break;
            }
        }

        //Pasar datos a la siguiente escena
        this.scene.start('postGame', {mode: this.gameMode, winner : winnerData});
    }

    playerEliminated(id){
        if(this.matchEnd || this.gameMode == "online"){
            return;
        }
        
        if(this.IsMatchOver){
            this.winner = this.playersList[0].team;
            this.matchEnd = true;
            var timedEvent = this.time.addEvent({ delay: 2000, callback:  this.toPostGame, callbackScope: this, loop: true });

            this.victoryText = this.add.text(config.width / 2, (config.height / 2) - 100, "TENEMOS UN GANADOR", {
                font: "50px Arial",
                fill: "white",
            });
    
            this.victoryText.setOrigin(0.5, 0.5);
            this.victoryText.setDepth(5);
    
            this.textBackground = this.add.image(config.width / 2, (config.height / 2) - 100, 'fondo_texto');
            this.textBackground.setOrigin(0.5, 0.5);
            this.textBackground.scaleX = 2.5;
            this.textBackground.scaleY = 0.5;
            this.textBackground.setDepth(4);
        }
    }



    IsMatchOver(){
        //Regla simple para ver quien ha ganado: Si de los jugadores que quedan vivos, todos tienen el mismo equipo
        var team = -1;
        for (var i = this.playersList.length - 1; i >= 0; i--) {
            this.playersList[i].team;

            if(team == -1)
                team = this.playersList[i].team;
            else if(team != this.playersList[i].team)
                return false;
        } 

        return true;
    }

    toPostGame(){
        this.scene.start('postGame', {mode: 'local', id: this.winner , character : this.charactersToLoad[this.winner - 1].character});
        //this.scene.start('postGame', {mode: "local", winner : winnerData});
    }

}