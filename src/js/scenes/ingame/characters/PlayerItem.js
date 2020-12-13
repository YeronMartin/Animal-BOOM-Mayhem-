class PlayerItem extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, itemId) {
        super(scene, x, y, "player_"+itemId);

        this.setDepth(3);

        this.player = player;
        scene.add.existing(this);
        this.setScale(player.scale);

        this.id = itemId;

        this.flipX = player.flipX;

        this.scene.anims.create({
            key: 'idle_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [0]}),
            frameRate: 0,
            repeat: 1
        });

        this.scene.anims.create({
            key: 'walk_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'throw_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [6, 7]}),
            frameRate: 20,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'aim_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [6]}),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'crouch_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [4, 5]}),
            frameRate: 300,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'hurt_'+itemId,
            frames: this.scene.anims.generateFrameNames('player_'+this.id, {frames: [8]}),
            frameRate: 0,
            repeat: -1
        });

        if(this.id == "potato"){
            //Crear las animaciones de la patata versión roja
            this.scene.anims.create({
                key: 'idle_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [0]}),
                frameRate: 0,
                repeat: 1
            });
    
            this.scene.anims.create({
                key: 'walk_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [1, 2, 3]}),
                frameRate: 10,
                repeat: -1
            });
    
            this.scene.anims.create({
                key: 'throw_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [6, 7]}),
                frameRate: 20,
                repeat: 0
            });
    
            this.scene.anims.create({
                key: 'aim_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [6]}),
                frameRate: 10,
                repeat: 0
            });
    
            this.scene.anims.create({
                key: 'crouch_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [4, 5]}),
                frameRate: 300,
                repeat: 0
            });
    
            this.scene.anims.create({
                key: 'hurt_'+itemId+'_red',
                frames: this.scene.anims.generateFrameNames('player_'+this.id+'_red', {frames: [8]}),
                frameRate: 0,
                repeat: -1
            });
        }
    }

    state = '';

    update(){
        //Mismo update que el jugador
        this.x = this.player.x;
        this.y = this.player.y;

        if(this.id == 'potato' && this.player.ball != null){
            
            if(this.player.ball.redState && this.state != '_red'){
                this.state = '_red';
                this.play(this.anims.getCurrentKey() + '_red');
            }else if(!this.player.ball.redState && this.state == '_red'){
                this.state = '';
                this.play(this.anims.getCurrentKey().substring(0, this.anims.getCurrentKey().length - 4));
            }
        }
    }

    playIdle(){
        this.play('idle_'+this.id+''+this.state);
    }

    playWalk(){
        this.play('walk_'+this.id+''+this.state);
    }

    playCrouch(){
        this.play('crouch_'+this.id+''+this.state);
    }

    playThrow(){
        this.play('throw_'+this.id+''+this.state);
    }

    playAim(){
        this.play('aim_'+this.id+''+this.state);
    }

    playHurt(){
        this.play('hurt_'+this.id+''+this.state);
    }
}