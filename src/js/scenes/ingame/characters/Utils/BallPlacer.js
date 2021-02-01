class BallPlacer{

    constructor(scene, allowedBalls){
        this.scene = scene;

        this.allowedBalls = allowedBalls;
    }    

    createNewBallsByAmount(amount){
        for (var i = 0; i < amount; i++) {
            this.generateNewBall();
        }

        var timedEvent = this.scene.time.addEvent({ delay: 3000, callback:  this.ballRespawnerTimerEnded, callbackScope: this, loop: true });
    }

    generateNewBall(){
        var ballPosition = this.generateValidBallPosition();
        var i = this.scene.ballsList.length;


        var n = Phaser.Math.Between(0, 10);

        /*
        EN ALGÚN MOMENTO CAMBIAR A QUE HAYA UN MÁXIMO DE X TIPO DE PELOTA EN ESCENA
        POR EJEMPLO, 2 o 3 PELOTAS NO VOLÁTILES (Basketball)
        */

        

        if(n > 9 && this.allowedBalls.includes("mini_black_hole")){
            this.scene.ballsList[i] = new BlackHoleBall (this.scene, 0, ballPosition.x, ballPosition.y);
        }else if(n > 8 && this.allowedBalls.includes("flaming_ball")){
            this.scene.ballsList[i] = new FlamingBall (this.scene, 0, ballPosition.x, ballPosition.y);
        }else if(n > 6){
            this.scene.ballsList[i] = new BallBasket(this.scene, 0, ballPosition.x, ballPosition.y);
        }else if(n > 4){
            this.scene.ballsList[i] = new BallTemporizedBomb(this.scene, 0, ballPosition.x, ballPosition.y);
        }else{
            this.scene.ballsList[i] = new BallBomb (this.scene, 0, ballPosition.x, ballPosition.y);
        }
    }

    generateValidBallPosition(){
        var minDistance = 250;
        var validPosition = false;
        var tries = 10;
        var ballPosition = new Phaser.Math.Vector2(0, 0);

        do{
            while(tries > 0 && !validPosition){
                validPosition = true;

                ballPosition.x = Phaser.Math.Between(0, config.width);
                ballPosition.y = Phaser.Math.Between(0, config.height);

                for (var i = 0; i < this.scene.ballsList.length; i++) {
                    if(this.getDistanceBetweenPoints(ballPosition.x, ballPosition.y, this.scene.ballsList[i].x, 
                        this.scene.ballsList[i].y) < minDistance){
                        validPosition = false;
                        console.log("no vale");
                        break;
                    }
                }

                tries--;
            }

            minDistance -= 10;
            tries = 10;
        }while(!validPosition);

        return ballPosition;
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    ballRespawnerTimerEnded(){
        if(this.scene.ballsList.length < this.scene.maxBallsInScene){
            this.generateNewBall();
        }
    }
}