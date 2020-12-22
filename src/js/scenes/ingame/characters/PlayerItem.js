class PlayerItem extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, itemId) {
        super(scene, x, y, "player_"+itemId);

        this.setDepth(3);

        this.player = player;
        scene.add.existing(this);
        this.setScale(player.scale);

        this.id = itemId;

        this.flipX = player.flipX;
    }

    state = '';

    update(){
        this.x = this.player.x;
        this.y = this.player.y;

        //Caso específico para la patata
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
        this.play('walk_'+this.id+''+this.state, true);
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