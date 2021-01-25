package websockethandlers;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import dataobjects.PlayerIngameData;
import dataobjects.PlayerLobby;
import ingameUtils.MatchManager;

public class IngameHandler  extends TextWebSocketHandler {

	/*
	 * Muy parecido al LobbyHandler pero aquí solo gestionamos
	 * cosas de las partidas
	 */
	
	//Mapa de sesiones  activas (clientes conectados)
	private Map<String, WebSocketSession> active_player_sessions = new ConcurrentHashMap<>();
		
	//Mapa de jugadores activos en la/las partidas
	private ArrayList<PlayerIngameData> ingame_players = new ArrayList<PlayerIngameData>();
	
	
	private MatchManager match_manager;
	
	public IngameHandler() {
		
	}
	
	//==========================================================
	//	PREPARACIÓN DE UNA NUEVA PARTIDA
	//==========================================================
	
	public void setupNewMatch(ArrayList<PlayerLobby> players) {
		match_manager = new MatchManager(this);
		
		match_manager.setupGame(players);
		
		//Ahora faltaría esperar a que los jugadores se conecten aquí
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
		
		//A ver que hacemos cuando un jugador se ha desconectado...
	}
	
	//==========================================================
	//	RECIBIR MENSAJE
	//==========================================================

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		/*
		 * En este caso podemos recibir muchos tipos de mensaje, sabemos el contenido y función del mensaje
		 * mediante su primera etiqueta "type"
		 */

		
		//TRATAR EL MENSAJE
		
	}
	
	
	//==========================================================
	//	ENVIAR MENSAJE
	//==========================================================
	
	// Cada X tiempo mandar a todos los jugadores el estado almacenado del juego.
	
}
