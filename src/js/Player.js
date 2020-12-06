class Player extends Phaser.GameObjects.Sprite{

    speed = 500;
    aiming = false;

    pressingUp = false;
    pressingDown = false;
    pressingLeft = false;
    pressingRight = false;

    dirX = 0;
    dirY = 0;

    ball;


    constructor(scene, x, y) {
        super(scene, x, y, "cerdete");

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        //Añadir elemento a una lista en la escena
        scene.players.add(this);

        this.setupInputEvents(scene);
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);
    }

    setupInputEvents(scene){
        scene.input.keyboard.on('keydown_W', this.inputUp, this);
        scene.input.keyboard.on('keyup_W', this.releaseUp, this);

        scene.input.keyboard.on('keydown_A', this.inputLeft, this);
        scene.input.keyboard.on('keyup_A', this.releaseLeft, this);

        scene.input.keyboard.on('keydown_S', this.inputDown, this);
        scene.input.keyboard.on('keyup_S', this.releaseDown, this);

        scene.input.keyboard.on('keydown_D', this.inputRight, this);
        scene.input.keyboard.on('keyup_D', this.releaseRight, this);

        scene.input.keyboard.on('keydown_R', this.inputGrabOrThrow, this);
        scene.input.keyboard.on('keyup_R', this.releaseGrabOrThrow, this);
    }
    
    update(){

        this.updatePosition();

        //...
    }

    updatePosition(){

        if (this.aiming)
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


        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }

    }

    pickBombs(){
        //Buscamos una bomba en el suelo cerca nuestra
        
        //var b = mundo.getClosestBombInRange(this.x, this.y, pickUpRadius);

        if (b !== null) {
            bomb = b;

            bomb.setHeldByPlayer(true);
        }
    }

    throwBomb(){

    }

    //Metodiños para gestionar las entradas y salidas

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

    inputGrabOrThrow(){

        if(this.ball == null){
            console.log("A buscar bombas");
            this.pickBombs();
        }else{
            console.log("A lanzar bombas... ¡APUNTA!");

            this.aiming = true;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    pickUpRadius = 80;

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

        if (this.aiming) {
            console.log("A lanzar bombas... ¡DISPARA!");

            this.aiming = false;

            if(this.dirX == 0 && this.dirY == 0){
                this.ball.launch(1, 0);
            }else{
                this.ball.launch(this.dirX, this.dirY);
            }

            this.ball = null;
        }
    }

    inputCrouch(){

    }

    releaseCrouch(){

    }

}