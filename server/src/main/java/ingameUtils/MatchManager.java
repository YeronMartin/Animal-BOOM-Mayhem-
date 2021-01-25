package ingameUtils;

import java.util.ArrayList;

import dataobjects.Ball;
import dataobjects.PlayerIngameData;
import dataobjects.PlayerLobby;
import websockethandlers.IngameHandler;

public class MatchManager {

	/*
	 * Clase encargada de montar y gestionar
	 * una partida en particular
	 */
	private IngameHandler handler;
	
	private ArrayList<PlayerIngameData> players;
	private ArrayList<Ball> balls;
	//private ArrayList<Effects> effects;
	
	private float screen_width;
	private float screen_height;
	
	private int ballLimit;
	
	public MatchManager(IngameHandler handler) {
		this.handler = handler;
		
		players = new ArrayList<PlayerIngameData>();
		balls = new ArrayList<Ball>();
		
		screen_width = 1024;
		screen_height = 768;
		ballLimit = 10;
		

	}
	
	// ==========================================
	//	PREPARACIÓN DE LA PARTIDA
	// ==========================================
	
	public void setupGame(ArrayList<PlayerLobby> players) {
		/*
		 * Generar los jugadores a partir de los del lobby
		 * 
		 * Colocarlos en el mapa
		 * 
		 * 
		 */
	}
	
	private void positionPlayers() {
		
	}
	
	private void generateInitialBalls() {
		
	}
	
	private void generateBallsByAmount(int amount) {
		
	}
	
	
	// ==========================================
	//	UPDATES DE LA PARTIDA
	// ==========================================
	
	private void update(float delta) {
		//Probablemente haga falta hacer esto
	}
	

	// ==========================================
	//	FINALIZACIÓN DE LA PARTIDA
	// ==========================================
	
	private void startGameOver() {
		//handler. game over o algo
	}
	
}
