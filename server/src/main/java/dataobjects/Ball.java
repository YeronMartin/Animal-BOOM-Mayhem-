package dataobjects;

public class Ball {
	
	private int ID; 
	private Vector2 position;
	private Vector2 direction;
	private int type;
	
	public Ball () {}
	
	public Ball (int ID, Vector2 position, Vector2 direction, int type) {
		this.ID = ID;
		this.position = position;
		this.direction = direction;
		this.type = type;
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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	
	
}
