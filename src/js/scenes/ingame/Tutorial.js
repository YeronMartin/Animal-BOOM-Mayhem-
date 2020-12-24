class Tutorial extends IngameScene {
    constructor(){
        super("tutorial");
    }

    //====================================================================================================
    // Precarga de cosas
    //====================================================================================================

    /*
    PROHIBIDAS LAS BOLAS:
    - FLAMING BALL
    - BLACK_HOLE_BALL

    PARA HACERLO MÁS SIMPLE COÑO
    */


    init(music){
        this.charactersToLoad = ['juani', 'juani_cursed'];
        this.music = music.bgm;


        this.ballsToLoad = ['basketball', 'bomb', 'potato', 'potato_red'];
    }

    loadSfx(){
        this.load.audio('soniquete', [
            '././././resources/audio/sonido/476178__unadamlar__correct-choice.wav'
        ]);
      
        this.load.audio('throwsfx', ['././././resources/audio/sonido/346373__denao270__throwing-whip-effect.wav']);
        this.load.audio('hit', ['././././resources/audio/sonido/hit.ogg']);

        this.load.audio('explosionSfx', ['././././resources/audio/sonido/explosion01.wav']);
    }

    //====================================================================================================
    // Setup de cosas
    //====================================================================================================

    create(){
        this.createBackground();
        this.setupMatchValues();

        this.physics.world.setBoundsCollision();
        
        this.setupLifeBarsAnims();
        this.setupPlayers();
        this.setupBalls();
        this.setupExplosionGroup();
        this.setupBlackHoleAreasList();

        this.setupCollisions();

        this.setupBallAnimations();
        this.setupParticleAnimations()

        this.setupInputControls();

        this.setupSFX();

        this.tutorialPhase = 0;

        this.setupTutorialTexts();
    }

    setupBalls(){
        this.ballsList = [];
        this.ballsGroup = this.add.group();

        this.ballPlacer = new BallPlacer(this, this.ballsToLoad);
        
        this.ballsList[0] = new BallBasket(this, 30, 100);
        this.maxBallsInScene = 1;
    }

    setupSFX(){
        this.correct = this.sound.add('soniquete');
        this.throwSfx = this.sound.add('throwsfx');
        this.hitSfx = this.sound.add('hit');
        this.hitSfx.setVolume(0.2);

        this.explosionSfx = this.sound.add('explosionSfx');
        this.explosionSfx.setVolume(0.5);
    }

    setupTutorialTexts(){
        this.textBackground = this.add.image(0, 0, 'fondo_texto');
        this.textBackground.setOrigin(0, 0);
        this.textBackground.scaleX = 2.5;
        this.textBackground.scaleY = 0.5;
        this.textBackground.setDepth(4);

        this.messageBox = this.add.text(25, 20, "Bienvenido al tutorial de Animal BOOM Mayhem. Utiliza WASD para moverte. Acércate a esa bola.");
        this.messageBox.setWordWrapWidth(745);
        this.messageBox.setDepth(5);
    }

    setupPlayers(){
        this.playersGroup = this.add.group();
        this.playersList = [];

        this.playersList[0] = new Player(this, (config.width / 2) - 100, config.height / 2, 'juani', 0, 1);
    }

    colisionPlayerExplosion(player, explosion){
        player.takeDamage();

        if(player == this.playersList[0]){
            player.health++;
            player.animator.lifebar.anims.play('lifebar_'+player.team+'_'+player.health);
        }
    }

    colisionPlayerBall(player, ball){
        ball.impact();
        player.takeDamage();

        if(player == this.playersList[0]){
            player.health++;
            player.animator.lifebar.anims.play('lifebar_'+player.team+'_'+player.health);
        }

        if(this.tutorialPhase == 7 && this.playersList[1] != null){
            this.placeBallOnDummy();
            var timedEvent = this.time.addEvent({ delay: 2000, callback:  this.waitingTimeEnded, callbackScope: this, loop: false });
        }
    }

    playerEliminated(){

    }

    update(time, delta){
        this.updatePlayers(delta);
        this.updateBalls(delta);

        this.updateBlackHoleAreas(delta);

        this.updateTutorialState();
    }

    updateTutorialState(){
        switch(this.tutorialPhase){
            case 0: //Moverse hacia la pelota
                if(this.hasThePlayerReachedTheBall()){
                    //Avanzar texto y fase
                    this.correct.play();
                    this.messageBox.setText("Muy bien, ahora pulsa R para recoger la bola del suelo.");
                    this.tutorialPhase++;
                }
                break;
            case 1: //Recoger la pelota
                if(this.ballsList[0].heldByPlayer){
                    this.correct.play();
                    this.messageBox.setText("Lanza la bola manteniendo pulsado R y apunta con WASD. Ten cuidado porque la bola rebotará por las paredes. ");
                    this.tutorialPhase++;
                }
                break;
            case 2: //Lanzar la pelota
                if(!this.ballsList[0].heldByPlayer){
                    this.tutorialPhase++;
                }
                break;
            case 3: //La bola ha dejado de moverse
                if(this.ballsList[0].onGround){
                    this.correct.play();
                    this.tutorialPhase++;
                    this.messageBox.setText("Ahora que ya sabes recoger y lanzar bolas, es el momento de practicar con un adversario. Elimina a ese dummy, bastará con golpearlo 3 veces.");
                    this.playersList[1] = new Dummy(this, config.width / 2, config.height / 2);
                    this.ballPlacer.createNewBallsByAmount(4);
                }
                break;
            case 4: //Muñeco destruido
                if(this.playersList[1] == null){
                    this.correct.play();

                    this.messageBox.setText("¡Muy bien! Ahora la última lección. Puedes evadir balonazos agachándote manteniendo la tecla T. Ten cuidado porque solo serás invulnerable por unos instantes. \nPulsa ENTER cuando estés preparado.");
                    this.tutorialPhase++;

                    //En caso de que el jugador tenga una pelota, se la quitamos
                    if(this.playersList[0].ball){
                        this.playersList[0].ball.setBallOnGround();
                        this.playersList[0].ball = null;
                    }

                    this.maxBallsInScene = 1;

                    //Eliminamos todos los boloncios menos el primero
                    for (var i = this.ballsList.length - 1; i > 0; i--) {
                        this.ballsList[i].destroyFromScene();
                    }

                    //Colocamos al jugador casi en el centro

                    this.playersList[0].x = (config.width / 2) - 100;
                    this.playersList[0].y = config.height / 2;
                    this.playersList[0].body.immovable = true;
                    //this.playersList[0].play('idle'+this.playersList[0].id);
                    //this.playersList[0].updateLifebarPosition();

                    this.playersList[0].inputProfile.disableMovementInputs();

                    this.playersList[0].releaseKeys();
                    this.playersList[0].setBodyVelocityToCero();

                    //Colocamos un dummy en el borde derecho del mapa y le damos una pelota
                    this.playersList[1] = new Dummy(this, config.width - 100, config.height / 2);
                    this.playersList[1].flipX = true;
                    this.placeBallOnDummy();

                    this.input.keyboard.on('keydown_ENTER', this.enterPressed, this);
                }
                break;
            case 6: //Ha finalizado el tiempo de espera hasta que el dummy lance la bola
                this.messageBox.setText("¡Esquiva las bolas con T!");
                var timedEvent = this.time.addEvent({ delay: 2000, callback:  this.waitingTimeEnded, callbackScope: this, loop: false });
                this.tutorialPhase++;
                break;
            case 7:
                if(this.playersList[1] == null){
                    this.correct.play();
                    this.messageBox.setText("¡Eso es! Ya estás preparado para competir en Animal BOOM Mayhem. Pulsa ESCAPE para salir al menú");
                    this.playersList[0].body.immovable = false;
                    this.tutorialPhase++;
                }
                break;
        }
    }

    placeBallOnDummy(){
        this.playersList[1].ball = this.ballsList[0];
        this.playersList[1].ball.heldByPlayer = true;
        this.playersList[1].ball.visible = false;
        this.playersList[1].animator.ballObtained(this.ballsList[0]);

        this.playersList[1].enterAimMode();
    }

    enterPressed(){
        this.tutorialPhase++;
        this.input.keyboard.off('keydown_ENTER');
    }

    waitingTimeEnded(){
        this.playersList[1].throwBall();
    }

    hasThePlayerReachedTheBall(){
        return (Math.sqrt(Math.pow(this.playersList[0].x - this.ballsList[0].x, 2)
        + Math.pow(this.playersList[0].y - this.ballsList[0].y, 2)) < 100);
    }
}
