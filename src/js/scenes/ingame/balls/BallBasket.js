class BallBasket extends Ball{
    
    id = "BallBasket"
    speed = 700;
    distanceToTravel = 2000000;
    distanceToActivateCollisions = 100000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "pelota");

        this.setScale(0.4);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);

        if(scene.timeEnded){
            this.enterSuddenDeathMode();
        }
    }

}