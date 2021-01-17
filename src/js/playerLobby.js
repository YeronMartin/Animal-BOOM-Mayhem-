class playerLobby {
  constructor(sceneName, posX, posY, nickname, character, winnings, deaths, timesPerWeek){
    //super (sceneName, posX, posY, 'null');
    //Escena
    this.sceneName = sceneName;

    //Variables del jugador
    this.nickname = nickname;
    this.character = character;

    //Numbers
    this.winnings = winnings;
    this.deaths = deaths;
    this.timesPerWeek = timesPerWeek;

    //Icons
    this.winnings_icon = null;
    this.deaths_icon = null;
    this.timesPerWeek_icon = null;
    this.nickname_text

    //posiciones
    this.posX = posX;
    this.posY= posY;
    this.width = 275;
    this.height = 400;


    this.init(nickname, character, winnings, deaths, timesPerWeek);
  }

  init (nickname, character, winnings, deaths, timesPerWeek){
    this.winnings_icon = this.sceneName.add.image(this.posX + this.width/10, this.posY +
      this.height/1.08,"winnings").setDepth(2).setScale(.05);

    this.deaths_icon = this.sceneName.add.image(this.posX + this.width/2.3, this.posY +
      this.height/1.08, "deaths").setDepth(2).setScale(.05);

    this.timesPerWeek_icon = this.sceneName.add.image(this.posX + this.width/1.3, this.posY +
      this.height/1.08, "timesPerWeek").setDepth(2).setScale(.05);

    this.winnings = this.sceneName.add.text(this.posX + this.width/4, this.posY +
      this.height/1.04, this.winnings, {fill: '#000', font: "Arial", font: "30px"}).setOrigin(0.5, 0.5).setDepth(3);
    this.deaths = this.sceneName.add.text(this.posX + this.width/1.7, this.posY +
      this.height/1.04, this.deaths, {fill: '#000', font: "Arial", font: "30px"}).setOrigin(0.5, 0.5).setDepth(3);
    this.timesPerWeek = this.sceneName.add.text(this.posX + this.width/1.06, this.posY +
      this.height/1.04, this.timesPerWeek, {fill: '#000', font: "Arial", font: "30px"}).setOrigin(0.5, 0.5).setDepth(3);
    this.nickname_text = this.sceneName.add.text(this.posX + this.width/2, this.posY +
      this.height/1.27, this.nickname, {fill: '#000', font: "Arial", font: "30px"}).setOrigin(0.5, 0.5).setDepth(3);
    this.character = this.sceneName.add.image(this.posX + this.width/2, this.posY +
      this.height/2.6, this.character).setDepth(3).setScale(0.2);
  }

  destroy(){
    this.nickname_text.destroy();
    this.character.destroy();
    this.winnings_icon.destroy();
    this.deaths_icon.destroy();
    this.timesPerWeek_icon.destroy();
    this.winnings.destroy();
    this.deaths.destroy();
    this.timesPerWeek.destroy();

  };

  show(){
    this.nickname_text.setVisible(true);
    this.character.setVisible(true);
    this.winnings_icon.setVisible(true);
    this.deaths_icon.setVisible(true);
    this.timesPerWeek_icon.setVisible(true);
    this.winnings.setVisible(true);
    this.deaths.setVisible(true);
    this.timesPerWeek.setVisible(true);

  };

  hide(){
    this.nickname_text.setVisible(false);
    this.character.setVisible(false);
    this.winnings_icon.setVisible(false);
    this.deaths_icon.setVisible(false);
    this.timesPerWeek_icon.setVisible(false);
    this.winnings.setVisible(false);
    this.deaths.setVisible(false);
    this.timesPerWeek.setVisible(false);
  };

  move(posX, posY){

    this.posX = posX;
    this.posY = posY;

    this.winnings_icon.setX (this.posX + this.width/20);
    this.winnings_icon.setY(this.posY + this.height/1.12);

    this.deaths_icon.setX (this.posX + this.width/2.8);
    this.deaths_icon.setY (this.posY +this.height/1.12);

    this.timesPerWeek_icon.setX (this.posX + this.width/1.5);
    this.timesPerWeek_icon.setY(this.posY + this.height/1.12);

    this.winnings.setX (this.posX + this.width/4);
    this.winnings.setY ( this.posY + this.height/1.04);

    this.deaths.setX (this.posX + this.width/1.8);
    this.deaths.setY ( this.posY + this.height/1.04);

    this.timesPerWeek.setX (this.posX + this.width/1.16);
    this.timesPerWeek.setY ( this.posY + this.height/1.04);

    this.nickname_text.setX (this.posX + this.width/2);
    this.nickname_text.setY ( this.posY + this.height/1.27);

    this.character.setX (this.posX + this.width/2);
    this.character.setY ( this.posY + this.height/2.6);

  };
};
