class characterCard  extends Phaser.GameObjects.Sprite{
  constructor(sceneName, posX, posY, description,rep, rep_selected, posXD, posYD, dialogue_name){
    super (sceneName, posX, posY, 'null');

    this.scene = sceneName;
    this.posX = posX;
    this.posY = posY;
    this.description = description
    this.rep = rep;
    this.rep_selected = rep_selected;
    //this.dialogue = this.scene.add.image(config.width/30 +30, config.height/1.5, dialogue_name).setDepth(1);
    this.dialogue = this.scene.add.image(posXD, posYD, dialogue_name).setDepth(1).setScale(.16).setOrigin(0, 0).setVisible(false);

    this.isSelected = false;

    this.characterImage = this.scene.add.image(this.posX, this.posY, rep).setDepth(1).setScale(.20);



  };

  renderCard (){
    if (this.isSelected) {
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep).setDepth(1).setScale(.20);
      this.isSelected = false;
      this.renderDialogue();
    }else{
      this.characterImage = this.scene.add.image(this.posX, this.posY, this.rep_selected).setDepth(1).setScale(.20);
      this.isSelected= true;
      this.renderDialogue();
    }
  };

  renderDialogue (){
    if (this.dialogue.visible == true){
      this.dialogue.setVisible(false);
    }else{
      this.dialogue.setVisible(true);
    }
  };
}
