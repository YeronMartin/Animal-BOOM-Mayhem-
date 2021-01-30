package dataobjects;

import org.springframework.web.socket.WebSocketSession;

public class PlayerIngameData {
	private WebSocketSession session;
	private String name; // + nombre del jugador
	private int ID; //+ ID del jugador 
	private Vector2 position; //posicion del personaje
	private Vector2 direction; //direccion del perosnaje
	private int health; //vida del personaje
	private String character; //+ personaje 
	private int mode; //Estado del personaje: 0 idle, 1 crouch, 2 hurt
	private int ballType;//int para bola
	private boolean invulnerable;
	private boolean connected;
	
	public PlayerIngameData () {
		this.ID = -1;
		this.name = "";
		this.direction = new Vector2(0,0);
		this.health = 3;
		
		this.connected = false;
	}

	public boolean isConnected() {
		return connected;
	}

	public void setConnected(boolean connected) {
		this.connected = connected;
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
