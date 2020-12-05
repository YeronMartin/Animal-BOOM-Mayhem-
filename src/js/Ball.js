class Ball extends Phaser.GameObjects.Sprite{

    dirX = 0;
    dirY = 0;
    speed = 500;

    onGround = false;
    heldByPlayer = false;

    distanceToTravel = 1500000;

    constructor(scene, posX, posY, dirX, dirY) {

        super(scene, posX, posY, "bomba");

        this.x = posX;
        this.y = posY;
        this.dirX = dirX;
        this.dirY = dirY;

        this.setScale(0.3);

        this.setupPhysics(scene);

        var scene = scene;

        var timedEvent = scene.time.addEvent({ delay: 500, callback: this.addToList, callbackScope: this, loop: false });

        scene.add.existing(this);
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);
    }

    addToList ()
    {
        this.scene.ballsGroup.add(this, true);
        this.scene.ballsList[this.scene.ballsList.length] = this;
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        

        this.distanceToTravel -= this.speed * elapsed;
        if(this.distanceToTravel < 0){
            this.onGround = true;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        
    }
}