class BlackHoleArea extends Phaser.GameObjects.Sprite {
    constructor(scene, posX, posY){
        super(scene, posX, posY, "black_hole_area_sheet");

        this.setupPhysics(scene);

        this.scene = scene;
        this.scene.add.existing(this);

        this.setDepth(4);
        this.setScale(0.8);


        this.anims.play('blackHoleArea_anim');
        
        var timedEvent = this.scene.time.addEvent({ delay: 5000, callback: this.removeFromScene, callbackScope: this, loop: false });
    }
    
    setupPhysics(scene)
    {
        scene.physics.world.enableBody(this);
        this.body.bounce.set(0);
        this.body.setImmovable(true);

        this.colliderRadius = 100;
        this.body.setCircle(this.colliderRadius, (this.width / 2) - this.colliderRadius, (this.height / 2) - this.colliderRadius);

        scene.blackHoleAreasList[scene.blackHoleAreasList.length] = this;
    }
    
    removeFromScene(){
        this.scene.blackHoleAreasList.splice(this.scene.blackHoleAreasList.lastIndexOf(this), 1);

        for(var i = this.scene.playersList.length - 1; i >= 0; i--){
            this.scene.playersList[i].removeObjectFromAtractionList(this);
        }

        this.destroy();
    }

    innerRadius = 50;
    externalRadius = 250;
    atractionForce = 10;

    update(elapsed){
        this.applyAtractionToBalls();
        this.applyAtractionToPlayers();
    }

    applyAtractionToBalls(){
        for(var i = this.scene.ballsList.length - 1; i >= 0; i--){
            var b = this.scene.ballsList[i];

            var distance = this.getDistanceBetweenPoints(this.x, this.y, b.x, b.y);

            if(distance < this.innerRadius){
                b.destroyFromScene();
            }else if(distance < this.externalRadius){
                var atractionForceModifier = this.atractionForce / distance;
                b.body.velocity.add(new Phaser.Math.Vector2((this.x - b.x) * atractionForceModifier, (this.y - b.y) * atractionForceModifier));
            }
        }
    }

    applyAtractionToPlayers(){
        for(var i = this.scene.playersList.length - 1; i >= 0; i--){
            var p = this.scene.playersList[i];

            var distance = this.getDistanceBetweenPoints(this.x, this.y, p.x, p.y);

            if(distance > this.externalRadius){
                p.removeObjectFromAtractionList(this);
            }else if(distance > this.innerRadius){
                p.addObjectToAtractionList(this);
            }else{
                p.takeDamage(this, false);
                p.removeObjectFromAtractionList(this);
            }
        }
    }

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}