class PlayerOnline extends Phaser.GameObjects.Sprite{
    id;

    speed = 400;
    aiming = false;
    pickUpRadius = 80;

    pressingUp = false;
    pressingDown = false;
    pressingLeft = false;
    pressingRight = false;

    movX = 0;
    movY = 0;

    dirX = 0;
    dirY = 0;

    ball;

    stunned = false;
    crouching = false;

    health = 3;

    throwAnimationDelay = 200;
    hurtAnimationDelay = 500;
    timeBetweenFlickeringCycles = 25;
    hurtInvulnerabilityDuration = 1000;
    crouchInvulnerabilityDuration = 500;

    flickeringEnded = true;

    facingRight = true;

    constructor(scene, id, x, y, character, team) {
        super(scene, x, y, character);

        this.id = id;

        this.setDepth(2);
        this.setScale(0.4);

        this.team = team;

        this.animator = new PlayerAnimator(scene, this, character);

        //Añadir elemento a la escena
        scene.add.existing(this);
        this.setupPhysics(scene);

        this.animator.playIdle();

        //Lista de objetos o elementos que van a modificar la trayectoria del jugador
        this.atractedList = [];
    }

    setupPhysics(scene){
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(false);

        this.body.setSize(100, 200)

        scene.playersGroup.add(this);
    }
    
    update(delta){
        this.updatePosition(delta);
        this.updateBallPosition();

        this.animator.update(delta);
    }

    addObjectToAtractionList(item){
        if(!this.atractedList.includes(item)){
            this.atractedList[this.atractedList.length] = item;
        }
    }

    removeObjectFromAtractionList(item){
        if(this.atractedList.includes(item)){
            this.atractedList.splice(this.atractedList.lastIndexOf(item), 1);
        }
    }

    AtractionForces(){

        var totalforceVector = new Phaser.Math.Vector2(0, 0);

        for(var i = 0; i < this.atractedList.length; i++){
            var forceVector = new Phaser.Math.Vector2(0, 0);

            var distance = (this.getDistanceBetweenPoints(this.x, this.y, this.atractedList[i].x, this.atractedList[i].y));
            var distanceVector = new Phaser.Math.Vector2((this.atractedList[i].x - this.x), (this.atractedList[i].y - this.y));

            distanceVector.x /= distance;
            distanceVector.y /= distance;

            var atractionModifier = this.atractedList[i].atractionForce * 1000 / distance;

            forceVector.x = distanceVector.x * atractionModifier; 
            forceVector.y = distanceVector.y * atractionModifier; 

            totalforceVector.add(forceVector);
        }

       return totalforceVector;
    }

    updatePosition(delta){
        if (this.aiming || this.stunned || this.crouching)
            return;

        var newVelocity = new Phaser.Math.Vector2(0, 0);

        /*
        if (this.pressingUp)
            newVelocity.y -= this.speed;

        if (this.pressingDown)
            newVelocity.y += this.speed;

        if (this.pressingLeft)
            newVelocity.x -= this.speed;

        if (this.pressingRight)
            newVelocity.x += this.speed;
*/
        newVelocity.x += (this.movX * this.speed);
        newVelocity.y += (this.movY * this.speed);

        newVelocity.add(this.AtractionForces());

        this.body.velocity = newVelocity;
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    updateBallPosition(){
        if (this.ball != null) {
            this.ball.x = this.x;
            this.ball.y = this.y;
        }
    }

    setBodyVelocityToCero(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    //====================================================================================================
    // Recoger Objeto
    //====================================================================================================
    
    pickBomb(b){
        this.ball = b;
        this.ball.heldByPlayer = this;
        this.animator.ballObtained(this.ball);
        this.setBodyVelocityToCero();

        console.log("Pelota recogida por dummy "+this.ball.id);

        this.animator.playCrouch();
        this.stunned = true;
        this.ball.visible = false;
        var pickUpDelayTimer = this.scene.time.addEvent({ delay: 150, callback: this.pickupDelayEnded, callbackScope: this, loop: false });
    }

    pickupDelayEnded(){
        this.stunned = false;
    }

    //====================================================================================================
    // Apuntado y lanzamiento
    //====================================================================================================

    enterAimMode(){
        this.aiming = true;
        this.setBodyVelocityToCero();
    }

    throwBall(ball, dirX, dirY){
        this.dirX = dirX;
        this.dirY = dirY;

        this.launchBall();

        this.animator.ballLaunched();
        this.animator.playThrow();

        this.stunned = true;
        this.aiming = false;

        this.scene.throwSfx.play();

        var throwAnimTimer = this.scene.time.addEvent({ delay: this.throwAnimationDelay, callback: this.throwAnimationFinished, callbackScope: this, loop: false });
    }

    launchBall(){
        //En caso de no estar apuntando a ninguna parte, que salga al menos con una dirección
        if(this.dirX == 0 && this.dirY == 0){
            if(this.flipX)
                this.ball.launch(-1, 0);
            else
                this.ball.launch(1, 0);
        }else{
            //this.normaliceThrowDirection();
            this.ball.launch(this.dirX, this.dirY);
        }

        console.log("Pelota lanzada por dummy");

        this.ball.visible = true;
        this.ball = null;
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

    //====================================================================================================
    // Agacharse
    //====================================================================================================

    enterCrouchMode(){
        if(this.crouching)
            return;

        this.crouching = true;
        this.animator.playCrouch();
        this.setBodyVelocityToCero();
        this.startInvulnerableFrames(this.crouchInvulnerabilityDuration);
    }

    exitCrouchMode(){
        this.crouching = false;
        this.animator.playIdle();

        if(!this.hurted){
            this.flickeringEnded = true;
            this.addToGroupIfIsNotAddedYet();
        }
    }

    //====================================================================================================
    // Recibir daño
    //====================================================================================================

    takeDamage(ballId){
        if(this.hurted)
            return;

        this.health --;

        if(this.health > 0){

            if(this.crouching)
                this.exitCrouchMode();

            this.enterHurtState(ballId);
           
            this.animator.lifebar.anims.play('lifebar_'+this.team+'_'+this.health);
        }else{
            //Muertini
            this.animator.playHurt();
            this.animator.lifebar.destroy();


            this.scene.ingameSocket.sendEliminatedState(this);

            this.removeFromSceneLists();

            //this.scene.playerEliminated(this.team);
        }
    }

    removeFromSceneLists(){
        this.scene.playersList.splice(this.scene.playersList.lastIndexOf(this), 1);
        this.scene.playersGroup.remove(this);
    }

    destroyFromScene(){
        //Eliminar de la lista de bolas
        this.removeFromSceneLists();
        this.scene.playerEliminated(this.id);

        //Destruir objeto de la escena
        this.destroy();
    }

    enterHurtState(ballId){
        this.animator.playHurt();

        this.stunned = true;
        this.aiming = false;

        //this.scene.ingameSocket.sentEnterOtherHurtState(ballId, this);
        
        var hurtAnimTimer = this.scene.time.addEvent({ delay: this.hurtAnimationDelay, callback: this.endHurtAnimation, callbackScope: this, loop: false });

        this.hurted = true;
        this.startInvulnerableFrames(this.hurtInvulnerabilityDuration);
    }

    endHurtAnimation(){
        this.stunned = false;
    }

    //====================================================================================================
    // Periodo de invulnerabilidad
    //====================================================================================================

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
            this.hurted = false;
            this.addToGroupIfIsNotAddedYet();
        }  
    }

    endFlickeringCicle(){
        this.flickeringEnded = true;
    }

    endCrouchInvulnerability(){
        this.addToGroupIfIsNotAddedYet();
    }

    addToGroupIfIsNotAddedYet(){
        if(!this.scene.playersGroup.contains(this)){
            this.scene.playersGroup.add(this);
        }
    }

    //====================================================================================================
    // Otros
    //====================================================================================================

    enterSuddenDeathMode(){
        this.health = 1;
        this.animator.lifebar.play('lifebar_'+this.team+'_'+this.health);
    }
}