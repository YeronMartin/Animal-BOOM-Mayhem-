class Ball extends Phaser.GameObjects.Sprite{

    dirX = 0;
    dirY = 0;
    speed = 500;

    onGround = true;
    heldByPlayer = false;

    distanceToTravel = 1500000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba");

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);
    }
/*
    constructor(scene, posX, posY, dirX, dirY) {
        super(scene, posX, posY, "bomba");

        this.x = posX;
        this.y = posY;
        this.dirX = dirX;
        this.dirY = dirY;

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;

        var timedEvent = scene.time.addEvent({ delay: 500, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });

        scene.add.existing(this);
        this.scene.ballsList[this.scene.ballsList.length] = this;

        console.log(this.scene.ballsList.length);
    }
*/
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);
    }

    addToPhysicsGroup ()
    {
        this.scene.ballsGroup.add(this, true);
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        

        this.distanceToTravel -= this.speed * elapsed;

        if(this.distanceToTravel < 0){
            this.setBallOnGround();            
        }
    }

    setBallOnGround(){
        this.onGround = true;
        this.scene.ballsGroup.remove(this);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;

        this.onGround = false;
        this.heldByPlayer = false;
        this.distanceToTravel = 1500000;

        this.setupPhysics(this.scene);

        var timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });

        console.log("INDICIÓN");
    }

    impact(){
        console.log("OH NO!");

        this.setBallOnGround();
    }

    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.scene.ballsList.splice(this.scene.ballsList.lastIndexOf(this), 1);

        console.log(this.scene.ballsList.length);

        //Destruir objeto en general
        this.destroy();
    }
}