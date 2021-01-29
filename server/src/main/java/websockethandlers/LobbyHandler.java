package websockethandlers;

import java.awt.event.ActionEvent;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import dataobjects.PlayerLobby;

@SpringBootApplication
@EnableWebSocket
public class LobbyHandler extends TextWebSocketHandler {
	
	//Mapa de jugadores almacenados
	private Map<String, PlayerLobby> stored_players = new HashMap<>();
	
	//Mapa de sesiones  activas (clientes conectados)
	private Map<String, WebSocketSession> active_player_sessions = new ConcurrentHashMap<>();
	
	//Mapa de jugadores activos en el lobby
	private ArrayList<PlayerLobby> lobby_players = new ArrayList<PlayerLobby>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private IngameHandler ingameHandler;
	
	public LobbyHandler(IngameHandler ingameHandler) {
		this.ingameHandler = ingameHandler;
		
		loadStoredPlayers();
		
		Timer startMatchTimer = new Timer();
		startMatchTimer.schedule(readyToStart, 0, 3000);
	}
	
	private void loadStoredPlayers() {
		System.out.println("CARGANDO FICHERO DE JUGADORES");
		
		try {
			FileReader file = new FileReader("PlayersFile.txt", StandardCharsets.UTF_8);
			BufferedReader br = new BufferedReader (file);
			
			int length = Integer.parseInt(br.readLine());
			
			for (int i = 0; i < length; i ++) {
				PlayerLobby p =  new PlayerLobby();
				p.setID(Integer.parseInt(br.readLine()));
				p.setName(br.readLine());
				p.setCharacter(br.readLine());
				p.setWinnings(Integer.parseInt(br.readLine()));
				p.setTimesPerWeek(Integer.parseInt(br.readLine()));
				p.setDeaths(Integer.parseInt(br.readLine()));
				
				this.stored_players.put(p.getName(), p);
			}
			
			br.close();
			System.out.println("JUGADORES CARGADOS");
			
		}catch (Exception ex){
			System.out.println("Error al intentar leer el archivo de Jugadores: " + ex.getMessage());
		}
	}
	
	private boolean started = false;
	
	 TimerTask readyToStart = new TimerTask()  {
	      public void run(ActionEvent evt) {
	    	 
	      }

		@Override
		public void run() {
			if(lobby_players.size() > 1 && !started) {
				startMatchPreparations();
				started = true;
			}
			
		}
	  };
	
	//==========================================================
	//	CONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Nueva conexión: " + session.getId());
		active_player_sessions.put(session.getId(), session);
		
	}
	
	//==========================================================
	//	DESCONEXIÓN DE CLIENTE
	//==========================================================
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Conexión cerrada: " + session.getId());
		active_player_sessions.remove(session.getId());
		
		removePlayerFromLobby(session);
	}
	
	private void removePlayerFromLobby(WebSocketSession session) {
		PlayerLobby p = searchPlayerBySessionId(session);
		if(p != null) {
			lobby_players.remove(p);
			sendLobbyDataToAllPlayers();
		}
	}
	
	private PlayerLobby searchPlayerBySessionId(WebSocketSession s) {
		for(int i = 0; i < lobby_players.size(); i++) {
			if(lobby_players.get(i).getSession().getId().equals(s.getId())) {
				return lobby_players.get(i);
			}
		}
		
		return null;
	}
	
	//==========================================================
	//	RECIBIR MENSAJE
	//==========================================================

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Mensaje recibido: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		String name = node.get("name").asText();
		String character = node.get("character").asText();	
				
		
		addPlayerToLobby(session, name, character);
		sendLobbyDataToAllPlayers();
	}
	
	private void addPlayerToLobby(WebSocketSession s, String name, String character) {
		PlayerLobby p;
		//Comprobar si el jugador ya se encontraba registrado
		if(stored_players.containsKey(name)) {
			p = stored_players.get(name);
			p.setSession(s);
		}else {
			p = new PlayerLobby(s, stored_players.size(), name, character);
			System.out.println("Nuevo jugador registrado: "+p.getName()+" con id "+p.getID());
			stored_players.put(p.getName(),p);
		}
		
		lobby_players.add(p);
	}
	
	//==========================================================
	//	ENVIAR MENSAJE
	//==========================================================
		
	
	private void sendLobbyDataToAllPlayers(){
		//Empaquetar nuevo mensaje (información actualizada lobby)
		ObjectNode nodo = mapper.createObjectNode();
				
		nodo.put("type", "UPDATE_LOBBY");

        ArrayNode nodoLista = nodo.putArray("players");

        for(int i = 0; i < lobby_players.size(); i++) {
            ObjectNode n = mapper.createObjectNode();

            //n.put("session", lobby_players.get(i).getSession().getId());
    		n.put("id", lobby_players.get(i).getID());
    		n.put("name", lobby_players.get(i).getName());
    		n.put("character", lobby_players.get(i).getCharacter());
    		n.put("victories", lobby_players.get(i).getWinnings());
    		n.put("eliminations", lobby_players.get(i).getDeaths());
    		n.put("times_played", lobby_players.get(i).getTimesPerWeek());

            nodoLista.add(n);
        }

        nodo.put("players", nodoLista);
		
			
		//Enviar mensaje a todos los usuarios
        System.out.println(nodo.toString());

		sendMessageToAllPlayersInLobby(nodo);
	}

	private void sendMessageToAllPlayersInLobby(JsonNode msg) {
		try {
			for(PlayerLobby p : lobby_players) {
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
					System.out.println("Mensaje enviado: " + msg.toString());
				}
			}
		} catch (IOException e) {
			System.out.println("Error al enviar estado del lobby");
			e.printStackTrace();
		}
	}
	
	//==========================================================
	//	PREPARACIÓN DE LA PARTIDA
	//==========================================================
	
	//En algún momento habrá que empezar la partida
	private void startMatchPreparations() {
		//Tenemos que enviar al manejador de la partida los jugadores
		//que van a participar.
		
		
		//IngameHandler manejadorPartida = new IngameHandler();
		//manejadorPartida.setupNewMatch(lobby_players);
		
		this.ingameHandler.setupNewMatch(lobby_players);
		
		
		//Finalmente enviamos a todos los jugadores el aviso de que
		//ya va a empezar la partida
		
		
		sendStartSignalToAllPlayers();
	}

	private void sendStartSignalToAllPlayers() {
		ObjectNode msgStart = mapper.createObjectNode();
		msgStart.put("type", "START");
					
		sendMessageToAllPlayersInLobby(msgStart);
		
		//Una vez comienza la partida, eliminamos los jugadores del lobby
		lobby_players.clear();
		started = false;
		System.out.println("Lobby limpiado");
	}

}