class BallTemporizedBomb extends Ball{
    
    id = "BallBomb"
    speed = 700;
    distanceToTravel = 2000000;
    activated = false;
    time = 5000000;
    timeReduction = 700;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba4");

        this.setScale(0.7);
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

    launch(dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;
        this.onGround = false;
        this.heldByPlayer = false;
        this.activation();
        this.activated = true;
        this.distanceToTravel = 1500000;

        this.body.velocity.set(this.dirX * this.speed, this.dirY * this.speed);

        //Después de un pequeño retardo, añadimos la bola al grupo de bolas para colisiones
        var timedEvent = this.scene.time.addEvent({ delay: 200, callback: this.addToPhysicsGroup, callbackScope: this, loop: false });


        console.log("INDICIÓN");
    }

    update(elapsed){
        
        if(this.activated = true){
            this.time -= this.timeReduction * elapsed;
            
        if (this.onGround || this.heldByPlayer){
            return;
        }
        
        //Después de recorrer cierta distancia, que la bola quede en el suelo
        this.distanceToTravel -= this.speed * elapsed;
        console.log(this.time);
        
        if(this.distanceToTravel < 0){
            this.setBallOnGround();
        }
        
        if(this.time < 0){
            this.timedExplode();
        }
            
            
            
        }
        
       
        
    }
    setter(prueba){
        var prueba = this.prueba;
    }
    getter(){
        
    }

    activation(){
        console.log("estoy en activación")
        if(this.activated == false){
            this.activated = true;
            //var timedExplosion = this.scene.time.addEvent({ delay: 9000, callback: this.timedExplode, callbackScope: this, loop: false });
            console.log("He creado el evento de explosión.")
        } else {
            return;
        }
    }

    timedExplode(player){
        //this.activated = false;
        var explosion2 = new Explosion(this.scene, this.x, this.y);
        this.destroyFromScene();
        
    }

    impact(player){
        //console.log(this.scene)
        this.timedExplode();
        this.destroyFromScene();
    }
}