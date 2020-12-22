class InputProfiler{
    constructor(scene, player, inputProfile) {
        
        this.inputProfile = inputProfile;
        this.player = player;
        this.scene = scene;

        this.setupInputEvents(scene, inputProfile)
    }

    setupInputEvents(scene, inputProfile){
        switch(inputProfile){
            case 0:
                this.keyUp = 'W';
                this.keyLeft = 'A';
                this.keyDown = 'S';
                this.keyRight = 'D';
                this.keyThrow = 'R';
                this.keyCrouch = 'T';
                break;
            case 1:
                this.keyUp = 'U';
                this.keyLeft = 'H';
                this.keyDown = 'J';
                this.keyRight = 'K';
                this.keyThrow = 'O';
                this.keyCrouch = 'P';
                break;
            case -1:
                return;
        }

        scene.input.keyboard.on('keydown_'+this.keyUp, this.inputUp, this);
        scene.input.keyboard.on('keyup_'+this.keyUp, this.releaseUp, this);

        scene.input.keyboard.on('keydown_'+this.keyLeft, this.inputLeft, this);
        scene.input.keyboard.on('keyup_'+this.keyLeft, this.releaseLeft, this);

        scene.input.keyboard.on('keydown_'+this.keyDown, this.inputDown, this);
        scene.input.keyboard.on('keyup_'+this.keyDown, this.releaseDown, this);

        scene.input.keyboard.on('keydown_'+this.keyRight, this.inputRight, this);
        scene.input.keyboard.on('keyup_'+this.keyRight, this.releaseRight, this);

        scene.input.keyboard.on('keydown_'+this.keyThrow, this.inputGrabOrThrow, this);
        scene.input.keyboard.on('keyup_'+this.keyThrow, this.releaseGrabOrThrow, this);

        scene.input.keyboard.on('keydown_'+this.keyCrouch, this.inputCrouch, this);
        scene.input.keyboard.on('keyup_'+this.keyCrouch, this.releaseCrouch, this);
    }

    inputUp(){
        this.player.pressingUp = true;
        this.player.dirY = -1;
    }

    releaseUp(){
        this.player.pressingUp = false;
        this.player.dirY = 0;
    }

    inputDown(){
        this.player.pressingDown = true;
        this.player.dirY = 1;
    }

    releaseDown(){
        this.player.pressingDown = false;
        this.player.dirY = 0;
    }

    inputLeft(){
        this.player.pressingLeft = true;
        this.player.dirX = -1;
    }

    releaseLeft(){
        this.player.pressingLeft = false;
        this.player.dirX = 0;
    }

    inputRight(){
       this.player.pressingRight = true;
       this.player.dirX = 1;
    }

    releaseRight(){
        this.player.pressingRight = false;
        this.player.dirX = 0;
    }

    inputGrabOrThrow(){
        if(this.player.ball == null)
            this.player.pickBombs();
        else
            this.player.enterAimMode();
    }

    releaseGrabOrThrow() {
        if(!this.player.aiming || this.player.ball == null){
            this.player.aiming = false;
            return;
        }

        this.player.throwBall();
    }

    inputCrouch(){
        if(this.player.crouching || this.player.stunned || this.player.aiming)
            return;

        this.player.enterCrouchMode();
    }

    releaseCrouch(){
       this.player.exitCrouchMode();
    }

    disableMovementInputs(){
        this.scene.input.keyboard.off('keydown_'+this.keyUp);
        this.scene.input.keyboard.off('keyup_'+this.keyUp);

        this.scene.input.keyboard.off('keydown_'+this.keyLeft);
        this.scene.input.keyboard.off('keyup_'+this.keyLeft);

        this.scene.input.keyboard.off('keydown_'+this.keyDown);
        this.scene.input.keyboard.off('keyup_'+this.keyDown);

        this.scene.input.keyboard.off('keydown_'+this.keyRight);
        this.scene.input.keyboard.off('keyup_'+this.keyRight);
    }

    disableAllInputs(){
        this.scene.input.keyboard.off('keydown_'+this.keyUp);
        this.scene.input.keyboard.off('keyup_'+this.keyUp);

        this.scene.input.keyboard.off('keydown_'+this.keyLeft);
        this.scene.input.keyboard.off('keyup_'+this.keyLeft);

        this.scene.input.keyboard.off('keydown_'+this.keyDown);
        this.scene.input.keyboard.off('keyup_'+this.keyDown);

        this.scene.input.keyboard.off('keydown_'+this.keyRight);
        this.scene.input.keyboard.off('keyup_'+this.keyRight);

        this.scene.input.keyboard.off('keydown_'+this.keyThrow);
        this.scene.input.keyboard.off('keyup_'+this.keyThrow);

        this.scene.input.keyboard.off('keydown_'+this.keyCrouch);
        this.scene.input.keyboard.off('keyup_'+this.keyCrouch);
    }
}