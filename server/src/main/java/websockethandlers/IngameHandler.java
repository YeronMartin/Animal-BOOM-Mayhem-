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
import dataobjects.Room;
import ingameUtils.MatchManager;

public class IngameHandler  extends TextWebSocketHandler {
	
	//Mapa de sesiones  activas (clientes conectados)
	private Map<String, WebSocketSession> active_player_sessions = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	//Lista de partidas en curso
	private ArrayList<MatchManager> matchManagerList;
	//private MatchManager match_manager;
	
	private LobbyHandler lobbyHandler;
	
	//==========================================================
	//	PREPARACIÓN DE UNA NUEVA PARTIDA
	//==========================================================
	
	public IngameHandler() {
		matchManagerList = new ArrayList<MatchManager>();
	}
	
	
	public void setupNewMatch(Room r) {
		//Montamos una nueva partida a partir de los datos de la sala
		
		MatchManager newMatch = new MatchManager(this);
		newMatch.setupGame(r);
		
		matchManagerList.add(newMatch);
	}
	
	//==========================================================
	//	CONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Nueva conexión: " + session.getId());
		active_player_sessions.put(session.getId(), session);
		
		System.out.println("Tenemos "+active_player_sessions.size()+" sesiones guardadas");
	}
	
	//==========================================================
	//	DESCONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Conexión cerrada: " + session.getId());
		active_player_sessions.remove(session.getId());
		
		findPlayerBySessionAmongAllMatches(session);
		//Buscar al jugador dentro de las partidas activas y notificar de su desconexión
		
		System.out.println("Tenemos "+active_player_sessions.size()+" sesiones guardadas");
	}
	
	
	private void findPlayerBySessionAmongAllMatches(WebSocketSession session) {
		for(MatchManager m: matchManagerList) {
			for(PlayerIngameData p: m.getPlayers()) {
				if(p.getSession().getId().equals(session.getId())) {
					m.playerDisconected(session);
					return;
				}
			}
		}
	}
	
	//==========================================================
	//	RECIBIR MENSAJE
	//==========================================================

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		//System.out.println("He recibido un mensaje de "+session.getId());
		
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
				System.out.println("PICKUP");
				break;
	        case "BALL_THROW":
	        	System.out.println("THROW");
	            this.notifyPlayersOfBallThrow(session, data);
	            break;
	        case "ENTER_AIM_MODE":
	        	this.notifyPlayersOfAimMode(session, data);
	        	break;
	        case "ENTER_HURT_STATE":
				System.out.println("HURT");
	        	this.notifyPlayersOfHurtState(session, data);
	            break;
	        case "ENTER_ELIMINATED_STATE":
				System.out.println("ELIMINATED");
	        	this.notifyPlayersOfEliminatedState(session, data);
	            break;
	        case "BALL_DELETED":
				System.out.println("BOLON ELIMINADO");
	        	this.notifyPlayersOfBallDeleted(session, data);
	        	break;
		}
	}
	
	private void addPlayerToMatch(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) 
			m.joinPlayerToMatch(session, data);
		
	}
	
	private void updatePlayerStatus(JsonNode data) {
		//Hemos recibido los datos de un jugador, hay que almacenarlos
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) 
			m.updatePlayerData(data);
	}
	
	private void notifyPlayersOfCrouchMode(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerHasEnteredCrouchMode(data);
			sendMessageToAllPlayersInMatchLessOne(m, data, session);
		}
	}
	
	private void notifyPlayersOfBallPickup(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerPicksBall(data);
			sendMessageToAllPlayersInMatchLessOne(m, data, session);
		}
	}
	
	private void notifyPlayersOfBallThrow(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerThrowsBall(data);
			sendMessageToAllPlayersInMatchLessOne(m, data, session);
		}
	}
	
	private void notifyPlayersOfAimMode(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerEnterAim(data);
			sendMessageToAllPlayersInMatchLessOne(m, data, session);
		}
	}
	
	private void notifyPlayersOfHurtState(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerHurt(data);
			sendMessageToAllPlayersInMatchLessOne(m, data, session);
		}
	}
	
	private void notifyPlayersOfEliminatedState(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.playerEliminated(data);
			sendMessageToAllPlayersInMatch(m, data);
		}
	}
	
	private void notifyPlayersOfBallDeleted(WebSocketSession session, JsonNode data) {
		MatchManager m = getMatchManagerByRoomId(data.get("room").asInt());
		if(m != null) {
			m.ballDeleted(data);
			//sendMessageToAllPlayersInGameLessOne(m, data, session);
		}
		
	}
	
	//==========================================================
	//	ENVIAR MENSAJE
	//==========================================================
	
	public void sendStartMatchMessageToMatch(MatchManager m) {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "READY");

		 ArrayNode nodoListaJugadores = nodo.putArray("players");
		 
		 for(int i = 0; i < m.getPlayers().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 PlayerIngameData p = m.getPlayers().get(i);
			 
			 n.put("id", p.getID());
			 n.put("name", p.getName());
			 n.put("posX", p.getPosition().getX());
			 n.put("posY", p.getPosition().getY());

			 nodoListaJugadores.add(n);
		 }
		 
		 nodo.put("players", nodoListaJugadores);
		 
		 ArrayNode nodoListaBolas = nodo.putArray("balls");

		 for(int i = 0; i < m.getBalls().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 Ball b = m.getBalls().get(i);
			 
			 n.put("id", b.getID());
			 n.put("type", b.getType());
			 n.put("posX", b.getPosition().getX());
			 n.put("posY", b.getPosition().getY());

			 nodoListaBolas.add(n);
		 }
		 
		 nodo.put("balls", nodoListaBolas);
		 
		 sendMessageToAllPlayersInMatch(m, nodo);
	}
	
	public void sendSavedPlayerStatusOfMatchToAllItsPlayers(MatchManager m) {
		
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "UPDATE_PLAYERS_STATE");

		 //Empaquetamos el estado de los jugadores
		 ArrayNode nodoListaJugadores = nodo.putArray("players");
		 for(int i = 0; i < m.getPlayers().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 PlayerIngameData p = m.getPlayers().get(i);
			 
			 n.put("id", p.getID());
			 n.put("name", p.getName());
			 n.put("posX", p.getPosition().getX());
			 n.put("posY", p.getPosition().getY());
			 n.put("movX", p.getDirection().getX());
			 n.put("movY", p.getDirection().getY());
			 
			 nodoListaJugadores.add(n);
		 }
		 
		 nodo.put("players", nodoListaJugadores);
		
		 sendMessageToAllPlayersInMatch(m, nodo);
	}
	
	public  void sendSavedBallStatusOfMatchToAllItsPlayers(MatchManager m) {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "UPDATE_BALLS_STATE");
		
		//Empaquetamos el estado de las bolas
		 ArrayNode nodoListaBolas = nodo.putArray("balls");

		 for(int i = 0; i < m.getBalls().size(); i++) {
			 ObjectNode n = mapper.createObjectNode();
			 
			 Ball b = m.getBalls().get(i);
			 
			 n.put("id", b.getID());
			 n.put("type", b.getType());
			 n.put("posX", b.getPosition().getX());
			 n.put("posY", b.getPosition().getY());

			 nodoListaBolas.add(n);
		 }
		 
		 nodo.put("balls", nodoListaBolas);
		
		 sendMessageToAllPlayersInMatch(m, nodo);
	}
	
	public void sendGameOverState(MatchManager m, int winnerId) {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "GAME_OVER");
		nodo.put("id", winnerId);
		
		System.out.println("SACABO LA PARTIDA DE LA ROOM "+m.getRoom().getRoomId());
		sendMessageToAllPlayersInMatch(m, nodo);
	}
	
	private void sendMessageToAllPlayersInMatch(MatchManager m, JsonNode msg){
		for(PlayerIngameData p: m.getPlayers()) {
			
			if(!p.isConnected())
				continue;
			
			try {
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	private void sendMessageToAllPlayersInMatchLessOne(MatchManager m, JsonNode msg, WebSocketSession session){
		for(PlayerIngameData p: m.getPlayers()) {
			if(p.getSession().getId().equals(session.getId()) || !p.isConnected()) {
				continue;
			}
			
			try {
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	private MatchManager getMatchManagerByRoomId(int id) {
		for(MatchManager m: matchManagerList) {
			if(m.getRoom().getRoomId() == id)
				return m;
		}
		
		return null;
	}
	
	
	public LobbyHandler getLobbyHandler() {
		return lobbyHandler;
	}

	public void setLobbyHandler(LobbyHandler lobbyHandler) {
		this.lobbyHandler = lobbyHandler;
	}

	
}


