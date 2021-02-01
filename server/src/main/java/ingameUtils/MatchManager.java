package ingameUtils;


import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;

import dataobjects.Ball;
import dataobjects.PlayerIngameData;
import dataobjects.PlayerLobby;
import dataobjects.Room;
import dataobjects.Vector2;
import websockethandlers.IngameHandler;

public class MatchManager {

	private IngameHandler handler;
	private Room room;
	
	
	private ArrayList<PlayerIngameData> players;
	private ArrayList<Ball> balls;
	private int ballIdCounter;
	
	private int players_prepared;
	
	private float screen_width;
	private float screen_height;
	
	private int ballLimit;
	
	public boolean matchEnded;
	
	public MatchManager(IngameHandler handler) {
		this.handler = handler;
		
		players = new ArrayList<PlayerIngameData>();
		balls = new ArrayList<Ball>();
		
		screen_width = 1024;
		screen_height = 768;
		ballLimit = 10;
		
		ballIdCounter = 0;
		
		matchEnded = false;
	}
	
	// ==========================================
	//	PREPARACIÓN DE LA PARTIDA
	// ==========================================
	
	public void setupGame(Room r) {
		this.room = r;
		
		players.clear();
		balls.clear();
		
		System.out.println("La partida tiene a los siguientes jugadores:");
		
		for(int i = 0; i < r.getLobbyPlayers().size(); i++) {
			PlayerIngameData p = new PlayerIngameData();
			
			p.setID(r.getLobbyPlayers().get(i).getID());
			p.setCharacter(r.getLobbyPlayers().get(i).getCharacter());
			p.setName(r.getLobbyPlayers().get(i).getName());
			
			players.add(p);
			
			System.out.println(p.getName()+" con id "+p.getID());
		}
		
		players_prepared = 0;
		
		positionPlayers();
		generateInitialBalls();
		
		System.out.println("ESPERANDO JUGADORES DE LA SALA: "+room.getRoomId());
	}
	
	//Cálcula las posiciones iniciales de los jugadores de manera aleatoria.
	//Considera solo a dos jugadores. Esta nueva info se envía al cliente.
	private void positionPlayers() {
		for(PlayerIngameData p: players) {
			float posX = getRandomNumberBetween(0, screen_width);
			float posY = getRandomNumberBetween(0, screen_height);
			p.setPosition(new Vector2(posX, posY));
		}
	}
	
	private float getRandomNumberBetween(float min, float max) {
		return (float) (min + Math.random() * (max - min));
	}
	
	private void generateInitialBalls() {
		generateBallsByAmount(ballLimit);
	}
	
	private void generateBallsByAmount(int amount) {
		for(int i = 0; i < amount; i++) {
			if(balls.size() >= ballLimit)
				return;
			
			generateNewBall();
		}
	}
	
	private void generateNewBall() {
		Ball b = new Ball();
		b.setID(ballIdCounter);
		
		float posX = getRandomNumberBetween(0, screen_width);
		float posY = getRandomNumberBetween(0, screen_height);
		
		b.setPosition(new Vector2(posX, posY));
		
		float type = getRandomNumberBetween(0, 100);
		
		if(type > 90) {
			b.setType(4);	//BlackHole
		}else if(type > 80) {
			b.setType(3);	//Flaming
		}else if(type > 70){
			b.setType(0);	//Basketball
		}else if(type > 60) {
			b.setType(2);
		}else {
			b.setType(1);
		}
		
		
		/*
		if(type > 8) {
			b.setType(0);	//Basketball
		}else if(type > 6) {
			b.setType(2);	//Potato
		}else{
			b.setType(1);	//Bomb
		}*/
		
		balls.add(b);
		ballIdCounter++;
	}
	
	public void joinPlayerToMatch(WebSocketSession session, JsonNode data) {
		//Se ha unido un jugador, hay que identificar quien es de los que tenemos registrados del lobby
		int index = findPlayerIndexById(data.get("id").asInt());
		if(index > -1) {
			System.out.println("Jugador "+players.get(index).getName() +" se ha unido, le metemos la sesión "+session.getId());
			players.get(index).setSession(session);
			players.get(index).setConnected(true);
			players_prepared++;
			checkIfAllPlayersAreReady();
		}
	}
	
	public void playerDisconected(WebSocketSession session) {
		System.out.println("Este señor se ha pirado");
		
		PlayerIngameData p = getPlayerBySession(session);
		
		if(p != null) {
			//players.remove(p);
			p.setConnected(false);
		}
	}
	
	private PlayerIngameData getPlayerBySession(WebSocketSession session){
		for(int i = 0; i < players.size(); i++) {
			if(session.getId().equals(players.get(i).getSession().getId())) {
				return players.get(i);
			}
		}
		
		return null;
	}
	
	private void checkIfAllPlayersAreReady() {
		if(players_prepared == players.size()) {
			//Todo el mundo ha cargado
			System.out.println("Todos los jugadores se han conectado");
			handler.sendStartMatchMessageToMatch(this);
			
			startUpdateTimer();
		}
	}
	
	private void startUpdateTimer() {
		//La partida ha comenzado, inicializamos el timer de actualización
		Timer sendSavedStatusTimer = new Timer();
		sendSavedStatusTimer.schedule(sendCurrentStatusTimer, 0, 100);
	}
	
	TimerTask sendCurrentStatusTimer = new TimerTask()  {
	      public void run(ActionEvent evt) {
	    	 
	      }

		@Override
		public void run() {
			if(!matchEnded) {
				sendUpdate();
			}
		}
	  };
	
	public void sendUpdate() {
		update(0.04f);
		handler.sendSavedPlayerStatusOfMatchToAllItsPlayers(this);
		handler.sendSavedBallStatusOfMatchToAllItsPlayers(this);
	}
	
	  
	private int findPlayerIndexById(int id) {
		for(int i = 0; i < players.size(); i++) {
			if(id == (players.get(i).getID())) 
				return i;
		}
		return -1;
	}
	
	public void updatePlayerData(JsonNode data) {
		//System.out.println(data.get("id")+" nos envía su estado");
		
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		//System.out.println("Este señor es el jugador "+playerIndex);
		
		if(playerIndex > -1) {
			players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
			players.get(playerIndex).setDirection(new Vector2(data.get("movX").floatValue(), data.get("movY").floatValue()));
			
			//System.out.println("Está en "+data.get("posX")+", "+data.get("posY")+" y se mueve a "+data.get("movX")+", "+data.get("movY"));;
		}
	}
	
	// ==========================================
	//	UPDATES DE LA PARTIDA
	// ==========================================
	
	private float playerSpeed = 400;
	
	public void update(float delta) {
		
		for(PlayerIngameData p: players) {
			float newX = p.getPosition().getX() + (p.getDirection().getX() * playerSpeed * delta);
			float newY = p.getPosition().getY() + (p.getDirection().getY() * playerSpeed * delta);
			
			p.setPosition(new Vector2(newX, newY));
		}
		
		//Comprobar si hace falta generar una bola nueva.
		if(balls.size() < ballLimit)
			generateNewBall();
	}
	
	// ==========================================
	//	ENTRADA DE EVENTOS
	// ==========================================
	
	public void playerHasEnteredCrouchMode(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(0, 0));
	}
	
	public void playerPicksBall(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(0, 0));
	}
	
	public void playerThrowsBall(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(0, 0));
		
		int ballIndex = findBallIndexById(data.get("ballId").asInt());
		balls.get(ballIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		//balls.get(ballIndex).setDirection(new Vector2(data.get("dirX").floatValue(), data.get("dirY").floatValue()));
	}
	
	public void playerEnterAim(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(0, 0));
	}
	
	public void playerHurt(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		//System.out.println("Han dañado a "+playerIndex+", tenía "+players.get(playerIndex).getHealth());
		//System.out.println("Han dañado a "+playerIndex+", dicen que tiene ahora "+data.get("life"));
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(0, 0));
		
		players.get(playerIndex).setHealth(data.get("life").asInt());
		
		if(data.get("ballId").asInt() > -1) {
			int ballIndex = findBallIndexById(data.get("ballId").asInt());
			//System.out.println("bALL INDEX: "+ballIndex);
			if(ballIndex > -1) {
				balls.get(ballIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
			}	
		}
	}
	
	public void playerEliminated(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		if(playerIndex > -1) {
			players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
			players.get(playerIndex).setDirection(new Vector2(0, 0));
			
			players.get(playerIndex).setHealth(0);
			
			int killerId = data.get("killerId").asInt();
			
			if(killerId > -1) 
				increaseEliminationCountOfPlayer(killerId);
		}
	
		//COMPROBAR SI LA PARTIDA HA ACABADO
		startGameOver();
	}
	
	private void increaseEliminationCountOfPlayer(int id) {
		for(PlayerLobby pl: room.getLobbyPlayers()) {
			if(pl.getID() == id) {
				System.out.println("Este señor es un héroe: "+pl.getName());
				pl.addEliminations(1);
				return;
			}
		}
	}
	
	public void ballDeleted(JsonNode data) {
		System.out.println("Bola eliminada: "+data.get("id"));
		int ballIndex = findBallIndexById(data.get("id").asInt());
		
		if(ballIndex > -1) {
			balls.remove(ballIndex);
			System.out.println("Boloncio eliminado");
		}
	}
	
	private int findBallIndexById(int id) {
		for(int i = 0; i < balls.size(); i++) {
			if(id == (balls.get(i).getID())) 
				return i;
		}
		return -1;
	}
	
	// ==========================================
	//	FINALIZACIÓN DE LA PARTIDA
	// ==========================================
	
	//Comprueba cuántos jugadores quedan vivos y, si es solo uno, envía un mensaje de gameover.
	private void startGameOver() {
		int winnerId = getIdOfLastPLayerAlive();

		//Chapamos todo
		//balls.clear();
		//players.clear();
		
		if(winnerId > -1) {
			increaseScoreOfAllPlayers(winnerId);
			
			handler.sendGameOverState(this, winnerId);
			
			handler.getLobbyHandler().updateSavedScoresOfPlayersInRoom(room);
		}
	}
	
	private void increaseScoreOfAllPlayers(int winner) {
		for(PlayerLobby pl: room.getLobbyPlayers()) {
			pl.addTimesPlayed(1);
			
			if(pl.getID() == winner)
				pl.addVictory(1);
		}
	}
	
	private int getIdOfLastPLayerAlive(){
		int aliveCount = 0;
		int idOfLastPlayer = -1;
		
		System.out.println("Tenemos "+players.size()+" jugadores");
		
		for(int i = 0; i < players.size(); i++){
			System.out.println("Este jugador tiene de vida: "+players.get(i).getHealth());
			
			if(players.get(i).getHealth() > 0) {
				System.out.println("Este jugador sigue vivo "+players.get(i).getID());
				aliveCount++;
				idOfLastPlayer = players.get(i).getID();
			}
			
			if(aliveCount > 1)
				return -1;
		}
		
		System.out.println("El último que hemos visto vivo es "+idOfLastPlayer);
		
		return idOfLastPlayer;
	}
	
	public ArrayList<PlayerIngameData> getPlayers() {
		return players;
	}

	public ArrayList<Ball> getBalls() {
		return balls;
	}

	public void setBalls(ArrayList<Ball> balls) {
		this.balls = balls;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}
	
	
}
