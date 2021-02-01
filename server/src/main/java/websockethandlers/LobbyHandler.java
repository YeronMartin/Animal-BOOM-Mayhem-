package websockethandlers;

import java.awt.event.ActionEvent;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import dataobjects.PlayerLobby;
import dataobjects.Room;

@SpringBootApplication
@EnableWebSocket
public class LobbyHandler extends TextWebSocketHandler {
	
	//Mapa de jugadores almacenados
	private Map<String, PlayerLobby> stored_players = new HashMap<>();
	
	//Mapa de sesiones  activas (clientes conectados)
	private Map<String, WebSocketSession> active_player_sessions = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private IngameHandler ingameHandler;
	
	private ArrayList<Room> roomList;
	private int roomIdCount;
	
	public LobbyHandler() {
		loadStoredPlayers();
		
		//Montamos la lista de Rooms e inicializamos la primera sala
		roomList = new ArrayList<Room>();
		roomIdCount = 0;
		roomList.add(new Room(roomIdCount));
		
		Timer startMatchTimer = new Timer();
		startMatchTimer.schedule(readyToStart, 0, 1000);
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
				//p.setCharacter(br.readLine());
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
	
	TimerTask readyToStart = new TimerTask() {
		public void run(ActionEvent evt) {

		}

		@Override
		public void run() {
			for(Room r: roomList){
				
				if(!r.isRoomAvailable())
					continue;
				
				if(r.getLobbyPlayers().size() > 1 && !r.isCountDownStarted()) {
					if(r.getCountDownToStart() > 0) {
						int timeLeft = r.getCountDownToStart();
						timeLeft--;
						System.out.println("Tic Tac "+timeLeft);
						r.setCountDownToStart(timeLeft);
						
						sendTimerValueToAllPlayersInRoom(r, r.getCountDownToStart());
					}else{
						startMatchPreparations(r);
						r.setCountDownStarted(true);
					}
				}
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
		
		removePlayerFromRoom(session);
	}
	
	private void removePlayerFromRoom(WebSocketSession session) {
		Room room = searchRoomOfPlayerBySession(session);
		
		if(room != null) {
			
			if(!room.isRoomAvailable()) {
				//Nada que temer, es que la partida ya ha empezado
				return;
			}
			
			PlayerLobby p = getPlayerFromRoomBySession(room , session);
			
			if(p != null) {
				//Eliminar al jugador de la room y notificar al resto de esa sala
				room.removePlayerFromRoom(p);
				sendLobbyDataToAllPlayersInRoom(room);
				
				System.out.println("Jugador "+p.getName()+" eliminado de la sala "+room.getRoomId());
				
				
				room.setCountDownToStart(10);
				room.setCountDownStarted(false);
			}
		}
	}
	
	private Room searchRoomOfPlayerBySession(WebSocketSession s) {
		for(Room r: roomList) {
			for(int i = 0; i < r.getLobbyPlayers().size(); i++) {
				if(r.getLobbyPlayers().get(i).getSession().getId().equals(s.getId())) {
					return r;
				}
			}
		}
		
		return null;
	}
	
	private PlayerLobby getPlayerFromRoomBySession(Room r, WebSocketSession s) {
		for(int i = 0; i < r.getLobbyPlayers().size(); i++) {
			if(r.getLobbyPlayers().get(i).getSession().getId().equals(s.getId())) {
				return r.getLobbyPlayers().get(i);
			}
		}
		
		return null;
	}
	
	//==========================================================
	//	RECIBIR MENSAJE
	//==========================================================

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		String name = node.get("name").asText();
		String character = node.get("character").asText();	
		
		addPlayerToLobby(session, name, character);
	}
	
	private boolean isPlayerNameAlreadyTaken(String name) {
		for(Room r: roomList) {
			for(PlayerLobby pl: r.getLobbyPlayers()) {
				if(pl.getName().equals(name)) 
					return true;
			}
		}
		
		return false;
	}
	
	private String setValidNameForUser(String name) {
		boolean valid = false;
		String newName = "";
		int numberOption = 0;
		
		while(!valid) {
			if(isPlayerNameAlreadyTaken(name+numberOption)) {
				numberOption++;
			}else {
				valid = true;
				newName = name + numberOption;
			}
		}
		
		System.out.println("Tu nuevo nombre es: "+newName);
		
		return newName;
	}
	
	private void addPlayerToLobby(WebSocketSession s, String name, String character) {
		PlayerLobby p;
		//Comprobar si el jugador ya se encontraba registrado
		if(stored_players.containsKey(name) && !isPlayerNameAlreadyTaken(name)) {
			p = stored_players.get(name);
			System.out.println("Mira quien ha vuelto: "+p.getName()+" con id "+p.getID());
			p.setSession(s);
		}else if(!isPlayerNameAlreadyTaken(name)){
			p = new PlayerLobby(s, stored_players.size(), name, character);
			System.out.println("Nuevo jugador registrado: "+p.getName()+" con id "+p.getID());
			stored_players.put(p.getName(),p);
		}else {
			name = setValidNameForUser(name);
			p = new PlayerLobby(s, stored_players.size(), name, character);
			System.out.println("Nombre no disponible, tu nuevo nombre será "+p.getName()+" con id "+p.getID());
			sendNewNameToPlayer(p);
		}
		
		//Hay que meter al jugador en una Room
		putPlayerInsideRoom(p);
	}
	
	private void putPlayerInsideRoom(PlayerLobby p) {
		Room r = getFirstAvailableRoom();
		
		if(r == null) {
			System.out.println("Todas las salas están llenas u ocupadas");
			roomIdCount++;
			r = new Room(roomIdCount);
			roomList.add(r);
		}else {
			System.out.println("Sala disponible: "+r.getRoomId());
		}
		
		r.addPlayerToRoom(p);
		sendLobbyDataToAllPlayersInRoom(r);
	}
	
	private Room getFirstAvailableRoom() {
		for(Room r: roomList) {
			if(!r.isRoomFull() && r.isRoomAvailable()) {
				return r;
			}
		}
		
		return null;
	}
	
	//==========================================================
	//	ENVIAR MENSAJE
	//==========================================================
	
	private void sendNewNameToPlayer(PlayerLobby p) {
		ObjectNode nodo = mapper.createObjectNode();
		
		nodo.put("type", "NEW_NAME");
		nodo.put("newName", p.getName());
		
		sendMessageToPlayer(p.getSession(), nodo);
	}
	
	private void sendLobbyDataToAllPlayersInRoom(Room r){
		//Empaquetar nuevo mensaje (información actualizada lobby)
		ObjectNode nodo = mapper.createObjectNode();
				
		nodo.put("type", "UPDATE_LOBBY");
		nodo.put("room", r.getRoomId());

        ArrayNode nodoLista = nodo.putArray("players");

        for(int i = 0; i < r.getLobbyPlayers().size(); i++) {
            ObjectNode n = mapper.createObjectNode();
            
    		n.put("id", r.getLobbyPlayers().get(i).getID());
    		n.put("name", r.getLobbyPlayers().get(i).getName());
    		n.put("character", r.getLobbyPlayers().get(i).getCharacter());
    		n.put("victories", r.getLobbyPlayers().get(i).getWinnings());
    		n.put("eliminations", r.getLobbyPlayers().get(i).getDeaths());
    		n.put("times_played", r.getLobbyPlayers().get(i).getTimesPerWeek());

            nodoLista.add(n);
        }

        nodo.put("players", nodoLista);

		sendMessageToAllPlayersInRoom(r, nodo);
	}
	
	private void sendTimerValueToAllPlayersInRoom(Room r, int time) {
		ObjectNode msgTime = mapper.createObjectNode();
		msgTime.put("type", "LOBBY_TIMER");
		msgTime.put("room", r.getRoomId());
		msgTime.put("time", time);
		
		sendMessageToAllPlayersInRoom(r, msgTime);
	}
	
	private void sendMessageToAllPlayersInRoom(Room r, JsonNode msg) {
		try {
			for(PlayerLobby p : r.getLobbyPlayers()) {
				synchronized(p.getSession()) {
					p.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			}
		} catch (IOException e) {
			System.out.println("Error al enviar estado del lobby");
			e.printStackTrace();
		}
	}
	
	private void sendMessageToPlayer(WebSocketSession session, JsonNode msg) {
		try {
			synchronized(session) {
				session.sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.out.println("Error al enviar estado del lobby");
			e.printStackTrace();
		}
	}
	
	//==========================================================
	//	PREPARACIÓN DE LA PARTIDA
	//==========================================================
	
	//Preparamos la partida de una room
	private void startMatchPreparations(Room r) {
		
		r.setOpenToPlayers(false);
		this.ingameHandler.setupNewMatch(r);

		sendStartSignalToAllPlayersOfRoom(r);
		
		System.out.println("COMIENZA LA PARTIDA");
	}

	private void sendStartSignalToAllPlayersOfRoom(Room r) {
		ObjectNode msgStart = mapper.createObjectNode();
		msgStart.put("type", "START");
					
		sendMessageToAllPlayersInRoom(r, msgStart);
	}
	
	//==========================================================
	//	POST PARTIDA
	//==========================================================
	
	public void updateSavedScoresOfPlayersInRoom(Room r) {
		//Reemplazamos las puntuaciones anteriores con las nuevas
		for(PlayerLobby p : r.getLobbyPlayers()) {
			stored_players.replace(p.getName(), p);
		}
		
		//Guardamos los datos en el archivo de texto
		saveAll();
	}
	
	public void saveAll() {
		FileWriter file;
		
		try {
			file = new FileWriter ("PlayersFile.txt", StandardCharsets.UTF_8);
			
			ArrayList<PlayerLobby>  playersList = new ArrayList<PlayerLobby>(this.stored_players.values());
			file.write(playersList.size() + "\n");
			for (int i = 0; i< playersList.size(); i++) {
				file.write(playersList.get(i).getID() + "\n");
				file.write(playersList.get(i).getName() + "\n");
				//file.write(playersList.get(i).getCharacter() + "\n");
				file.write(playersList.get(i).getTimesPerWeek() + "\n");
				file.write(playersList.get(i).getWinnings() + "\n");
				file.write(playersList.get(i).getDeaths() + "\n");
			}
			
			System.out.println("Fichero escrito");
			file.close();
		}catch (IOException e){
			System.out.println("Mensaje de excepcion: " + e.getMessage());
		}
	}
	
	
	
	public IngameHandler getIngameHandler() {
		return ingameHandler;
	}



	public void setIngameHandler(IngameHandler ingameHandler) {
		this.ingameHandler = ingameHandler;
	}

}