package dataobjects;

import java.util.ArrayList;

public class Room {
	private int roomId;
	private ArrayList<PlayerLobby> lobbyPlayers;
	private int maxPlayers;
	
	private boolean countDownStarted;
	private int countDownToStart;
	private boolean openToPlayers;
	
	public Room(int id) {
		this.roomId = id;
		this.lobbyPlayers = new ArrayList<PlayerLobby>();
		this.maxPlayers = 2;
		
		this.countDownStarted = false;
		this.countDownToStart = 10;
		this.openToPlayers = true;
	}
	
	public void addPlayerToRoom(PlayerLobby p) {
		if(!isPlayerAlreadyInRoom(p))
			lobbyPlayers.add(p);
	}
	
	public void removePlayerFromRoom(PlayerLobby p) {
		if(isPlayerAlreadyInRoom(p))
			lobbyPlayers.remove(p);
	}
	
	private boolean isPlayerAlreadyInRoom(PlayerLobby p) {
		for(PlayerLobby pl: lobbyPlayers) {
			if(pl.getID() == p.getID())
				return true;
		}
		
		return false;
	}
	
	public void clearRoom() {
		this.lobbyPlayers.clear();
		this.openToPlayers = true;
		this.countDownStarted = false;
		this.countDownToStart = 10;
	}
	
	public boolean isRoomAvailable() {
		return openToPlayers;
	}
	
	public boolean isRoomFull() {
		return (lobbyPlayers.size() >= this.maxPlayers);
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public ArrayList<PlayerLobby> getLobbyPlayers() {
		return lobbyPlayers;
	}

	public void setLobbyPlayers(ArrayList<PlayerLobby> lobbyPlayers) {
		this.lobbyPlayers = lobbyPlayers;
	}

	public int getMaxPlayers() {
		return maxPlayers;
	}

	public void setMaxPlayers(int maxPlayers) {
		this.maxPlayers = maxPlayers;
	}

	public boolean isCountDownStarted() {
		return countDownStarted;
	}

	public void setCountDownStarted(boolean countDownStarted) {
		this.countDownStarted = countDownStarted;
	}

	public int getCountDownToStart() {
		return countDownToStart;
	}

	public void setCountDownToStart(int countDownToStart) {
		this.countDownToStart = countDownToStart;
	}

	public boolean isOpenToPlayers() {
		return openToPlayers;
	}

	public void setOpenToPlayers(boolean openToPlayers) {
		this.openToPlayers = openToPlayers;
	}
	
	
}
