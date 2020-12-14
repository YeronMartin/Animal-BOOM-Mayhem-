class characterCard  extends Phaser.GameObjects.Sprite{
  constructor(sceneName, posX, posY, description,rep, rep_selected){
    super (sceneName, posX, posY, 'null');

    this.scene = sceneName;
    this.posX = posX;
    this.posY = posY;
    this.description = description
    this.rep = rep;
    this.rep_selected = rep_selected;
    this.isSelected = false;

    //Setteo de la interactividad de la imagen
    this.characterImage = this.scene.add.image(this.posX, this.posY, rep).setDepth(1).setScale(.15)



  };

  renderCard (button_selected){
    if (button_selected) {
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep).setDepth(2).setScale(.15);
    }else{
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep_selected).setDepth(2).setScale(.15);
    }
  };
}
