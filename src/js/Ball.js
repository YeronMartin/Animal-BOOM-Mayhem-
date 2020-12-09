class Ball extends Phaser.GameObjects.Sprite{

    dirX = 0;
    dirY = 0;
    speed = 500;
    id = "ball"

    onGround = true;
    heldByPlayer = false;

    distanceToTravel = 1500000;

    constructor(scene, posX, posY, keyname){
        super(scene, posX, posY, keyname);

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);
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

    //Llamado cuando el jugador lanza la bola
    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;
        this.onGround = false;
        this.heldByPlayer = false;
        this.distanceToTravel = 1500000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);

        //Después de un pequeño retardo, añadimos la bola al grupo de bolas para colisiones
        var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });

        console.log("INDICIÓN");
    }

    addToPhysicsGroup ()
    {
        console.log(this.scene.ballsGroup);
        this.scene.ballsGroup.add(this, true);
    }

    //Llamado cuando la bola ha impactado contra un jugador
    impact(){
        console.log("OH NO!");

        this.setBallOnGround();

        //this.destroyFromScene()
    }

    //En caso de querer destruir por completo el objeto
    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.scene.ballsList.splice(this.scene.ballsList.lastIndexOf(this), 1);
        this.scene.ballsGroup.remove(this);

        console.log(this.scene.ballsList.length);

        //Destruir objeto de la escena
        this.destroy();
    }
}