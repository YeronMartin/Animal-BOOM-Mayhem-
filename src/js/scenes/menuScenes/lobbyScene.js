class lobbyScene extends Phaser.Scene{
    constructor (){
        super("lobbyScene");
        var timedEvent;
        var nomo;
        var playerMap;
        var timeOut;
        var timetoNext;
        var nextScene_timer;
        var show_timer;
        var player;

    }

    init(data){
      this.player = data.player;
      console.log(this.player);
    }

    preload (){
      this.load.image("credits_background", "././resources/img/sceneBackground/credits_background.png");
      this.load.image("rep_Juani_cursed", "././resources/img/Interfaces/characterRep/rep_Juani_cursed.png");
      this.load.image("rep_Juani", "././resources/img/Interfaces/characterRep/rep_Juani.png");
      this.load.image("deaths", "././resources/img/Interfaces/characterRep/deaths.png");
      this.load.image("timesPerWeek", "././resources/img/Interfaces/characterRep/timesPerWeek.png");
      this.load.image("winnings", "././resources/img/Interfaces/characterRep/winnings.png");
      this.load.image("play_button_selected", "././resources/img/Interfaces/buttons/play_button_selected.png");
    }

    create(){
      //BACKGROUND
      this.add.image(0, 0, "credits_background").setDepth(0).setOrigin(0, 0).setScale(1.3);

      //this.player =  new serverPlayer ("paco", "rep_Juani");
      //Cosas que borrar en la edicion completa

      //Enviar al servidor un post con el jugador que se ha creado, envia 3
      //por si se ha producido algun fallo, y el servidor no ha podido escuchar el post
      //el servidor se encarga de guardar solamente una vez el jugador
      this.postPlayer(this.player);
      this.postPlayer(this.player);
      this.postPlayer(this.player);

      //Creacion del mapa de jugadores
      this.playerMap = new Map();

      //Tiempo y boton de jugar
      this.timeOut= 30;
      this.add.image(config.width/2, config.height/1.15, "play_button_selected").setScale(.15).setDepth(3);
      this.time_text = this.add.text(config.width/1.05, config.height/20, this.timeOut,  {fill: '#fff', font: "Arial", font: "40px"}).setOrigin(1, 0);

      //Creacion de eventos
      this.timedEvent = this.time.addEvent({ delay: 500, callback: this.getPlayers, args : [this.player, this, this.playerMap],  loop: true });
      this.nextScene_timer = this.time.addEvent({ delay: 1000, callback: this.countDown, callbackScope: this, loop: true });
      this.show_timer = this.time.addEvent({ delay: 2000, callback: this.showPlayers, callbackScope: this, loop: true });
      //Tecla ENTER
      this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    };

    update(){
      if(Phaser.Input.Keyboard.JustDown(this.key_ENTER)){
        this.scene.start("loadingRenderScene");
      }
    }

    getPlayers(player, scene, map){
      $(document).ready(function(){
        $.ajax({
        url: 'http://localhost:8080/players/'+ player.name,
        method: 'GET',
      }).done(function(data) {

        //Se obtienen los datos
        console.log (data);

        //Insertar los jugadores en un mapa
        var newMap =  new Map();
        for (var i = 0; i < data.length; i++) {
          if (data[i] != null) {
            if(!map.has(data[i].name)){
              var p = new playerLobby (scene, 50, 100, data[i].name, data[i].character, 0, 0, 0);
              map.set (data[i].name, p);
              map.get (data[i].name).hide();
            }
            newMap.set(data[i].name, 0);
          }
        }
        for (var i of map.keys()) {
          if(!newMap.has(i)){
            map.get(i).destroy();
            map.delete(i);
          }
        }
        });
      });
    };


    postPlayer(player){
      var d = '{"name" : ' + '"' + player.name +'", "character" : '+ '"' + player.character + '"' + "}'"
      //console.log("f  " +this.nomo);
      $(document).ready(function(){
        $.ajax({
        url: 'http://localhost:8080/players',
        method: 'POST',
        //data: '{"name" : "oooo3"}',
        data: d,
        contentType: "application/json; charset=utf-8"
        });
      })
    }

    countDown(){
      if(this.timeOut > 0){
        this.timeOut--;
        this.time_text.setText (this.timeOut);
      }else{
          this.scene.start("stadiumGame", {players: 2, characters: ['juani', 'juani_cursed'], mode: 'local'});
      }
    }

    showPlayers (){
      this.playerMap.forEach((item, i) => {
        this.playerMap.get(i).hide();
      });
      console.log (this.playerMap.size);
      if(this.playerMap.size != 0){
        var lista = Array.from(this.playerMap.keys());
        console.log(lista.length);
        if(lista.length-1 >=0){
          this.playerMap.get(lista[lista.length-1]).show();
          this.playerMap.get(lista[lista.length-1]).move(50, 100);
        }
        if(lista.length-2 >= 0){
          this.playerMap.get(lista[lista.length-2]).show();
          this.playerMap.get(lista[lista.length-2]).move(400, 100);
        }

        if(lista.length-3 >= 0){
          this.playerMap.get(lista[lista.length-3]).show();
          this.playerMap.get(lista[lista.length-3]).move(750, 100);
        }
      }
    }

}
