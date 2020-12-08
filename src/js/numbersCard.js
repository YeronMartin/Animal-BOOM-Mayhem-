class numbersCard  extends Phaser.GameObjects.Sprite{
  constructor(sceneName, posX, posY, numElemnts, first_element, elapse){
    super (sceneName, posX, posY, 'null');

    this.scene = sceneName;
    this.posX = posX;
    this.posY = posY;
    this.numElemnts = numElemnts;
    this.first_element = first_element;
    this.elapse = elapse;
    this.elements_vector =  [];
    this.elements_vector_text = [];


    //Setteo del array de elementos
    for (var i = 0; i < this.numElemnts; i++) {
      this.elements_vector[i] = this.first_element + i*this.elapse;
      this.elements_vector_text[i] = this.scene.add.text(this.posX + i*40, this.posY,
        this.elements_vector[i], {fill: "#000"});
    }

    for (var i = 0; i < this.numElemnts; i++) {

      this.elements_vector_text[i].setInteractive();
    }
  };
}
