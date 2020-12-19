class BallPlacer{

    constructor(scene){
        this.scene = scene;
    }    

    createNewBallsByAmount(amount){
        for (var i = 0; i < amount; i++) {
            this.generateNewBall();
        }

        var timedEvent = this.scene.time.addEvent({ delay: 1000, callback:  this.ballRespawnerTimerEnded, callbackScope: this, loop: true });
    }

    generateNewBall(){
        var ballPosition = this.generateValidBallPosition();
        var i = this.scene.ballsList.length;

        if(Phaser.Math.Between(0, 10) > 8){
            this.scene.ballsList[i] = new BallBasket(this.scene, ballPosition.x, ballPosition.y);
        }else if(Phaser.Math.Between(0, 10) > 7){
            this.scene.ballsList[i] = new BallTemporizedBomb(this.scene, ballPosition.x, ballPosition.y);
        }else{
            this.scene.ballsList[i] = new BallBomb (this.scene, ballPosition.x, ballPosition.y);
        }
    }

    generateValidBallPosition(){
        var minDistance = 200;
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


    ballRespawnerTimerEnded(){
        if(this.scene.ballsList.length < this.scene.maxBallsInScene){
            this.generateNewBall();
        }
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    
}