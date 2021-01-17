package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

public class Effects {
	
	private int type;
	//Type 1 
	private Vector2 position;
	private float duration;
	private GameController controller;
	
	
	public Effects () {}
	
	public Effects (int type, Vector2 position, GameController controller) {
		this.type = type;
		this.position = position;
		switch (type) {
			case 0:
				this.duration = 500;
			break;
			case 1:
				this.duration = 2000;
			break;
			case 2:
				this.duration = 5000;
			break;
		}
		this.controller = controller;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Vector2 getPosition() {
		return position;
	}

	public void setPosition(Vector2 position) {
		this.position = position;
	}

	public float getDuration() {
		return duration;
	}

	public void setDuration(float duration) {
		this.duration = duration;
	}
	
	
	/*public void update(float elapsed) {
		this.duration -= elapsed;
		if(this.duration == 0) {
			this.controller.removeEffect(this);
		}
	}*/
	
}
