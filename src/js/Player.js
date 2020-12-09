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

    constructor(scene, x, y, id) {
        super(scene, x, y, "cerdete_sheet");

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        //Añadir elemento a una lista en la escena
        scene.playersGroup.add(this);

        this.setupAnimations(scene);

        //this.body.setImmovable(true);

        this.play('walk');

        this.setupInputEvents(scene, id);
    }

    setupAnimations(scene){
        this.anim1 = this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [0]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim2 = this.scene.anims.create({
            key: 'crouch',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [1]}),
            frameRate: 0,
            repeat: -1
        });

        this.anim3 = this.scene.anims.create({
            key: 'hurt',
            frames: this.scene.anims.generateFrameNames('cerdete_sheet', {frames: [2]}),
            frameRate: 0,
            repeat: -1
        });
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);
    }

    
    keyUp = 'W';
    keyLeft = 'A';
    keyDown = 'S';
    keyRight = 'D';
    keyThrow = 'R';
    keyCrouch = 'T';

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
        //...
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
            console.log("A buscar bombas");
            this.pickBombs();
        }else{
            console.log("A lanzar bombas... ¡APUNTA!");

            this.aiming = true;

            this.setBodyVelocityToCero();
        }
    }

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    pickBombs() {
        //Buscamos una bomba en el suelo cerca nuestra
        var b = this.getClosestBallInRange();

        if (b != null) {
            this.ball = b;
            this.ball.heldByPlayer;
        }
    }

    getClosestBallInRange() {

        for (var i = this.scene.ballsList.length - 1; i >= 0; i--) {
            if (this.scene.ballsList[i].onGround && !this.scene.ballsList[i].heldByPlayer) {
                var ball = this.scene.ballsList[i];

                if (this.isPointInsideArea(ball.x, ball.y, this.x, this.y, this.pickUpRadius)) {
                    console.log("COINCIDE!");
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

        if (this.aiming && this.ball != null) {
            console.log("¡DISPARA!");

            //En caso de no estar apuntando a ninguna parte, que salga al menos con una dirección
            if(this.dirX == 0 && this.dirY == 0){
                this.ball.launch(1, 0);
            }else{
                this.ball.launch(this.dirX, this.dirY);
            }

            this.ball = null;

            //Activar animación de lanzar.
            //Esperar mientras se ejecuta la animación
            var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.throwAnimationFinished, callbackScope: this, loop: false });
        }
    }

    takeDamage(){
        this.play('hurt');

        var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.endHurtAnimation, callbackScope: this, loop: false });
        this.stunned = true;

        this.health --;

        this.flickeringEnded = false;
        var timedEvent2 = this.scene.time.addEvent({ delay: 25, callback: this.flickeringCicle, callbackScope: this, loop: false });
        
        var timedEvent3 = this.scene.time.addEvent({ delay: 2000, callback: this.endFlickeringCicle, callbackScope: this, loop: false });

        this.scene.playersGroup.remove(this);

        this.checkEliminated();
    }

    flickeringEnded = false;

    flickeringCicle(){

        if(this.health <= 0){
            return;
        }

        this.visible = !this.visible;

        if(!this.flickeringEnded){
            var timedEvent = this.scene.time.addEvent({ delay: 25, callback: this.flickeringCicle, callbackScope: this, loop: false });
        }else{
            this.visible = true;
            this.scene.playersGroup.add(this, true);
        }
       
    }

    endFlickeringCicle(){
        if(this.health <= 0){
            return;
        }

        this.flickeringEnded = true;
    }

    checkEliminated(){
        if(this.health <= 0){
            console.log("¡OHHH, MAMMA MIA!")

            this.destroyFromScene();
        }
    }

    destroyFromScene(){

        this.disableInputs();

        //Eliminar de la lista de bolas
        this.scene.playersList.splice(this.scene.playersList.lastIndexOf(this), 1);
        this.scene.playersGroup.remove(this);

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


    endHurtAnimation(){
        if(this.health <= 0){
            return;
        }
        
        this.play('walk');

        this.stunned = false;
    }

    throwAnimationFinished(){
        this.aiming = false;
    }

    inputCrouch(){
        if(this.crouching || this.stunned)
            return;
        
        console.log("Magacho");

        this.crouching = true;
        this.invulnerable = true;
        this.play('crouch');


        this.setBodyVelocityToCero();

        this.scene.playersGroup.remove(this);
        var timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.endCrouchInvulnerability, callbackScope: this, loop: false });
    }

    endCrouchInvulnerability(){
        this.invulnerable = false;
        this.addToGroupIfIsNotAddedYet();
        console.log("Se acabó lo que se daba")
    }

    addToGroupIfIsNotAddedYet(){
        if(!this.scene.playersGroup.contains(this)){
            this.scene.playersGroup.add(this, true);
        }
    }

    releaseCrouch(){
        console.log("Ya no magacho");
    
        this.crouching = false;
        this.play('walk');

        this.addToGroupIfIsNotAddedYet();
    }

}