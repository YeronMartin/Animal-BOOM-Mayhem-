class Player extends Phaser.GameObjects.Sprite{

    speed = 500;
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
    hurtAnimationDelay = 200;
    timeBetweenFlickeringCycles = 25;
    hurtInvulnerabilityDuration = 1000;
    crouchInvulnerabilityDuration = 500;

    flickeringEnded = false;

    constructor(scene, x, y, id) {
        super(scene, x, y, "cerdete_sheet");

        this.setDepth(1);

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        //Añadir elemento a una lista en la escena
        scene.playersGroup.add(this);

        this.setupAnimations(scene);

        this.play('idle');

        this.setupInputEvents(scene, id);
    }

    setupAnimations(scene){
        this.anim1 = this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [0]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim1 = this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [1]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim2 = this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [2]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim3 = this.scene.anims.create({
            key: 'crouch',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [3]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim4 = this.scene.anims.create({
            key: 'hurt',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [4]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim5 = this.scene.anims.create({
            key: 'aim_left',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [5]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim6 = this.scene.anims.create({
            key: 'throw_left',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [5, 4, 1]}),
            frameRate: 10,
            repeat: 0
        });

        this.anim7 = this.scene.anims.create({
            key: 'aim_right',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [6]}),
            frameRate: 10,
            repeat: -1
        });

        this.anim8 = this.scene.anims.create({
            key: 'throw_right',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [6, 4, 1]}),
            frameRate: 10,
            repeat: 0
        });
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);
    }

    setupInputEvents(scene, id){
        switch(id){
            case 0:
                this.keyUp = 'W';
                this.keyLeft = 'A';
                this.keyDown = 'S';
                this.keyRight = 'D';
                this.keyThrow = 'R';
                this.keyCrouch = 'T';
                break;
            case 1:
                this.keyUp = 'U';
                this.keyLeft = 'H';
                this.keyDown = 'J';
                this.keyRight = 'K';
                this.keyThrow = 'O';
                this.keyCrouch = 'P';
                break;
        }

        scene.input.keyboard.on('keydown_'+this.keyUp, this.inputUp, this);
        scene.input.keyboard.on('keyup_'+this.keyUp, this.releaseUp, this);

        scene.input.keyboard.on('keydown_'+this.keyLeft, this.inputLeft, this);
        scene.input.keyboard.on('keyup_'+this.keyLeft, this.releaseLeft, this);

        scene.input.keyboard.on('keydown_'+this.keyDown, this.inputDown, this);
        scene.input.keyboard.on('keyup_'+this.keyDown, this.releaseDown, this);

        scene.input.keyboard.on('keydown_'+this.keyRight, this.inputRight, this);
        scene.input.keyboard.on('keyup_'+this.keyRight, this.releaseRight, this);

        scene.input.keyboard.on('keydown_'+this.keyThrow, this.inputGrabOrThrow, this);
        scene.input.keyboard.on('keyup_'+this.keyThrow, this.releaseGrabOrThrow, this);

        scene.input.keyboard.on('keydown_'+this.keyCrouch, this.inputCrouch, this);
        scene.input.keyboard.on('keyup_'+this.keyCrouch, this.releaseCrouch, this);
    }
    
    update(){
        this.updatePosition();
        this.updateBallPosition();
        this.updateAnimations();
    }

    updatePosition(){

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

    updateAnimations(){

        //CAMBIAR A TENER EN CUENTA LA DIRECCIÓN Y LA BOLA EN MANO
        if(this.aiming){
            if(this.dirX < 0)
                this.play('aim_left');
            else{
                this.play('aim_right');
            }
        }

        if(this.aiming || this.stunned || this.crouching)
            return;

        if(this.body.velocity.x > 0){
            this.play('walk_right');
        }else if(this.body.velocity.x < 0){
            this.play('walk_left');
        }else if(this.body.velocity.y != 0){
            this.play('walk_right');
        }else if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
            this.play('idle');
        }
    }

    //Metodiños para gestionar las entradas y salidas de movimiento
    inputUp(){
        this.pressingUp = true;
        this.dirY = -1;
    }

    releaseUp(){
        this.pressingUp = false;
        this.dirY = 0;
    }

    inputDown(){
        this.pressingDown = true;
        this.dirY = 1;
    }

    releaseDown(){
        this.pressingDown = false;
        this.dirY = 0;
    }

    inputLeft(){
        this.pressingLeft = true;
        this.dirX = -1;
    }

    releaseLeft(){
        this.pressingLeft = false;
        this.dirX = 0;
    }

    inputRight(){
       this.pressingRight = true;
       this.dirX = 1;
    }

    releaseRight(){
        this.pressingRight = false;
        this.dirX = 0;
    }

     //Metodiños para gestionar la recogida o lanzamiento de bolindres

    inputGrabOrThrow(){

        if(this.ball == null){
            this.pickBombs();
        }else{
            this.aiming = true;
            this.setBodyVelocityToCero();
        }
    }

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    pickBombs() {
        var b = this.getClosestBallInRange();

        if (b != null) {
            this.ball = b;
            this.ball.heldByPlayer = true;
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

    releaseGrabOrThrow() {
        if(!this.aiming || this.ball == null)
            return;
        
        //En caso de no estar apuntando a ninguna parte, que salga al menos con una dirección
        if(this.dirX == 0 && this.dirY == 0){
            this.ball.launch(1, 0);
        }else{
            this.normaliceThrowDirection();
            this.ball.launch(this.dirX, this.dirY);

            this.playThrowAnimation();
        }

        this.ball = null;

        //Activar animación de lanzar.
        //Esperar mientras se ejecuta la animación
        //this.play("throw");
        var throwAnimTimer = this.scene.time.addEvent({ delay: this.throwAnimationDelay, callback: this.throwAnimationFinished, callbackScope: this, loop: false });
    }

    playThrowAnimation(){
        if(this.dirX > 0){
            this.play('throw_right');
        }else{
            this.play('throw_left');
        }


        //SELECCIONAR ANIMACIÓN EN FUNCIÓN DE LA DIRECCIÓN Y DE LA BOLA EN MANO
    }

    normaliceThrowDirection(){
        if(this.dirX != 0 && this.dirY != 0){
            this.dirX /= 1.5;
            this.dirY /= 1.5;
        }
    }

    throwAnimationFinished(){
        this.aiming = false;
    }

    takeDamage(){
        this.health --;

        if(this.health <= 0){
           // this.destroyFromScene();
           this.play('hurt');
           this.removeFromSceneLists();
           this.scene.playerEliminated();
        }else{
            this.enterHurtState();
        }
    }

    removeFromSceneLists(){
        this.disableInputs();
        this.scene.playersList.splice(this.scene.playersList.lastIndexOf(this), 1);
        this.scene.playersGroup.remove(this);
    }

    destroyFromScene(){

        //Eliminar de la lista de bolas
        
        this.removeFromSceneLists();
        this.scene.playerEliminated();

        //Destruir objeto de la escena
        this.destroy();
    }

    disableInputs(){
        this.scene.input.keyboard.off('keydown_'+this.keyUp);
        this.scene.input.keyboard.off('keyup_'+this.keyUp);

        this.scene.input.keyboard.off('keydown_'+this.keyLeft);
        this.scene.input.keyboard.off('keyup_'+this.keyLeft);

        this.scene.input.keyboard.off('keydown_'+this.keyDown);
        this.scene.input.keyboard.off('keyup_'+this.keyDown);

        this.scene.input.keyboard.off('keydown_'+this.keyRight);
        this.scene.input.keyboard.off('keyup_'+this.keyRight);

        this.scene.input.keyboard.off('keydown_'+this.keyThrow);
        this.scene.input.keyboard.off('keyup_'+this.keyThrow);

        this.scene.input.keyboard.off('keydown_'+this.keyCrouch);
        this.scene.input.keyboard.off('keyup_'+this.keyCrouch);
    }

    enterHurtState(){
        this.play('hurt');
        var hurtAnimTimer = this.scene.time.addEvent({ delay: this.hurtAnimationDelay, callback: this.endHurtAnimation, callbackScope: this, loop: false });
        this.stunned = true;

        this.startInvulnerableFrames(this.hurtInvulnerabilityDuration);
    }

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
            //this.scene.playersGroup.add(this, true);
        }  
    }

    endFlickeringCicle(){
        this.flickeringEnded = true;
    }

    endHurtAnimation(){
        this.play('idle');
        this.stunned = false;
    }

    inputCrouch(){
        if(this.crouching || this.stunned)
            return;

        this.crouching = true;
        this.play('crouch');

        this.setBodyVelocityToCero();

        this.startInvulnerableFrames(this.crouchInvulnerabilityDuration);
        //var timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.endCrouchInvulnerability, callbackScope: this, loop: false });
    }

    endCrouchInvulnerability(){
        this.addToGroupIfIsNotAddedYet();
    }

    addToGroupIfIsNotAddedYet(){
        if(!this.scene.playersGroup.contains(this)){
            this.scene.playersGroup.add(this, true);
        }
    }

    releaseCrouch(){
        this.crouching = false;
        this.play('idle');

        this.addToGroupIfIsNotAddedYet();
        this.flickeringEnded = true;
    }
}