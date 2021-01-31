class Ball extends Phaser.GameObjects.Sprite{

    dirX = 0;
    dirY = 0;
    speed = 700;

    onGround = true;
    heldByPlayer = null;
    playerId = -1;

    distanceToTravel = 2500000;
    distanceToActivateCollisions = 100000;

    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, keyname);

        this.setDepth(1);
        this.setScale(0.4);
        this.setupPhysics(scene);

        this.scene = scene;
        scene.add.existing(this);

        this.enterSuddenDeathIfNeeded();
    }

    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);

        this.colliderRadius = 50;
        this.body.setCircle(this.colliderRadius, (this.width / 2) - this.colliderRadius, (this.height / 2) - this.colliderRadius);
    }

    enterSuddenDeathIfNeeded(){
        if(this.scene.timeEnded){
            this.enterSuddenDeathMode();
        }
    }

    update(elapsed){
        
        if (this.onGround || this.heldByPlayer)
            return;
        
        this.updateTraveledDistance(elapsed);
        this.updateDistanceToActivateCollisions(elapsed);

        this.angle += 10;
    }

    updateTraveledDistance(elapsed){
        if(this.distanceToTravel > 0){
            this.distanceToTravel -= this.speed * elapsed;

            //Después de recorrer cierta distancia, que la bola quede en el suelo
            if(this.distanceToTravel < 0){
                this.setBallOnGround();
                this.distanceToTravel = 0;        
            }
        }
    }

    updateDistanceToActivateCollisions(elapsed){
        if(this.distanceToActivateCollisions > 0){
            this.distanceToActivateCollisions -= this.speed * elapsed;

            if(this.distanceToActivateCollisions < 0){
                this.addToPhysicsGroup();
                this.distanceToActivateCollisions = 0;        
            }
        }
    }

    addToPhysicsGroup ()
    {
        this.scene.ballsGroup.add(this, true);
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
    }

    //Llamado cuando la bola ha impactado contra un jugador
    impact(){
        this.setBallOnGround();
        this.scene.hitSfx.play();
    }

    //En caso de querer destruir por completo el objeto
    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.scene.ballsList.splice(this.scene.ballsList.lastIndexOf(this), 1);
        this.scene.ballsGroup.remove(this);

        //En el modo online, enviar mensaje de que esta bola ha fenecido
        if(this.scene.gameMode == "online")
            this.scene.ingameSocket.sendBallDeleted(this.id);

        //Destruir objeto de la escena
        this.destroy();
    }

    enterSuddenDeathMode(){
        this.setScale(this.scale + 0.2);
        this.speed += 300;
    }
}