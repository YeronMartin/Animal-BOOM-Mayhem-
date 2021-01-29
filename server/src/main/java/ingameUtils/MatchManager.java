package ingameUtils;


import java.io.IOException;
import java.util.ArrayList;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import dataobjects.Ball;
import dataobjects.PlayerIngameData;
import dataobjects.PlayerLobby;
import dataobjects.Vector2;
import websockethandlers.IngameHandler;

public class MatchManager {

	private IngameHandler handler;
	private ArrayList<PlayerIngameData> players;
	private ArrayList<Ball> balls;
	//private ArrayList<Effects> effects;
	
	private ObjectMapper mapper = new ObjectMapper();
	private int players_prepared;
	
	
	private float screen_width;
	private float screen_height;
	
	private int ballLimit;
	
	public MatchManager(IngameHandler handler) {
		this.handler = handler;
		
		players = new ArrayList<PlayerIngameData>();
		balls = new ArrayList<Ball>();
		
		screen_width = 1024;
		screen_height = 768;
		ballLimit = 10;
	}
	
	// ==========================================
	//	PREPARACIÓN DE LA PARTIDA
	// ==========================================
	
	public void setupGame(ArrayList<PlayerLobby> playersL) {
		for(int i = 0; i < playersL.size(); i++) {
			PlayerIngameData p = new PlayerIngameData();
			
			p.setID(playersL.get(i).getID());
			p.setCharacter(playersL.get(i).getCharacter());
			p.setName(playersL.get(i).getName());
			
			players.add(p);
			
			players_prepared = 0;
		}
		
		positionPlayers();
		generateInitialBalls();
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
			if(balls.size() < ballLimit)
				generateNewBall();
		}
	}
	
	private void generateNewBall() {
		Ball b = new Ball();
		b.setID(balls.size());
		
		float posX = getRandomNumberBetween(0, screen_width);
		float posY = getRandomNumberBetween(0, screen_height);
		
		b.setPosition(new Vector2(posX, posY));
		
		float type = getRandomNumberBetween(0, 10);
		
		if(type > 8) {
			b.setType(0);	//Basketball
		}else if(type > 6) {
			b.setType(2);	//Potato
		}else {
			b.setType(1);	//Bomb
		}
		
		balls.add(b);
	}
	
	public void joinPlayerToMatch(WebSocketSession session, JsonNode data) {
		//Se ha unido un jugador, hay que identificar quien es de los que tenemos registrados del lobby
		int index = findPlayerIndexById(data.get("id").asInt());
		if(index > -1) {
			System.out.println("Jugador "+players.get(index).getName() +" se ha unido");
			players.get(index).setSession(session);
			players_prepared++;
			checkIfAllPlayersAreReady();
		}
	}
	
	public void playerDisconected(WebSocketSession session) {
		PlayerIngameData p = getPlayerBySession(session);
		
		if(p != null) {
			players.remove(p);
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
			handler.sendStartMatchMessage();
		}
	}
	
	private int findPlayerIndexById(int id) {
		for(int i = 0; i < players.size(); i++) {
			if(id == (players.get(i).getID())) 
				return i;
		}
		return -1;
	}
	
	public void updatePlayerData(JsonNode data) {
		int playerIndex = findPlayerIndexById(data.get("id").asInt());
		
		players.get(playerIndex).setPosition(new Vector2(data.get("posX").floatValue(), data.get("posY").floatValue()));
		players.get(playerIndex).setDirection(new Vector2(data.get("movX").floatValue(), data.get("movY").floatValue()));
	}
	
	// ==========================================
	//	UPDATES DE LA PARTIDA
	// ==========================================
	
	private float playerSpeed = 400;
	
	public void update(float delta) {
		//Probablemente haga falta hacer esto
		
		for(PlayerIngameData p: players) {
			float newX = p.getPosition().getX() + (p.getDirection().getX() * playerSpeed * delta);
			float newY = p.getPosition().getY() + (p.getDirection().getY() * playerSpeed * delta);
			
			p.setPosition(new Vector2(newX, newY));
		}
	}
	
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
		//handler. game over o algo
		int vivos = 0;
		int vida = 0;

		for(int i = 0; i<players.size();i++){
			vida = players.get(i).getHealth();
			if(vida > 0){
				vivos = vivos + 1;
			}
		}

		if(vivos == 1){
			ObjectNode msgFinish = mapper.createObjectNode();
			msgFinish.put("type","GAMEOVER");
			//sendMessageToAllPlayersInGame(msgFinish);
		}
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
	
}
