package dataobjects;

import org.springframework.web.socket.WebSocketSession;

public class PlayerLobby {
	
	private WebSocketSession session; //Conexión asociada
	private int ID; //+ ID del jugador 
	private String name; // + nombre del jugador
	private String character; //+ personaje 
	
	private int timesPerWeek;
	private int winnings;
	private int eliminations;

	public PlayerLobby () {}
	
	
	public PlayerLobby (WebSocketSession session, int ID, String name, String character) {
		this.session = session;
		this.ID = ID;
		this.name = name;
		this.character = character;
		this.timesPerWeek = 0;
		this.winnings = 0;
		this.eliminations = 0;
	}
	
	public PlayerLobby (WebSocketSession session, int ID, String name, String character, int timesPerWeek, int winnings, int eliminations) {
		this.session = session;
		this.ID = ID;
		this.name = name;
		this.character = character;
		this.timesPerWeek = timesPerWeek;
		this.winnings = winnings;
		this.eliminations = eliminations;
	}

	public void addEliminations(int amount) {
		this.eliminations += amount;
	}
	
	public void addVictory(int amount) {
		this.winnings += amount;
	}
	
	public void addTimesPlayed(int amount) {
		this.timesPerWeek += amount;
	}
	
	public WebSocketSession getSession() {
		return session;
	}

	public void setSession(WebSocketSession session) {
		this.session = session;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		this.ID = iD;
	}

	public String getCharacter() {
		return character;
	}

	public void setCharacter(String character) {
		this.character = character;
	}
	public int getTimesPerWeek() {
		return timesPerWeek;
	}

	public void setTimesPerWeek(int timesPerWeek) {
		this.timesPerWeek = timesPerWeek;
	}

	public int getWinnings() {
		return winnings;
	}

	public void setWinnings(int winnings) {
		this.winnings = winnings;
	}

	public int getDeaths() {
		return eliminations;
	}

	public void setDeaths(int deaths) {
		this.eliminations = deaths;
	}
	
	public void updateData(int winnings, int deaths, int timesPerWeek) {
		this.winnings = winnings;
		this.eliminations = deaths;
		this.timesPerWeek = timesPerWeek;
	}
}
