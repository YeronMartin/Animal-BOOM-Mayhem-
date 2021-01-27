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
    //BACKGROUND
    this.add.image(0, 0, "stage_background").setDepth(0).setOrigin(0, 0).setScale(1.3);

    this.statusText = this.add.text(config.width/2, config.height/10, 'ESPERANDO A OTROS JUGADORES', {fill: '#fff', font: "Arial", font: "40px"}).setDepth(1).setOrigin(0.5, 0.5);

    //Creacion del mapa de jugadores
    this.playerMap = new Map();
      
    //Enviar al servidor un post con el nuevo jugador que entra en la sala
    this.setupConnection(this, this.player, this.playerMap, this.data);
      
    //Tiempo de espera y boton de jugar
    this.timeOut = 60;
    this.add.image(config.width - 150, config.height - 50, "play_button_selected").setScale(.15).setDepth(3);
    this.conected_players_text = this.add.text(20, config.height - 100, "Jugadores conectados: "+this.playerMap.size, { fill: '#fff', font: "Arial", font: "40px" }).setOrigin(0, 0);
    this.time_text = this.add.text(20, config.height - 50, "Tiempo restante: "+this.timeOut, { fill: '#fff', font: "Arial", font: "40px" }).setOrigin(0, 0);

    //Creacion de eventos
    //this.timedEvent = this.time.addEvent({ delay: 500, callback: this.getPlayers, args : [this.player, this, this.playerMap, this.statusText],  loop: true });
    //this.nextScene_timer = this.time.addEvent({ delay: 1000, callback: this.countDown, callbackScope: this, loop: true });
    //this.show_timer = this.time.addEvent({ delay: 2000, callback: this.showPlayers, callbackScope: this, loop: true });
    
    //Tecla ENTER
    this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.key_ESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.errorActive = false;
  };

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.key_ENTER)) {
      this.scene.start("loadingRenderScene");
    } else if (Phaser.Input.Keyboard.JustDown(this.key_ESCAPE)) {
      this.scene.start("mainMenuScene");
    }
  }

getPlayers(player, scene, playerMap, data){
        
          
          
          console.log(data.players);
          console.log("Prueba 1: " +data.players[0].nick);
          console.log("Prueba 2: " +data.players.length);
          //Insertar los jugadores en un mapa
          var newMap = new Map();
          var x = 0;
          for (var i = 0; i < data.players.length; i++) {
            if (data.players[i] != null) {
              if (!playerMap.has(data.players[i].nick)) {
                var p = new playerLobby(scene, 50, 100, data.players[i].nick, data.players[i].character, data.players[i].victories, data.players[i].eliminations, data.players[i].times_played);
                playerMap.set(data.players[i].nick, p);99
                playerMap.get(data.players[i].nick).hide();
                console.log(playerMap);
              }
              newMap.set(data.players[i].nick, 0);
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

postPlayer(player, connection){
    var passInfo = '{"name" : ' + '"' + player.name + '", "character" : ' + '"' + player.character + '"' + "}'";
    connection.send(passInfo);

  }

  countDown() {
    if (this.timeOut > 0) {
      this.timeOut--;
      this.time_text.setText("Tiempo restante: "+this.timeOut);
    } else {
      this.scene.start("stadiumGame", { players: 2, characters: ['juani', 'juani_cursed'], mode: 'local' });
    }
  }

  showPlayers() {
      console.log("Estoy entrando en showPlayers");
      
      
    this.playerMap.forEach((item, i) => {
      this.playerMap.get(i).hide();
    });

    this.conected_players_text.text = "Jugadores conectados: "+this.playerMap.size;

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
    
processMessage(scene, player, playerMap, data){
    
    switch(data.type){
        case "UPDATE_LOBBY":
            this.getPlayers(player, scene, playerMap, data);
            break;
        case "START":
            this.connection.close();
            //Meter aquí supongo que para cambiar de escena todos a la vez
            break;
    }
        
}

setupConnection(scene, player, playerMap, data){
        var connection = new WebSocket('ws://127.0.0.1:8080/lobby');
    
        connection.onopen = function(e){
            console.log("Conexión realizada");
            scene.postPlayer(player, connection);
        }
        
        connection.onerror = function(e) {
            console.log("WS error: " + e);
        }

        connection.onmessage = function(msg) {
            data = JSON.parse(msg.data);
            console.log("Mensaje.data: " +msg.type);
            
            scene.processMessage(scene, player, playerMap, data);
            /*
            var message = JSON.parse(msg.data)
            $('#chat').val($('#chat').val() + "\n" + message.name + ": " + message.message);
            */ 
        }

        connection.onclose = function() {
            console.log("Closing socket");
        }

        
    }

}


