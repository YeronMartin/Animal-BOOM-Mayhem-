package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

import org.springframework.stereotype.Component;

public class Player2 {	
	private String name; // + nombre del jugador
	private int ID; //+ ID del jugador 
	private String character; //+ personaje 
	private int timesPerWeek;
	private int winnings;
	private int deaths;
	private long lastRequest;

	public Player2 () {}
	
	public Player2 (String name, int ID,  String character, int timesPerWeek, int winnings, int deaths) {
		this.name = name;
		this.ID = ID;
		this.character = character;
		this.timesPerWeek = timesPerWeek;
		this.winnings = winnings;
		this.deaths = deaths;
		this.lastRequest = System.currentTimeMillis();
	}

	public long getLastRequest() {
		return lastRequest;
	}

	public void setLastRequest(long lastRequest) {
		this.lastRequest = lastRequest;
	}
	
	public void time () {
		this.lastRequest = System.currentTimeMillis();
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
		ID = iD;
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
		return deaths;
	}

	public void setDeaths(int deaths) {
		this.deaths = deaths;
	}
	
	public void updateData(int winnigs, int deaths, int timesPerWeek) {
		this.winnings = winnings;
		this.deaths = deaths;
		this.timesPerWeek = timesPerWeek;
	}
	
}
