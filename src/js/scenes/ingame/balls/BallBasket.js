class BallBasket extends Ball{
    name = "BallBasket";
    speed = 700;
    distanceToTravel = 2500000;
    distanceToActivateCollisions = 100000;

    constructor(scene, id, posX, posY){
        super(scene, posX, posY, "pelota");

        this.id = id;
        this.setScale(0.4);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);

        this.setDepth(1);
        this.enterSuddenDeathIfNeeded();
    }

}