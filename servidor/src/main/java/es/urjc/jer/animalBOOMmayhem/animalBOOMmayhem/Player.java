package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

import org.springframework.stereotype.Component;

public class Player {
	
	
	private String name; // + nombre del jugador
	private int ID; //+ ID del jugador 
	private Vector2 position; //posicion del personaje
	private Vector2 direction; //direccion del perosnaje
	private int health; //vida del personaje
	private String character; //+ personaje 
	private int mode; //sprite del personaje
	private int ballType;//int para bola
	private boolean invulnerable;
	
	public Player () {}
	
	public Player (String name, int ID, Vector2 position, Vector2 direction, int health, String character, int mode) {
		this.name = name;
		this.ID = ID;
		this.position = position;
		this.direction = direction;
		this.health = health;
		this.character = character;
		this.mode = mode;
	}
	
	public Player (String name, int ID, Vector2 position, Vector2 direction, String character, int mode) {
		this.name = name;
		this.ID = ID;
		this.position = position;
		this.direction = direction;
		this.health = 3;
		this.character = character;
		this.mode = mode;
	}
	
	public Player (String name, int ID, Vector2 position, String character) {
		this.name = name;
		this.ID = ID;
		this.position = position;
		this.health = 3;
		this.character = character;
		this.mode = 0;
	}
	
	public Player (String name, int ID, String character) {
		this.name = name;
		this.ID = ID;
		this.health = 3;
		this.character = character;
		this.mode = 0;
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

	public Vector2 getPosition() {
		return position;
	}

	public void setPosition(Vector2 position) {
		this.position = position;
	}

	public Vector2 getDirection() {
		return direction;
	}

	public void setDirection(Vector2 direction) {
		this.direction = direction;
	}

	public int getHealth() {
		return health;
	}

	public void setHealth(int health) {
		this.health = health;
	}

	public String getCharacter() {
		return character;
	}

	public void setCharacter(String character) {
		this.character = character;
	}
	
	public int getMode() {
		return mode;
	}

	public void setMode(int mode) {
		this.mode = mode;
	}
	
	public void update (Vector2 position, Vector2 direction, int mode) {
		this.position = position;
		this.direction = direction;
		this.mode = mode;
	}
	
	
	
	
}
