class BallBasket extends Ball{
    
    id = "BallBasket"
    speed = 700;
    distanceToTravel = 2000000;


    constructor(scene, posX, posY){
        super(scene, posX, posY, "pelotaBaloncesto");

        this.setScale(0.6);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);
    }

}