package pruebas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class SocketApplication implements WebSocketConfigurer{

	
	public static void main(String[] args) {
		SpringApplication.run(SocketApplication.class, args);
	}

	//Inicializar "canal" de comunicación de chat
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createChatHandler(), "/chat").setAllowedOrigins("*");
	}
	
	@Bean
	public ChatHandler createChatHandler() {
		return new ChatHandler();
	}
}
