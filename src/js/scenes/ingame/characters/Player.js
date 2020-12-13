class Player extends Phaser.GameObjects.Sprite{
    id;
    sheetKey = 0;

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
    hurtAnimationDelay = 250;
    timeBetweenFlickeringCycles = 25;
    hurtInvulnerabilityDuration = 1000;
    crouchInvulnerabilityDuration = 500;

    flickeringEnded = false;

    facingRight = true;

    constructor(scene, x, y, id) {
        super(scene, x, y, "juani_sheet"+id);

        this.id = id;

        this.setDepth(1);

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        this.setScale(0.4);

        //Añadir elemento a una lista en la escena
        scene.playersGroup.add(this);

        this.setupAnimations(scene);

        this.sheetKey = '';

        //this.play('idle'+this.id+this.sheetKey);
        this.play('idle'+this.id);

        this.setupInputEvents(scene, id);

        this.playerItem = new PlayerItem(this.scene, 0, 0, this, 'none');

        this.setupLifeBar(id);
    }

    setupLifeBar(id){
        this.lifebar = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y + 50, 'lifebar_'+id);
        this.scene.add.existing(this.lifebar);
        this.lifebar.setDepth(3);
        this.lifebar.setScale(0.3);

        this.lifebar.anim0 = this.scene.anims.create({
            key: 'lifebar_'+id+'_3',
            frames: this.scene.anims.generateFrameNames('lifebar_'+this.id, {frames: [0]}),
        });

        this.lifebar.anim1 = this.scene.anims.create({
            key: 'lifebar_'+id+'_2',
            frames: this.scene.anims.generateFrameNames('lifebar_'+this.id, {frames: [1]}),
        });

        this.lifebar.anim2 = this.scene.anims.create({
            key: 'lifebar_'+id+'_1',
            frames: this.scene.anims.generateFrameNames('lifebar_'+this.id, {frames: [2]}),
        });
    }

    setupAnimations(scene){
        this.anim0 = this.scene.anims.create({
            key: 'idle'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [0]}),
            frameRate: 0,
            repeat: 1
        });

        this.anim1 = this.scene.anims.create({
            key: 'walk'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });

        this.anim2 = this.scene.anims.create({
            key: 'throw'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [6, 7]}),
            frameRate: 20,
            repeat: 0
        });

        this.anim3 = this.scene.anims.create({
            key: 'aim'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [6]}),
            frameRate: 10,
            repeat: 0
        });

        this.anim4 = this.scene.anims.create({
            key: 'crouch'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [4, 5]}),
            frameRate: 10,
            repeat: 0
        });

        this.anim5 = this.scene.anims.create({
            key: 'hurt'+this.id,
            frames: this.scene.anims.generateFrameNames('juani_sheet'+this.id, {frames: [8]}),
            frameRate: 0,
            repeat: -1
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
        this.updateLifebarPosition();

        this.updatePosition();
        this.updateBallPosition();
        this.updateAnimations();

        if(this.aiming && this.ball == null){
            this.aiming = false;
        }
    }

    updatePosition(){

        this.playerItem.update();

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

        if(this.ball == null && this.playerItem.id == 'potato'){
            this.playerItem.destroy();
            this.playerItem = new PlayerItem(this.scene, this.x, this.y, this, 'none');
        }
    }

    updateLifebarPosition(){
        this.lifebar.x = this.x;
        this.lifebar.y = this.y + 50;
    }

    updateBallPosition(){
        //En caso de llevar una bola encima
        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }
    }

    updateAnimations(){

        if((this.body.velocity.x < 0 || this.dirX < 0) && !this.flipX){
            this.flipX = true;
            this.playerItem.flipX = true;
        }else if((this.body.velocity.x > 0 || this.dirX > 0) && this.flipX){
            this.flipX = false;
            this.playerItem.flipX = false;
        }

        //CAMBIAR A TENER EN CUENTA LA DIRECCIÓN Y LA BOLA EN MANO
        if(this.aiming){
            this.play('aim'+this.id);
            this.playerItem.playAim();
        }

        if(this.aiming || this.stunned || this.crouching)
            return;

        if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
            this.play('idle'+this.id);
            this.playerItem.playIdle();
        }else if(this.anims.getCurrentKey() != 'walk'+this.id){
            this.play('walk'+this.id);
            this.playerItem.playWalk();
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
            this.ball.heldByPlayer = this;

            this.setBodyVelocityToCero();

            this.playerItem.destroy();

            if(this.ball.id == "BallBasket"){
                this.playerItem = new PlayerItem(this.scene, this.x, this.y, this, 'basketball');
            }else if(this.ball.id == 'BallBomb'){
                this.playerItem = new PlayerItem(this.scene, this.x, this.y, this, 'bomb');
            }else if(this.ball.id == "BallTemporizedBomb"){
                this.playerItem = new PlayerItem(this.scene, this.x, this.y, this, 'potato');
            }

            //this.play('crouch'+this.id+this.sheetKey);
            this.play('crouch'+this.id);
            this.playerItem.playCrouch();

            this.stunned = true;


            this.ball.visible = false;

            var pickUpDelayTimer = this.scene.time.addEvent({ delay: 150, callback: this.pickupDelayEnded, callbackScope: this, loop: false });
        }
    }

    pickupDelayEnded(){
        this.stunned = false;
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
            if(this.flipX){
                this.ball.launch(-1, 0);
            }else{
                this.ball.launch(1, 0);
            }
        }else{
            this.normaliceThrowDirection();
            this.ball.launch(this.dirX, this.dirY);
        }

        this.playThrowAnimation();
        this.ball.visible = true;
        this.ball = null;
        //this.sheetKey = '';

        this.playerItem.destroy();
        this.playerItem = new PlayerItem(this.scene, this.x, this.y, this, 'none');


        //Activar animación de lanzar.
        //Esperar mientras se ejecuta la animación

        var throwAnimTimer = this.scene.time.addEvent({ delay: this.throwAnimationDelay, callback: this.throwAnimationFinished, callbackScope: this, loop: false });
    }

    playThrowAnimation(){

        //this.play('throw'+this.id+this.sheetKey);
        this.play('throw'+this.id);
        this.playerItem.playThrow();

        this.stunned = true;
        this.aiming = false;
        //SELECCIONAR ANIMACIÓN EN FUNCIÓN DE LA DIRECCIÓN Y DE LA BOLA EN MANO
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

    takeDamage(){
        this.health --;


        if(this.health <= 0){
           // this.destroyFromScene();
           //this.play('hurt'+this.id+this.sheetKey);
            this.play('hurt'+this.id);
            this.playerItem.playHurt();

            this.removeFromSceneLists();
            this.scene.playerEliminated();
            this.lifebar.destroy();
        }else{
            this.lifebar.play('lifebar_'+this.id+'_'+this.health);
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
        //this.play('hurt'+this.id+this.sheetKey);
        this.play('hurt'+this.id);
        this.playerItem.playHurt();

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
        }  
    }

    endFlickeringCicle(){
        this.flickeringEnded = true;
    }

    endHurtAnimation(){
        //this.play('idle'+this.id+this.sheetKey);
        this.play('idle'+this.id);
        this.playerItem.playIdle();

        this.stunned = false;
    }

    inputCrouch(){
        if(this.crouching || this.stunned)
            return;

        this.crouching = true;
        //this.play('crouch'+this.id+this.sheetKey);

        this.play('crouch'+this.id);
        this.playerItem.playCrouch();

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
        //this.play('idle'+this.id+this.sheetKey);

        this.play('idle'+this.id);
        this.playerItem.playIdle();

        this.addToGroupIfIsNotAddedYet();
        this.flickeringEnded = true;
    }

    enterSuddenDeathMode(){
        this.health = 1;
        this.lifebar.play('lifebar_'+this.id+'_'+this.health);
    }
}