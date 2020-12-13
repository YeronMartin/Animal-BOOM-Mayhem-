class Ball extends Phaser.GameObjects.Sprite{

    dirX = 0;
    dirY = 0;
    speed = 700;

    onGround = true;
    heldByPlayer = null;

    distanceToTravel = 1500000;
    distanceToActivateCollisions = 100000;

    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, keyname);

        this.setDepth(2);
        this.setScale(0.5);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        if(scene.timeEnded){
            this.enterSuddenDeathMode();
        }
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        
        //Después de recorrer cierta distancia, que la bola quede en el suelo
        if(this.distanceToTravel > 0){
            this.distanceToTravel -= this.speed * elapsed;

            if(this.distanceToTravel < 0){
                this.setBallOnGround();
                this.distanceToTravel = 0;        
            }
        }

        if(this.distanceToActivateCollisions > 0){
            this.distanceToActivateCollisions -= this.speed * elapsed;

            if(this.distanceToActivateCollisions < 0){
                this.addToPhysicsGroup();
                this.distanceToActivateCollisions = 0;        
            }
        }

        this.angle += 10;
    }

    setBallOnGround(){
        this.onGround = true;
        this.scene.ballsGroup.remove(this);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    //Llamado cuando el jugador lanza la bola
    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;

        this.onGround = false;
        this.heldByPlayer = null;
        this.distanceToTravel = 1500000;
        this.distanceToActivateCollisions = 100000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);

        //Después de un pequeño retardo, añadimos la bola al grupo de bolas para colisiones
        //var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });
    }

    addToPhysicsGroup ()
    {
        this.scene.ballsGroup.add(this, true);
    }

    //Llamado cuando la bola ha impactado contra un jugador
    impact(){
        this.setBallOnGround();

        //this.destroyFromScene()
    }

    //En caso de querer destruir por completo el objeto
    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.scene.ballsList.splice(this.scene.ballsList.lastIndexOf(this), 1);
        this.scene.ballsGroup.remove(this);

        //Destruir objeto de la escena
        this.destroy();
    }

    enterSuddenDeathMode(){
        this.setScale(this.scale + 0.2);
        this.speed += 300;
    }
}