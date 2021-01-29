package websockethandlers;

import java.awt.event.ActionEvent;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import dataobjects.Ball;
import dataobjects.PlayerIngameData;
import dataobjects.PlayerLobby;
import ingameUtils.MatchManager;

public class IngameHandler  extends TextWebSocketHandler {
	
	//Mapa de sesiones  activas (clientes conectados)
	private Map<String, WebSocketSession> active_player_sessions = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private MatchManager match_manager;
	
	public IngameHandler() {
		
	}
	
	//==========================================================
	//	PREPARACIÓN DE UNA NUEVA PARTIDA
	//==========================================================
	
	public void setupNewMatch(ArrayList<PlayerLobby> players) {
		match_manager = new MatchManager(this);
		match_manager.setupGame(players);
		
		//Ahora faltaría esperar a que los jugadores se conecten aquí.
	}
	
	//==========================================================
	//	CONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Nueva conexión ingame: " + session.getId());
		active_player_sessions.put(session.getId(), session);
	}
	
	//==========================================================
	//	DESCONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Conexión cerrada ingame: " + session.getId());
		active_player_sessions.remove(session.getId());
		
		match_manager.playerDisconected(session);
		//A ver que hacemos cuando un jugador se ha desconectado...
	}
	
	//==========================================================
	//	RECIBIR MENSAJE
	//==========================================================

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode data = mapper.readTree(message.getPayload());
		
		//Decidimos que hacer en base a la etiqueta TYPE del mensaje:
		switch(data.get("type").asText()) {
			case "LOADED":
				addPlayerToMatch(session, data);
				break;
			case "UPDATE_PLAYER_STATUS":
				updatePlayerStatus(data);
				break;
			case "ENTER_CROUCH_MODE":
				notifyPlayersOfCrouchMode(session, data);
				break;
			case "EXIT_CROUCH_MODE":
				notifyPlayersOfCrouchMode(session, data);
				break;
			case "BALL_PICKUP":
				this.notifyPlayersOfBallPickup(session, data);
				break;
	        case "BALL_THROW":
	            this.notifyPlayersOfBallThrow(session, data);
	            break;
	        case "ENTER_HURT_STATE":

	            break;
	        case "ENTER_ELIMINATED_STATE":

	            break;
		}
	}
	
	private void addPlayerToMatch(WebSocketSession session, JsonNode data) {
		//Habría que ver a qué partida pertenece este jugador. En este caso donde solo tenemos una partida activa, no hace falta.
		System.out.println("Jugador añadido a la partida");
		match_manager.joinPlayerToMatch(session, data);
	}
	
	private void updatePlayerStatus(JsonNode data) {
		//Hemos recibido los datos de un jugador, hay que almacenarlos
		match_manager.updatePlayerData(data);
	}
	
	private void notifyPlayersOfCrouchMode(WebSocketSession session, JsonNode data) {
		match_manager.playerHasEnteredCrouchMode(data);
		
		sendMessageToAllPlayersInGameLessOne(data, session);
	}
	
	private void notifyPlayersOfBallPickup(WebSocketSession session, JsonNode data) {
		match_manager.playerPicksBall(data);
		
		sendMessageToAllPlayersInGameLessOne(data, session);
	}
	
	private void notifyPlayersOfBallThrow(WebSocketSession session, JsonNode data) {
		match_manager.playerThrowsBall(data);
		
		sendMessageToAllPlayersInGameLessOne(data, session);
	}
	
	//==========================================================
	//	ENVIAR MENSAJE
	//==========================================================
	
	public void sendStartMatchMessage() {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "READY");

		 ArrayNode nodoListaJugadores = nodo.putArray("players");

		 for(int i = 0; i < match_manager.getPlayers().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 PlayerIngameData p = match_manager.getPlayers().get(i);
			 
			 n.put("id", p.getID());
			 n.put("name", p.getName());
			 n.put("posX", p.getPosition().getX());
			 n.put("posY", p.getPosition().getY());

			 nodoListaJugadores.add(n);
		 }
		 
		 nodo.put("players", nodoListaJugadores);
		 
		 ArrayNode nodoListaBolas = nodo.putArray("balls");

		 for(int i = 0; i < match_manager.getBalls().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 Ball b = match_manager.getBalls().get(i);
			 
			 n.put("id", b.getID());
			 n.put("type", b.getType());
			 n.put("posX", b.getPosition().getX());
			 n.put("posY", b.getPosition().getY());

			 nodoListaBolas.add(n);
		 }
		 
		 nodo.put("balls", nodoListaBolas);
		 
		sendMessageToAllPlayersInGame(nodo);
		
		//La partida ha comenzado, inicializamos el timer de actualización
		Timer sendSavedStatusTimer = new Timer();
		sendSavedStatusTimer.schedule(sendCurrentStatusTimer, 0, 100);
	}
	
	TimerTask sendCurrentStatusTimer = new TimerTask()  {
	      public void run(ActionEvent evt) {
	    	 
	      }

		@Override
		public void run() {
			match_manager.update(0.04f);
			sendSavedStatusToAllPlayers();
		}
	  };
	
	private void sendSavedStatusToAllPlayers() {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "UPDATE_GAME_STATE");

		 //Empaquetamos el estado de los jugadores
		 ArrayNode nodoListaJugadores = nodo.putArray("players");
		 for(int i = 0; i < match_manager.getPlayers().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 PlayerIngameData p = match_manager.getPlayers().get(i);
			 
			 n.put("id", p.getID());
			 n.put("name", p.getName());
			 n.put("posX", p.getPosition().getX());
			 n.put("posY", p.getPosition().getY());
			 n.put("movX", p.getDirection().getX());
			 n.put("movY", p.getDirection().getY());
			 
			 nodoListaJugadores.add(n);
		 }
		 
		 nodo.put("players", nodoListaJugadores);
		 
		 //Empaquetamos el estado de las bolas
		 ArrayNode nodoListaBolas = nodo.putArray("balls");

		 for(int i = 0; i < match_manager.getBalls().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 Ball b = match_manager.getBalls().get(i);
			 
			 n.put("id", b.getID());
			 n.put("type", b.getType());
			 n.put("posX", b.getPosition().getX());
			 n.put("posY", b.getPosition().getY());

			 nodoListaBolas.add(n);
		 }
		 
		 nodo.put("balls", nodoListaBolas);
		
		 sendMessageToAllPlayersInGame(nodo);
	}
	
	private void sendMessageToAllPlayersInGame(JsonNode msg){
		for(PlayerIngameData p: match_manager.getPlayers()) {
			try {
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	private void sendMessageToAllPlayersInGameLessOne(JsonNode msg, WebSocketSession session){
		for(PlayerIngameData p: match_manager.getPlayers()) {
			try {
				if(p.getSession().equals(session))
					continue;
				
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
}


