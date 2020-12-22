class MatchClock{
    constructor(scene, minutes, seconds){
        this.scene = scene;

        this.minutesRemaining = minutes;
        this.secondsRemaining = seconds;
        this.acumulatedDelta = 0;
        this.timeEnded = false;

        this.scene.matchTimer = this.scene.add.text(config.width / 2, 30, this.minutesRemaining+":"+this.secondsRemaining+'0', {
            font: "25px Consolas",
            fill: "red",
        });
        this.scene.matchTimer.setOrigin(0.5, 0.5);

        this.marcador = this.scene.add.image(config.width / 2, 40, 'marcador');
        this.marcador.setScale(0.3);
        this.marcador.setDepth(5);
        this.scene.matchTimer.setDepth(6);

        this.printTimeLeft();
    }

    printTimeLeft(){
        var text = '';

        if(this.minutesRemaining < 10)
            text += '0'+this.minutesRemaining+":";
        else
            text += this.minutesRemaining+":";

        if(this.secondsRemaining < 10)
            text+= '0'+this.secondsRemaining;
        else
            text+= this.secondsRemaining;
        
        this.scene.matchTimer.setText(text);
    }

    updateClock(time, delta){
        if(this.scene.timeEnded || this.scene.matchEnd)
            return;

        this.acumulatedDelta += delta;

        if(this.acumulatedDelta >= 1000){
            this.acumulatedDelta = 0;
            this.secondsRemaining -= 1;

            if(this.secondsRemaining == -1 && this.minutesRemaining > 0){
                this.secondsRemaining = 59;
                this.minutesRemaining -= 1;
            }

            if(this.secondsRemaining == 0 && this.minutesRemaining == 0){
                this.scene.timeEnded = true;
                this.scene.activateSuddenDeath();
            }

            this.printTimeLeft();            
        }
    }
}