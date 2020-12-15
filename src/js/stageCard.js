class stageCard  extends Phaser.GameObjects.Sprite{
  constructor(sceneName, posX, posY,rep, rep_selected, rep_background){
    super (sceneName, posX, posY, 'null');

    this.scene = sceneName;
    this.posX = posX;
    this.posY = posY;
    this.rep = rep;
    this.rep_selected = rep_selected;
    this.rep_background = rep_background;
    this.isSelected = false;

    //Setteo de la interactividad de la imagen
    this.stageImageButton = this.scene.add.image(this.posX, this.posY, this.rep).setDepth(1).setScale(.06);
    this.stageImage = this.scene.add.image(config.width/4.5, config.height/5, this.rep_background).setDepth(1)
    .setScale(.20).setOrigin(0, 0).setVisible(false);
  };

  renderButton(){
    if (this.isSelected) {
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep).setDepth(1).setScale(.06);
      this.isSelected = false;
    }else{
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep_selected).setDepth(1).setScale(.06);
      this.isSelected= true;
    }
  };

  renderBackground (){
    if (this.stageImage.visible == true){
      this.stageImage.setVisible(false);
    }else{
      this.stageImage.setVisible(true);
    }
  };

  renderStage(){
    this.renderButton();
    this.renderBackground();
  }
}
