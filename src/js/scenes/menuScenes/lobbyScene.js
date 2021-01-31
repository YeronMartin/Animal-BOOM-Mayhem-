class lobbyScene extends Phaser.Scene {
  constructor() {
    super("lobbyScene");
    var timedEvent;
    var nomo;
    var playerMap;
    var timeOut;
    var timetoNext;
    var nextScene_timer;
    var show_timer;
    var player;
    var connection;
    var data;
  }

  init(data) {
    this.player = data.player;
    console.log(this.player);
  }

  preload() {
    this.load.image("stage_background", "././resources/img/sceneBackground/stage_background.png");
    this.load.image("rep_Juani_cursed", "././resources/img/Interfaces/characterRep/rep_Juani_cursed.png");
    this.load.image("rep_Juani", "././resources/img/Interfaces/characterRep/rep_Juani.png");
    this.load.image("deaths", "././resources/img/Interfaces/characterRep/deaths.png");
    this.load.image("timesPerWeek", "././resources/img/Interfaces/characterRep/timesPerWeek.png");
    this.load.image("winnings", "././resources/img/Interfaces/characterRep/winnings.png");
    this.load.image("play_button_selected", "././resources/img/Interfaces/buttons/play_button_selected.png");
  }

  create() {
    this.add.image(0, 0, "stage_background").setDepth(0).setOrigin(0, 0).setScale(1.3);

    this.statusText = this.add.text(config.width / 2, config.height / 10, 'ESPERANDO A OTROS JUGADORES', { fill: '#fff', font: "Arial", font: "40px" }).setDepth(1).setOrigin(0.5, 0.5);

    //Creacion del mapa de jugadores
    this.playerMap = new Map();

    this.setupConnection(this, this.player, this.playerMap, this.data);

    //Tiempo de espera y boton de jugar
    this.timeOut = 60;
    this.add.image(config.width - 150, config.height - 50, "play_button_selected").setScale(.15).setDepth(3);
    this.conected_players_text = this.add.text(20, config.height - 100, "Jugadores conectados: " + this.playerMap.size, { fill: '#fff', font: "Arial", font: "40px" }).setOrigin(0, 0);
    this.time_text = this.add.text(20, config.height - 50, "", { fill: '#fff', font: "Arial", font: "40px" }).setOrigin(0, 0);

    //Tecla ENTER
    this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.key_ESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.errorActive = false;
  };

  setupConnection(scene, player, playerMap, data) {
    this.connection = new WebSocket('ws://127.0.0.1:8080/lobby');

    this.connection.onopen = function (e) {
      console.log("Conexión realizada");
      scene.postPlayer(player);
    }

    this.connection.onerror = function (e) {
      console.log("WS error: " + e);
    }

    this.connection.onmessage = function (msg) {
      data = JSON.parse(msg.data);
      console.log("Mensaje.data: " + msg.type);

      scene.processMessage(scene, player, playerMap, data);
    }

    this.connection.onclose = function () {
      console.log("Closing socket");
    }
  }

  postPlayer(player) {
    var passInfo = '{"name" : ' + '"' + player.name + '", "character" : ' + '"' + player.character + '"' + "}'";
    this.connection.send(passInfo);
  }

  processMessage(scene, player, playerMap, data) {

    switch (data.type) {
      case "UPDATE_LOBBY":
        this.getPlayers(player, scene, playerMap, data);
        break;
      case "START":
        this.toNextScene();
        break;
        case "LOBBY_TIMER":
        this.updateTimeToStart(data);
        break;
    }
  }

  updateTimeToStart(data){
    this.time_text.text ="Tiempo restante: " +data.time;
  }

  playersList = [];

  getPlayers(player, scene, playerMap, data) {
    console.log(data.players);

    this.playersList = [];


    this.roomId = data.room;
    console.log("Por lo visto estoy en la room "+this.roomId);

    //Insertar los jugadores en un mapa
    var newMap = new Map();
    var x = 0;
    for (var i = 0; i < data.players.length; i++) {
      this.playersList[i] = data.players[i];

      if (data.players[i] != null) {
        if (!playerMap.has(data.players[i].name)) {
          var p = new playerLobby(scene, 50, 100, data.players[i].name, data.players[i].character, data.players[i].victories, data.players[i].eliminations, data.players[i].times_played);
          playerMap.set(data.players[i].name, p); 99
          playerMap.get(data.players[i].name).hide();
          console.log(playerMap);
        }
        newMap.set(data.players[i].name, 0);
      }
    }
    for (var i of playerMap.keys()) {
      if (!newMap.has(i)) {
        playerMap.get(i).destroy();
        playerMap.delete(i);
      }
    }
    scene.showPlayers(playerMap);
  };

  showPlayers() {
    this.playerMap.forEach((item, i) => {
      this.playerMap.get(i).hide();
    });

    this.conected_players_text.text = "Jugadores conectados: " + this.playerMap.size;

    if (this.playerMap.size != 0) {
      var lista = Array.from(this.playerMap.keys());

      if (lista.length - 1 >= 0) {
        this.playerMap.get(lista[lista.length - 1]).show();
        this.playerMap.get(lista[lista.length - 1]).move(50, 100);
      }
      if (lista.length - 2 >= 0) {
        this.playerMap.get(lista[lista.length - 2]).show();
        this.playerMap.get(lista[lista.length - 2]).move(400, 100);
      }
      if (lista.length - 3 >= 0) {
        this.playerMap.get(lista[lista.length - 3]).show();
        this.playerMap.get(lista[lista.length - 3]).move(750, 100);
      }
    }
  }

  toNextScene(){
    this.connection.close();



    //En playerMap tenemos un churro de jugadores con sus datos (id, name, personaje)

    //Tenemos que:
    //Identificarme a mí mismo, con mi id.
    //Obtener todos los datos y presentarselos a la siguiente escena.

    var myId = -1;

    var playersMsg = [];
    for(var i = 0; i < this.playersList.length; i++){
      var p = this.playersList[i];

      console.log("Jugador "+i);

      console.log("id: "+p.id);
      console.log("name "+p.name);
      console.log("character "+p.character);

      switch(p.character){
        case "rep_Juani": p.character = "juani"; break;
        case "rep_Juani_cursed": p.character = "juani_cursed";  break;
      }

      if(p.name == this.player.name){
        myId = p.id;
        console.log("Me he identificado");
      }

      var p_msg = { id: p.id, name: p.name, character: p.character};
      playersMsg[i] = p_msg;
    }

    this.scene.start("stadiumGame", { characters: ['juani', 'juani_cursed'], mode: 'online', room: this.roomId, id: myId, players : playersMsg});
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.key_ENTER)) {
      this.scene.start("loadingRenderScene");
    } else if (Phaser.Input.Keyboard.JustDown(this.key_ESCAPE)) {
      this.scene.start("mainMenuScene");
    }
  }

  countDown() {
    if (this.timeOut > 0) {
      this.timeOut--;
      this.time_text.setText("Tiempo restante: " + this.timeOut);
    } else {
      //this.scene.start("stadiumGame", { players: 2, characters: ['juani', 'juani_cursed'], mode: 'local' });
    }
  }

 
}