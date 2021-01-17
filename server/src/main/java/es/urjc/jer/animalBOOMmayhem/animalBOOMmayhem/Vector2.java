package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

public class Vector2 {
	private float x;
	private float y;
	
	public Vector2(){}
	
	public Vector2 (float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	public Vector2 (float x) {
		this.x = x;
		this.y = x;
	}

	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}
	
	public Vector2 get() {
		return this;
	}
	public void set (float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	public double distance (Vector2 v) {
		return Math.sqrt(this.x * v.x  + this.y * v.y);
	}
	
	public  void normalice () {
		double length = Math.sqrt(this.x*this.x + this.y*this.y); 

	    if (length != 0.0) {
	        float f = 1.0f / (float)length;
	        this.x = this.x*f;
	        this.y = this.y*f;
	    }
	}
	
	
}
