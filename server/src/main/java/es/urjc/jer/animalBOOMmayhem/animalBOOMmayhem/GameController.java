package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController

public class GameController {
	
	private Map <String, Player2>playersInGame =  new HashMap <> ();
	private Map <String, Player2>players =  new HashMap <> ();
	//Preguntar sobre borrar estas cosas y esperar a que se de el tema de los sockets
	
	//Para esta entrega: 
	//Tener el servidor listo para que se puedan conectar clientes y poder devolver listas de clientes
	//Hacer que el cliente pueda realizar peticiones
	//Intercambio de informacion entre ellos, nombre, numero de veces concetado... (nombre, numero de veces que ha jugado durante la semana
	// partidas ganadas, personaje)
	//Guardar toda esta infromacion en un txt para que el servidor la pueda leer.
	//(Mirar sobre lectura y escritura de ficheros en java)
	
	
	public GameController() throws IOException {
		
		Player2 player1  =  new Player2 ("paco", 1, "jauni", 8, 0, 2);
		Player2 player2  =  new Player2 ("almendro", 2, "gatoFinanzas", 5, 3, 23);
		Player2 player3  =  new Player2 ("laPili", 3, "juaniCursed", 1, 1, 8);
		this.playersInGame.put(player1.getName(), player1);
		this.playersInGame.put(player2.getName(), player2);
		this.playersInGame.put(player3.getName(), player3);
		
		loadAll();
		Timer timer_UpdatePlayers = new Timer();
		timer_UpdatePlayers.schedule(updatePlayers, 0 , 3000);
		Timer  timer_savePlayer= new Timer();
		timer_savePlayer.schedule(autoSave, 0, 6000);
		
	}
	
	@RequestMapping (value = "/players", method= RequestMethod.POST)
	public ResponseEntity <Boolean> AddPlayer (@RequestBody Player2 player){
		if(players.containsKey(player.getName())){
			player.updateData(players.get(player.getName()).getWinnings(),
					players.get(player.getName()).getDeaths(),
					players.get(player.getName()).getTimesPerWeek());
			//playersInGame.replace(player.getName(), player);
			
			playersInGame.put(player.getName(), player);
			
			System.out.println("Mira quien ha vuelto: "+player.getName());
		}else {
			playersInGame.put(player.getName(), player);
			
			System.out.println("Nuevo jugador: "+player);
		}
		return new  ResponseEntity <Boolean> (true, HttpStatus.CREATED);
	}
	
	@RequestMapping (value = "/players/{player}", method= RequestMethod.GET)
	public List <Player2> getPlayers(@PathVariable ("player") String player){
		if(this.playersInGame.containsKey(player)) {
			this.playersInGame.get(player).time();
		}

		return  new ArrayList <Player2> (this.playersInGame.values());
		
	}
	
	@RequestMapping (value = "/players", method= RequestMethod.GET)
	public List <Player2> getPlayers2(){
		
		return  new ArrayList <Player2> (this.playersInGame.values());
	}
	
	
	//SAVE
	
	public void saveAll() throws IOException {
		FileWriter file = new FileWriter ("PlayersFile.txt", StandardCharsets.UTF_8);
		//FileWriter file = new FileWriter ("/Users/yeron/Desktop/pruebaCliente/PlayersFile.txt");
		try {
			List  <Player2>  playersList = new ArrayList (this.players.values());
			file.write(playersList.size() + "\n");
			for (int i = 0; i< playersList.size(); i++) {
				file.write(playersList.get(i).getName() + "\n");
				file.write(playersList.get(i).getCharacter() + "\n");
				file.write(playersList.get(i).getTimesPerWeek() + "\n");
				file.write(playersList.get(i).getWinnings() + "\n");
				file.write(playersList.get(i).getDeaths() + "\n");
			}
			
			//System.out.println("Fichero escrito ");
			file.close();
		}catch (Exception ex){
			System.out.println("Mensaje de excepcion: " + ex.getMessage());
			
		}
	}
	
	public void savePlayer(Player2 player) {
		if(!players.containsKey(player.getName())) { //Si no ha sido nunca insertado lo añade
			players.put(player.getName(), player);
		}else {
			player.setTimesPerWeek(player.getTimesPerWeek() + 1 );
			players.replace(player.getName(), player); //Si ya existe entonces actualiza el nuevo valor
		}
	}
	
	
	//LOAD 
	
	private void loadAll() {
		try {
			FileReader file = new FileReader("PlayersFile.txt", StandardCharsets.UTF_8);
			BufferedReader br = new BufferedReader (file);
			String line;
			int length = Integer.parseInt(br.readLine());
			
			for (int i = 0; i <length; i ++) {
				Player2 p =  new Player2 ();
				p.setName(br.readLine());
				p.setCharacter(br.readLine());
				p.setTimesPerWeek(Integer.parseInt(br.readLine()));
				p.setWinnings(Integer.parseInt(br.readLine()));
				p.setDeaths(Integer.parseInt(br.readLine()));
				this.players.put(p.getName(), p);
			}
			//System.out.println("Archivo leido");
			
		}catch (Exception ex){
			System.out.println("Mensaje de excepcion: " + ex.getMessage());
			
		}
	}
	
	//TIMERS
	
	TimerTask updatePlayers = new TimerTask() {
	      public void run(ActionEvent evt) {
	    	 
	      }

		@Override
		public void run() {
			// TODO Auto-generated method stub
			 List  <Player2>  playersList = new ArrayList (playersInGame.values());
	    	  long time = System.currentTimeMillis();
	  		for (int i = 0; i < playersList.size(); i++) {
	  			if(time - playersList.get(i).getLastRequest()>=4000) {
	  				savePlayer (playersList.get(i));
	  				System.out.println("Se ha expulsado a "+playersList.get(i).getName());
	  				playersInGame.remove(playersList.get(i).getName());
	  			}
	  		} 
	  		//System.out.println("eliminado");
	  		
		}
	  };
	  
	  TimerTask autoSave = new TimerTask()  {
	      public void run(ActionEvent evt) {
	    	 
	      }

		@Override
		public void run() {
			// TODO Auto-generated method stub
			try {
				saveAll();
				//System.out.println("guardado");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	  };
}
