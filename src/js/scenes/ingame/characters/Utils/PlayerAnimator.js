class PlayerAnimator{
    constructor(scene, player, character) {
        this.scene = scene;
        this.player = player;

        this.setupCharacterAnimations(character);

        this.lifebar = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y + 50, 'lifebar_'+player.team);
        this.scene.add.existing(this.lifebar);
        this.lifebar.setDepth(3);
        this.lifebar.setScale(0.3);

        this.lifebar.anims.play('lifebar_'+player.team+'_'+player.health);
    }

    setupCharacterAnimations(character){
        this.idle_anim = this.scene.anims.create({
            key: character+'_idle',
            frames: this.scene.anims.generateFrameNames(character, {frames: [0]}),
            frameRate: 0,
            repeat: 1
        });

        this.walk_anim = this.scene.anims.create({
            key: character+'_walk',
            frames: this.scene.anims.generateFrameNames(character, {frames: [1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });

        this.throw_anim = this.scene.anims.create({
            key: character+'_throw',
            frames: this.scene.anims.generateFrameNames(character, {frames: [6, 7]}),
            frameRate: 20,
            repeat: 0
        });

        this.aim_anim = this.scene.anims.create({
            key: character+'_aim',
            frames: this.scene.anims.generateFrameNames(character, {frames: [6]}),
            frameRate: 10,
            repeat: 0
        });

        this.crouch_anim = this.scene.anims.create({
            key: character+'_crouch',
            frames: this.scene.anims.generateFrameNames(character, {frames: [4, 5]}),
            frameRate: 10,
            repeat: 0
        });

        this.hurt_anim = this.scene.anims.create({
            key: character+'_hurt',
            frames: this.scene.anims.generateFrameNames(character, {frames: [8]}),
            frameRate: 0,
            repeat: -1
        });
    }

    update(delta){
        this.updateBallPosition();
        this.updateLifebarPosition();

        this.flipSpriteIfNeeded();

        if(this.player.aiming){
            this.playAim();
        }

        if(this.player.aiming || this.player.stunned || this.player.crouching)
            return;

        if(this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0){
            this.playIdle();
        }else{
            this.playWalk();
        }
    }

    updateBallPosition(){
        if(this.player.ball == null && (this.ballInHand == 'potato' || this.ballInHand == 'potato_red')){
            this.ballLaunched();
        }

        if(this.ballInHand){
            this.playerItem.x = this.player.x;
            this.playerItem.y = this.player.y;

            if(this.ballInHand == 'potato' || this.ballInHand == 'potato_red')
                this.updatePotatoAnimation();
        }
    }

    updatePotatoAnimation(){
        if(this.player.ball.redState && this.ballInHand != 'potato_red'){
            this.ballInHand = 'potato_red';
            this.playerItem.anims.play( this.playerItem.anims.getCurrentKey().replace('potato', 'potato_red'));
        }else if(!this.player.ball.redState && this.ballInHand == 'potato_red'){
            this.ballInHand = 'potato'
            this.playerItem.anims.play( this.playerItem.anims.getCurrentKey().replace('potato_red', 'potato'));
        }
    }

    updateLifebarPosition(){
        this.lifebar.x = this.player.x;
        this.lifebar.y = this.player.y + 50;
    }

    flipSpriteIfNeeded(){
        if((this.player.body.velocity.x < 0 || this.player.dirX < 0) && !this.player.flipX){
            this.player.flipX = true;
            if(this.playerItem)
                this.playerItem.flipX = true;
        }else if((this.player.body.velocity.x > 0 || this.player.dirX > 0) && this.player.flipX){
            this.player.flipX = false;
            if(this.playerItem)
                this.playerItem.flipX = false;
        }
    }

    ballObtained(ball){
        if(ball.name == "BallBasket"){
            this.playerItem = new Phaser.GameObjects.Sprite(this.scene, this.player.x, this.player.y, 'basketball');
            this.ballInHand = 'basketball';
        }else if(ball.name == 'BallBomb'){
            this.playerItem = new Phaser.GameObjects.Sprite(this.scene, this.player.x, this.player.y, 'bomb');
            this.ballInHand = 'bomb';
        }else if(ball.name == "BallTemporizedBomb"){
            this.playerItem = new Phaser.GameObjects.Sprite(this.scene, this.player.x, this.player.y, 'potato');
            this.ballInHand = 'potato';
        }else if(ball.name == "FlamingBall"){
            this.playerItem = new Phaser.GameObjects.Sprite(this.scene, this.player.x, this.player.y, 'flaming_ball');
            this.ballInHand = 'flaming_ball';

        }else if(ball.name == "BlackHoleBall"){
            this.playerItem = new Phaser.GameObjects.Sprite(this.scene, this.player.x, this.player.y, 'mini_black_hole');
            this.ballInHand = 'mini_black_hole';
        }

        this.playerItem.setDepth(2);
        this.scene.add.existing(this.playerItem);
        this.playerItem.setScale(this.player.scale);
        this.playerItem.flipX = this.player.flipX;
    }

    ballLaunched(){
        this.playerItem.destroy();
        this.ballInHand = null;
    }

    playIdle(){
        this.player.anims.play(this.idle_anim, true);
        this.playItemAnimation('_idle');
    }

    playWalk(){
        this.player.anims.play(this.walk_anim, true);
        this.playItemAnimation('_walk');
    }

    playAim(){
        this.player.anims.play(this.aim_anim, true);
        this.playItemAnimation('_aim');
    }

    playThrow(){
        this.player.anims.play(this.throw_anim, true);
        this.playItemAnimation('_throw');
    }

    playCrouch(){
        this.player.anims.play(this.crouch_anim, true);
        this.playItemAnimation('_crouch');
    }

    playHurt(){
        this.player.anims.play(this.hurt_anim, true);
        this.playItemAnimation('_hurt');
    }

    playItemAnimation(anim){
        if(this.ballInHand)
            this.playerItem.anims.play(this.ballInHand + anim, true);
    }
}