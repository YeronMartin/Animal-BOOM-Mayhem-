class Player extends Phaser.GameObjects.Sprite{
    id;

    speed = 400;
    aiming = false;
    pickUpRadius = 80;

    pressingUp = false;
    pressingDown = false;
    pressingLeft = false;
    pressingRight = false;

    dirX = 0;
    dirY = 0;

    ball;

    stunned = false;
    crouching = false;

    health = 3;

    throwAnimationDelay = 200;
    hurtAnimationDelay = 500;
    timeBetweenFlickeringCycles = 25;
    hurtInvulnerabilityDuration = 1000;
    crouchInvulnerabilityDuration = 500;

    flickeringEnded = true;

    facingRight = true;

    constructor(scene, x, y, character, inputProfile, team) {
        super(scene, x, y, character);

        this.setDepth(2);
        this.setScale(0.4);

        this.team = team;

        this.inputProfile = new InputProfiler(scene, this, inputProfile);
        this.animator = new PlayerAnimator(scene, this, character);

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        this.animator.playIdle();
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);

        scene.playersGroup.add(this);
    }
    
    update(delta){
        this.updatePosition(delta);
        this.updateBallPosition();

        this.animator.update(delta);
    }

    updatePosition(delta){
        if (this.aiming || this.stunned || this.crouching)
            return;

        var newVelocityX = 0;
        var newVelocityY = 0;

        if (this.pressingUp)
            newVelocityY -= this.speed;

        if (this.pressingDown)
            newVelocityY += this.speed;

        if (this.pressingLeft)
            newVelocityX -= this.speed;

        if (this.pressingRight)
            newVelocityX += this.speed;

        this.body.velocity.x = newVelocityX;
        this.body.velocity.y = newVelocityY;
    }

    updateBallPosition(){
        //En caso de llevar una bola encima
        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }
    }

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    //====================================================================================================
    // Recoger Objeto
    //====================================================================================================
    
    pickBombs() {
        var b = this.getClosestBallInRange();

        if (b != null) {
            this.ball = b;
            this.ball.heldByPlayer = this;

            this.animator.ballObtained(this.ball);

            this.setBodyVelocityToCero();

            this.animator.playCrouch();

            this.stunned = true;
            this.ball.visible = false;

            var pickUpDelayTimer = this.scene.time.addEvent({ delay: 150, callback: this.pickupDelayEnded, callbackScope: this, loop: false });
        }
    }
    
    getClosestBallInRange() {
        for (var i = this.scene.ballsList.length - 1; i >= 0; i--) {
            if (this.scene.ballsList[i].onGround && !this.scene.ballsList[i].heldByPlayer) {
                var ball = this.scene.ballsList[i];

                if (this.isPointInsideArea(ball.x, ball.y, this.x, this.y, this.pickUpRadius)) {
                    return ball;
                }
            }
        }

        return null;
    }

    isPointInsideArea(pX, pY, posX, posY, radius) {
        return this.getDistanceBetweenPoints(pX, pY, posX, posY) < radius;
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    pickupDelayEnded(){
        this.stunned = false;
    }

    //====================================================================================================
    // Apuntado y lanzamiento
    //====================================================================================================

    enterAimMode(){
        this.aiming = true;
        this.setBodyVelocityToCero();
    }

    throwBall(){
        //En caso de no estar apuntando a ninguna parte, que salga al menos con una dirección
        if(this.dirX == 0 && this.dirY == 0){
            if(this.flipX)
                this.ball.launch(-1, 0);
            else
                this.ball.launch(1, 0);
        }else{
            this.normaliceThrowDirection();
            this.ball.launch(this.dirX, this.dirY);
        }

        this.ball.visible = true;
        this.ball = null;


        this.animator.ballLaunched();
        this.animator.playThrow();

        this.stunned = true;
        this.aiming = false;

        var throwAnimTimer = this.scene.time.addEvent({ delay: this.throwAnimationDelay, callback: this.throwAnimationFinished, callbackScope: this, loop: false });
    }

    normaliceThrowDirection(){
        if(this.dirX != 0 && this.dirY != 0){
            this.dirX /= 1.5;
            this.dirY /= 1.5;
        }
    }

    throwAnimationFinished(){
        this.stunned = false;
    }

    //====================================================================================================
    // Agacharse
    //====================================================================================================

    enterCrouchMode(){
        if(this.crouching)
            return;

        this.crouching = true;
        this.animator.playCrouch();
        this.setBodyVelocityToCero();
        this.startInvulnerableFrames(this.crouchInvulnerabilityDuration);
    }

    exitCrouchMode(){
        this.crouching = false;
        this.animator.playIdle();
        this.addToGroupIfIsNotAddedYet();
        this.flickeringEnded = true;
    }

    //====================================================================================================
    // Recibir daño
    //====================================================================================================

    takeDamage(){
        this.health --;

        if(this.health > 0){
            this.enterHurtState();
            this.animator.lifebar.anims.play('lifebar_'+this.team+'_'+this.health);
        }else{
            //Muertini
            this.animator.playHurt();
            this.animator.lifebar.destroy();
            this.inputProfile.disableAllInputs();
            this.removeFromSceneLists();
            this.scene.playerEliminated(this.team);
        }
    }

    removeFromSceneLists(){
        this.scene.playersList.splice(this.scene.playersList.lastIndexOf(this), 1);
        this.scene.playersGroup.remove(this);
    }

    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.removeFromSceneLists();
        this.scene.playerEliminated(this.id);

        //Destruir objeto de la escena
        this.destroy();
    }

    enterHurtState(){
        this.animator.playHurt();
        var hurtAnimTimer = this.scene.time.addEvent({ delay: this.hurtAnimationDelay, callback: this.endHurtAnimation, callbackScope: this, loop: false });
        this.stunned = true;

        this.startInvulnerableFrames(this.hurtInvulnerabilityDuration);
    }

    endHurtAnimation(){
        this.stunned = false;
    }

    //====================================================================================================
    // Periodo de invulnerabilidad
    //====================================================================================================

    startInvulnerableFrames(duration){
        this.scene.playersGroup.remove(this);

        this.flickeringEnded = false;
        var flickeringCicleTimer = this.scene.time.addEvent({ delay: this.timeBetweenFlickeringCycles, callback: this.flickeringCicle, callbackScope: this, loop: false });
        var flickeringEndTimer = this.scene.time.addEvent({ delay: duration, callback: this.endFlickeringCicle, callbackScope: this, loop: false });
    }

    flickeringCicle(){
        this.visible = !this.visible;

        if(!this.flickeringEnded){
            var timedEvent = this.scene.time.addEvent({ delay: this.timeBetweenFlickeringCycles, callback: this.flickeringCicle, callbackScope: this, loop: false });
        }else{
            this.visible = true;
            this.addToGroupIfIsNotAddedYet();
        }  
    }

    endFlickeringCicle(){
        this.flickeringEnded = true;
    }

    endCrouchInvulnerability(){
        this.addToGroupIfIsNotAddedYet();
    }

    addToGroupIfIsNotAddedYet(){
        if(!this.scene.playersGroup.contains(this)){
            this.scene.playersGroup.add(this);
        }
    }

    //====================================================================================================
    // Otros
    //====================================================================================================
    
    releaseKeys(){
        this.pressingUp = false;
        this.pressingDown = false;
        this.pressingLeft = false;
        this.pressingRight = false;
    }

    enterSuddenDeathMode(){
        this.health = 1;
        this.animator.lifebar.play('lifebar_'+this.team+'_'+this.health);
    }
}