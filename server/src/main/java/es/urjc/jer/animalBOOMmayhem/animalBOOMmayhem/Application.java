package es.urjc.jer.animalBOOMmayhem.animalBOOMmayhem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.tiles2.SpringWildcardServletTilesApplicationContext;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import websockethandlers.IngameHandler;
import websockethandlers.LobbyHandler;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	private LobbyHandler lobbyHandler;
	private IngameHandler ingameHandler;
	
	//Inicializar "canales" de comunicación
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		lobbyHandler = new LobbyHandler();
		ingameHandler = new IngameHandler();
		
		//Inicializar canal LOBBY
		registry.addHandler(createLobbyHandler(), "/lobby").setAllowedOrigins("*");
		
		//Inicializar canal INGAME
		registry.addHandler(createIngameHandler(), "/ingame").setAllowedOrigins("*");
		
		
		lobbyHandler.setIngameHandler(ingameHandler);
		ingameHandler.setLobbyHandler(lobbyHandler);
	}
	
	@Bean
	public LobbyHandler createLobbyHandler() {
		return lobbyHandler;
	}
	
	@Bean
	public IngameHandler createIngameHandler() {
		return ingameHandler;
	}
}
