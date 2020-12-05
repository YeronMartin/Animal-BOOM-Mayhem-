class Player extends Phaser.GameObjects.Sprite{

    
    speed = 500;
    aiming = false;

    pressingUp = false;
    pressingDown = false;
    pressingLeft = false;
    pressingRight = false;

    constructor(scene) {
        var x = config.width / 2;
        var y = config.height / 2;

        var dirX = 0;
        var dirY = 1;
        
        //Constructor de Sprite
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

        /*
        if (this.bomb === null) {
            //Buscamos bombas para recoger del suelo
            console.log("No tengo bombas");

            this.pickBombs();
        } else {
            //Lanzamos la que ya llevamos
            console.log("Tengo una bomba");


            this.aiming = true;
            //this.throwBomb();
        }
        */

        this.aiming = true;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    releaseGrabOrThrow() {

        if (this.aiming) {
            this.aiming = false;

            if(this.dirX == 0 && this.dirY == 0){
                this.dirX = 1;
            }

              //Generamos una bomba de prank
            var bomba = new Ball(this.scene, this.x, this.y, this.dirX, this.dirY);
        }
    }

    inputCrouch(){

    }

    releaseCrouch(){

    }

}