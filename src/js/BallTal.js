class BallTal extends Ball{

    speed = 1000;

    constructor(scene, posX, posY){
        super(scene, posX, posY, "bomba2");

        this.setScale(0.3);
        this.setupPhysics(scene);

        var scene = scene;
        scene.add.existing(this);
    }
}