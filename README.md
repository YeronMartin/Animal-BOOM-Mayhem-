# Animal BOOM Mayhem

# Documento de diseño


```
19 de Octubre de 2020
Grupo 5:
Carlos del Águila Mateu
Jesús David Rojo Martín
María Busto Ramos
Yerón Martín Sánchez
```

```
Correo de la universidad:
c.delaguila.2018@alumnos.urjc.es
jd.rojo.2018@alumnos.urjc.es
m.busto.2018@alumnos.urjc.es
y.martin.2018@alumnos.urjc.es
```

```
Cuenta de github:
CDAM2020
jdrojo2018
mariabusto
YeronMartin
```

----
_Animal BOOM Mayhem_ es un juego competitivo en línea en el que cada jugador
toma el control de un animal que competirá en un torneo de balón prisionero para
hacerse con la “​ _corona explosiva_ ​”.

----

## ÍNDICE

1. Cambios  
  1.1 Segunda versión   
  1.2 Tercera versión  
  1.3 Cuarta versión
2. Introducción  
  2.1 Inspiración  
  2.2 Plataforma  
  2.3 Concepto del juego    
  2.4 Características principales  
  2.5 Género  
  2.6 Propósito y público objetivo  
  2.7 Jugabilidad  
  2.8 Estilo visual  
  2.9 Alcance
3. Mecánicas  
  3.1 Flujo de juego  
  3.2 Personajes     
    3.2.1. La Juani     
    3.2.2 Juani Cursed   
  3.3 Tipo de cámara     
  3.4 Controles  
  3.5 Colisiones  
  3.6 Reglas de interacciones  
  3.7 Niveles  
  3.8 Objetos lanzables  
  3.9 Progresión del jugador  
4. Interfaz  
  4.1. Primera versión        
    4.1.1 Diagrama de flujo      
    4.1.2. Menú principal   
    4.1.3. Créditos  
    4.1.4 Menú de ajustes  
    4.1.5 Modo de conexión  
    4.1.6 Modo de juego  
    4.1.7 Selección de personaje  
    4.1.8 Menú de opciones de partida  
    4.1.9 Selección de escenario  
    4.1.10 Tutorial  
    4.1.11 Pantalla de batalla  
    4.1.12 Ventana de victoria 
  4.2. Versión implementada      
    4.2.1 Diagrama de flujo  
    4.2.2. Menú principal   
    4.2.3. Créditos  
    4.2.4 Menú de ajustes  
    4.2.5 Modo de conexión  
    4.2.6 Modo de juego  
    4.2.7 Selección de personaje  
    4.2.8 Menú de opciones de partida  
    4.2.9 Selección de escenario  
    4.2.10 Tutorial  
    4.2.11 Pantalla de batalla       
    4.2.12 Ventana de victoria        
  4.3. Versión Actualizada con Spring         
    4.3.1 Pantalla de Carga          
    4.3.2 Introducir Nickname          
    4.3.3 Lobby         
5. Arte 2D   
  5.1 Personajes   
    5.1.1 Concept art   
    5.1.2 Animaciones     
  5.2 Escenarios    
  5.3 Props   
    5.3.1 Pelotas   
    5.3.2 Sprites de vida   
    5.3.3 Marcador   
  5.4 Interfaz 
6. Música y efectos de sonido   
7. Diagrama de clases y API REST   
8. Instrucciones precisas para ejecutar la aplicación    
9. Fase 4     
    9.1 WebSockets   
    9.2 Diagrama de clases (actualizado)
10. Mejoras    
    10.1 Personajes   
    10.2 Pelotas   
      10.2.1 Pelota de fuego   
      10.2.2 Agujero negro  
    10.3 Interfaz  
      10.3.1 Modo de juego     
      10.3.2 Créditos     
      10.3.3 Selección de personaje   
      10.3.4 PostGame   
11. Referencias
     

## 1. Cambios
​En este apartado se mostrarán las versiones del documento de diseño del juego.  

### 1.1 Segunda versión  
A día 15 de Diciembre de 2020 se han realizado cambios en el readme respecto a la integración de elementos que faltaban en la versión previa:

    ● Se ha incluido un apartado de inspiración y juegos de referencia.
    ● Se ha incluido un apartado sobre la plataforma del juego.
    ● Se ha mejorado la descripción del objetivo del juego en el apartado 2.3. Concepto del juego.
    ● Se ha actualizado la información de la bomba con temporizador en el apartado de 3.8. Objetos lanzables.
    ● Se ha mejorado la descripción de los personajes del juego en el apartado 3.2. Personajes.
    ● Se ha incluido un apartado de arte 2D.
    ● Se ha incluido un apartado de música y efectos de sonido.
    ● Se ha incluido un apartado de referencias.
    ● Integración del resultado de la implementación de los interfaces.

### 1.2 Tercera versión
A día 19 de Enero de 2021 se han realizado cambios en el readme respecto a la integración de elementos que faltaban en la versión previa:

    ● Se ha integrado tecnologías Spring para montar un servidor para el multijugador.
    ● Se ha integrado Jquery para la comunicación con el servior.
    ● Se ha añadido en el menú principal una manera de introducir el nickname para identificar al jugador.
    ● Se ha añadido un Lobby donde los jugadores esperan para poder comenzar la partida.
    ● Se ha añadido un sistema de mensajes para saber el estado del jugador o del servidor.
    ● Se ha añadido una escena de precarga de los elementos del juego junto con una barra de progreso.
    ● Se ha actualizado el apartado 4.Interfaz incluyendo una tercera versión con las nuevas pantallas incluidas en la fase 3.
    ● Se ha incluido un apartado de diagrama de clases.
    ● Se ha incluido un apartado con instrucciones para ejecutar la aplicación.
    
 ### 1.3 Cuarta versión
 A día 1 de Febrero de 2021 se han realizado cambios en el readme respecto a la integración de elementos que faltaban en la versión previa:
 
    ● Se ha adjuntado un vídeo indicando cómo usar el juego.
    ● Se ha incluido un apartado explicando las novedades incluidas en la fase 4.
    ● Se ha incluido un apartado explicando la conexión mediante WebSockets realizada.
    ● Se ha añadido el diagrama de clases actualizado incluyendo las nuevas clases implementadas para la fase 4.
    ● Se ha incluido un apartado de mejoras incluidas respecto a las anteriores fases (fase 5).

## 2. Introducción
Sirva este documento como documento de diseño del juego ​ _Animal BOOM
Mayhem,_ un juego multijugador en línea que implementa una versión renovada y
divertida del balón prisionero. Su principal objetivo es mostrar y explicar los
elementos que va a incluir ​ _Animal BOOM Mayhem_ ​.  

### 2.1. Inspiración
_Animal BOOM Mayhem_ es un videojuego inspirado en los típicos juegos de arcade con una historia simple y un ritmo muy frenético. Concretamente, _Animal BOOM Mayhem_ se inspira en juegos como _Butasan_ o _Bomberman_ en los que varios jugadores compiten entre sí en una pelea con proyectiles varios.

### 2.2. Plataforma
_Animal BOOM Mayhem_ es un videojuego competitivo en línea para PC. Esta va a ser su plataforma principal y no se tiene pensado sacarlo para otras.

### 2.3. Concepto del juego
_Animal BOOM Mayhem_ es un juego competitivo en línea en el que cada jugador toma el control de un animal que competirá en un torneo de balón prisionero. Los jugadores deben de competir entre sí por ser el último jugador en pie de la partida y ganar la _“corona explosiva”_. Este sería el objetivo principal de _Animal BOOM Mayhem_.

### 2.4. Características principales
El juego presenta las siguientes características principales:  

● **Simplicidad** ​: Al ser un videojuego de estilo arcade, este no presenta una
historia muy compleja ya que el objetivo principal del videojuego es que el
jugador se divierta. Por esta razón, tanto la historia como la jugabilidad son
muy simples.  

● **Frenético** ​: Durante la partida, los jugadores tendrán que buscar rápidamente
todo tipo de objetos que lanzar al enemigo y tendrán que esquivarlos. Esto
pondrá a prueba los reflejos y habilidades de los jugadores.  

● **Dinámico** ​: Mientras pasa el tiempo de la partida, esta va evolucionando.
Cuando se queden sin tiempo, los jugadores entran en el “​ _¡CAOS TOTAL!_ ​” ,
un modo muerte súbita para decidir al ganador.  

**● Escenarios tematizados:** ​Cada escenario es diferente del resto pues hay
que enfrentarse a una serie de retos distintos en cada uno de ellos.


### 2.5. Género
_Animal BOOM Mayhem_ es un videojuego que presenta características de varios
géneros. Estos serían los siguientes:  

● **Casual** ​: Son juegos con reglas simples que no requieren dedicación de
tiempo a largo plazo o habilidades especiales para jugar. Son juegos dirigidos
a un público principal de jugadores casuales. ​ _Animal BOOM Mayhem_ es un
juego cuyo principal objetivo es que los jugadores se diviertan con partidas
cortas y rápidas.  

● **Party Game** ​: Juegos en los que los jugadores avanzan por turnos por un
tablero virtual y deben ir superando diversas pruebas para competir entre sí
para alcanzar la meta o el primer puesto. Animal BOOM Mayhem adopta el
aspecto de la competición con un movimiento libre.  
● **Acción** ​: Juegos que requieren que el jugador haga uso de sus reflejos,
puntería y habilidad, generalmente en un contexto de combate o superación
de peligros.  

### 2.6. Propósito y público objetivo  

El propósito principal de ​ _Animal BOOM Mayhem_ es ofrecer a los jugadores un
videojuego multijugador en línea frenético y sencillo con el que puedan entretenerse
al estilo de los juegos arcade.  
_Animal BOOM Mayhem_ es un juego cuyo público objetivo son todas las edades
debido a su estética arcade y sus mecánicas fáciles de entender para cualquier
persona independientemente de la edad. Además, como la historia del juego es muy
básica, los usuarios pueden jugar ​ _Animal BOOM Mayhem_ en cualquier momento
libre que tengan.


### 2.7. Jugabilidad
Cada partida se basará en una competición de animales jugando al balón prisionero
en el que el jugador tratará de quedar el último para acabar victorioso. Para lograr
esto, los jugadores deben aprovechar una serie de power-ups y habilidades de los
objetos, así como evitar ciertos eventos del escenario.  

● **Movilidad:** ​ Cada jugador podrá moverse libremente por el espacio de juego.  

● **Acciones:** El combate se define por la posibilidad de poder coger y lanzar
objetos para eliminar a los otros animales del torneo, además de poder
esquivarlas agachándose.  

● **Variedad:** El jugador podrá elegir entre varios animales y atuendos
adicionales para tener una experiencia más personalizada, además de
diversos escenarios con dinámicas diferentes.  

### 2.8. Estilo visual  

_Animal BOOM Mayhem_ se caracteriza por tener un estilo visual muy simple y con
estética cartoon ya que, al tratarse de un juego desenfadado, se ha preferido optar
por una opción visual menos detallada y compleja.
Por lo tanto, en el diseño de tanto los personajes como de los escenarios,
emplearemos colores saturados y diseños divertidos. En cuanto a sombreado
emplea la técnica “cell-shading”, por seguir la línea estética del juego.  

### 2.9. Alcance  

Así mismo el objetivo es crear un juego en línea multijugador. En las primeras
etapas de su desarrollo se le dotará de las mecánicas básicas con variedad de
recursos.


## 3. Mecánicas  

En esta parte del documento se profundizará y se describirán las mecánicas que
definen a ​ _Animal BOOM Mayhem_ ​. Por una parte se definirá el desarrollo del juego,
que reunirá las acciones del jugador durante el gameplay.  

### 3.1. Flujo de juego  

A lo largo de este punto, se describirá de principio a fin cómo es una partida de
_Animal BOOM Mayhem_ ​, desde el momento en el que el jugador entra en el juego
hasta que uno de los jugadores se hace con la victoria eliminando a todos sus
adversarios.  

Cuando el jugador inicia ​ _Animal BOOM Mayhem_ ​, lo primero que ve es el ​ _Menú
Principal_ ​. Este menú tiene varias opciones. Si el jugador desea jugar, este tiene que
seleccionar la opción de ​ _Jugar_ ​. Tras seleccionar esta opción, el jugador debe de
configurar su partida antes de comenzar a jugar mediante diversas pantallas de
selección.  

En primer lugar, el jugador pasa a una pantalla donde puede indicar si quiere jugar
de manera local o en línea, es decir, el ​ _modo de conexión_ ​. Esta sería la primera
pantalla de selección.  

Después, la siguiente pantalla sería en la que el jugador selecciona el ​ _modo de
juego_ ​: todos contra todos o por equipos.  

Las dos siguientes pantallas serían: la pantalla de ​ _Selección de Personaje_ ​, donde el
jugador debe escoger el personaje de la plantilla disponible con el que desea jugar,
y la pantalla de ​ _Selección de Escenario_ ​, donde el jugador debe escoger el mapa de
batalla.  

Finalmente, tras escoger el escenario y haber configurado todas las opciones, el
jugador llega a una pantalla donde habrá un botón de jugar. Al presionarlo, se
iniciará la partida correspondiente.  

Al comenzar la partida, los jugadores aparecerán de manera semi aleatoria en el
escenario, respetando siempre las distancias para que dos jugadores no aparezcan
demasiado cerca.  

Si el modo de juego es ​ _Todos contra Todos_ ​, desde ese momento, los jugadores
tratarán de eliminarse entre ellos utilizando los objetos que tengan a mano en la
zona de juego. En cambio, si el modo es ​ _Por Equipos_ el jugador deberá intentar
eliminar a los miembros de los equipos rivales.  

El usuario deberá tener en cuenta que al recibir, por defecto, tres impactos se
agotará la vida de su personaje y será eliminado de la zona de juego. Además,
podrá ser eliminado por ciertos obstáculos.  

Durante la partida podrán ir apareciendo nuevos objetos, como bombas, para que la
zona de juego no se quede vacía.  

A medida que pasa el tiempo, los jugadores obtendrán bonificaciones incrementales
de potencia de lanzamiento. Asimismo, los objetos aumentarán su tamaño. Cuando
haya pasado el tiempo suficiente, se activa el modo ​ _Muerte Súbita_ ​, donde la salud
de todos los jugadores restantes es reducida a 1.  

Una vez que el jugador haya sido eliminado, podrá salir de la partida y volverse a
unir a una nueva, o permanecer en la sala y animar a los jugadores, en caso de que
se esté jugando en equipo. Se observará repercusión en el equipo animado, como
por ejemplo, obteniendo power ups.  

Finalmente, la partida acabará cuando quede un único jugador o equipo vivo. Al
finalizar la partida, aparecerá una pantalla donde se indicará qué jugador o equipo
ha ganado la partida. También, está pantalla incluirá una ventana donde se
especifican las teclas que se deben de pulsar para que:  

● El jugador pueda volver a jugar otra vez.  

● El jugador vuelva a la pantalla de selección de personaje.  

● O el jugador pueda regresar al menú principal.  

En el apartado de ​ _Interfaz_ ​, se podrá observar un diagrama de flujo que muestra
gráficamente todas las posibilidades de flujo entre pantallas.  

### 3.2. Personajes  

Todos los personajes son animales humanoides y comparten las mismas
características a nivel jugable. Cada jugador podrá elegir el personaje que quiera
antes de empezar una partida. Lo único que diferencia un personaje de otro es su
aspecto.  

El jugador puede desbloquear nuevos personajes y atuendos a medida que juega
partidas.  
  
 #### 3.2.1. La Juani  
   
La Juani es el personaje estrella del juego al ser el primer personaje diseñado. La Juani 
es una maruja ama de casa que tras limpiar, cocinar, cuidar a sus 4302 palomas y salir de 
su 'AEROBIC ULTRA INTENSIVE class' está lista para participar en la quingentésimo trigésimo 
novena edición del campeonato Animal BOOM Mayhem y coronarse vencedora por octavo año consecutivo.  
 
![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/Concept%20art%20-%20La%20Juani.jpg)

Como se ha mencionado en la historia, a la Juani le encanta el aerobic. Por ello, a 
la hora de diseñar el personaje hemos optado por vestirla con el típico traje de aerobic 
de los años 80.
 
  #### 3.2.2. Juani  Cursed
   
Juani Cursed fue una vez una fan acosadora de la Juani, no obstante, después de intentar 
llamar la atención de ésta y no conseguirlo juró robarla la identidad y ser 'La Juani' 
original. Vive obsesionada con destruirla y saber lo que piensa de ella.  
 
"Todo lo que diga de mí es mentira"
 
 
Estos son los personajes disponibles en la fase 2. Para posteriores entregas, tenemos 
pensado incluir nuevos personajes como: un gato, una morsa y un cuervo.
  
### 3.3. Tipo de cámara  

_Animal BOOM Mayhem_ presenta una cámara cenital centrada en el escenario para
que el jugador pueda ver en todo momento, no solo su personaje sino, también, a
sus adversarios, el entorno y los objetos con los que puede interactuar, los cuales
van a ser muy importantes para el desarrollo de la partida.  

### 3.4. Controles  

A continuación, se puede observar una tabla que recoge los controles
principales de los jugadores en ​ _Animal BOOM Mayhem_ ​:  

|  |  Jugador 1  |  Jugador 2   |
| -- | -- | -- |
| Movimiento | W, A, S, D | U, H, J, K |
| Recoger/Lanzar bolas| R | O |
| Agacharse | T | P |

### 3.5. Colisiones  

En ​ _Animal BOOM Mayhem,_ ​el jugador puede moverse por todo el espacio de juego.
Debido a esto y la dinámica del juego, se necesitarán colisiones para el correcto
funcionamiento de este. Se han de implementar diferentes colisiones entre
personajes y elementos del juego.  

A continuación, se enumeran las colisiones entre objetos que se tiene pensado
implementar:  

● Personaje - Objeto  

● Personaje - Bordes del estadio  

● Pelota - Bordes del estadio  

● Pelota - Obstáculos  

● Personaje - Obstáculos


### 3.6. Reglas de interacciones  

A continuación se describen las posibilidades de acción de los jugadores durante el
transcurso de una partida:  

● **Movimiento en las 8 direcciones** ​. No hay sprint ni aguante físico.  

● **Recoger objetos del suelo** ​. Al situarse encima de un objeto en el
suelo, el jugador puede recogerlo para llevarlo consigo.  

● **Lanzar objetos** ​. El jugador arroja el objeto que lleva encima en la
dirección a la que el jugador mira.  

● **Agacharse** ​. Mientras el jugador mantiene pulsado el botón, el
personaje del jugador se agacha en el suelo. Esta acción otorga al
jugador un breve tiempo de inmunidad que le permitirá evitar impactos
directos de los objetos.  

Adicionalmente, el jugador puede caer fuera del terreno de juego (en mapas
abiertos), ya sea accidentalmente o por haber sido empujado.
Tras recibir daño, el jugador entra en un breve tiempo de inmunidad. Este estado no
impide que puedas caer fuera del mapa al ser empujado.  

En una partida por equipos, los jugadores eliminados son sacados de la zona de
combate y llevados al área de los eliminados, que dependerá del mapa. Desde allí,
los jugadores no podrán moverse ni utilizar objetos. Pero tendrán disponible la
siguiente acción:  

● **Animar al equipo** ​. Otorga bonificaciones de distancia y velocidad de
lanzamiento a los miembros del equipo que queden en pie. Los
jugadores que queden en pie pueden aturdir temporalmente a los
jugadores que han sido eliminados mediante objetos.  

**Otras restricciones e interacciones:**  

● Puedes recoger un objeto del suelo mientras te mueves.  

● Puedes lanzar objetos en movimiento.  

● Todos los objetos que lanza el jugador pueden impactar tanto al propio
jugador como a sus compañeros de equipo.  

● No puedes moverte o lanzar objetos mientras te agachas.  

● No puedes lanzar ni recoger objetos mientras te agachas.  

● Al ser golpeado, el objeto que llevas encima cae al suelo.  

● Al ser eliminado, el objeto que llevabas encima cae al suelo.  


### 3.7. Niveles  

En el juego, el jugador podrá elegir entre varios escenarios en los que se
desarrollará la partida, cada uno de ellos con características diferentes:  

● **Estadio:** ​ Nivel básico sin cambios en el terreno.  

● **Glaciar:** El espacio de juego se basa en una isla de hielo que irá
fragmentado con el paso del tiempo, de manera que poco a poco el
espacio acabará reduciéndose.  

● **Volcán:** ​ En este escenario van apareciendo charcos de lava.  

### 3.8. Objetos lanzables  

El jugador tendrá a su disposición diversos elementos que podrá lanzar para
eliminar a otros jugadores:  

● **Bola normal** ​: Pelota que rebota al contacto, no desaparece cuando
choca contra algo. Los jugadores son empujados al impactar.  

● **Bomba** ​: Explota cuando choca contra algo o cuando cae al suelo tras
ser lanzada (jugadores, obstáculos, paredes). Daña a los jugadores y
objetos que se encuentren en el radio de explosión.  

● **Bomba con temporizador** ​: Similar a la ​ _Bomba_ ​, pero con un
temporizador de 3 a 8 segundos tras ser lanzada. No explota al caer
al suelo. Se representa mediante una patata. Como no se sabe cuando va a explotar, se pone
cada vez más veces roja para indicarle al usuario que va a explotar.

● **Bola ígnea** ​: Similar a la ​ _Bola normal_ con el añadido de dejar un rastro
de llamas en su camino tras ser lanzada.  

● **Mini agujero negro** ​: Similar a la ​ _Bomba_ ​, pero atrae y daña a los
jugadores que permanezcan en su área de efecto.  

● **Pelota boomerang** ​: Similar a la ​ _Bola normal_ ​, con la peculiaridad de
invertir su dirección después de cierta distancia recorrida.  

### 3.9. Progresión del jugador  

A medida que el jugador va jugando partidas, se desbloquean nuevos escenarios
para jugar y nuevos accesorios para los avatares de los jugadores.  


## 4. Interfaz  

En este apartado se mostrarán las interfaces de ​ _Animal BOOM Mayhem_ ​, además de
mostrar un diagrama de flujo de los interfaces. Por cada una de las interfaces se
explicarán brevemente su función.  

### 4.1 Primera versión
#### 4.1.1 Diagrama de flujo  

A continuación, se puede observar el diagrama de flujo de ​ _Animal BOOM Mayhem_
que muestra las pantallas del juego y la relación entre estas  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Diagrama%20de%20flujo%20de%20juego.jpg)


#### 4.1.2. Menú principal  

Aquí se puede observar un boceto de la pantalla de ​ _Menú Principal_ ​:    

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Men%C3%BA%20principal.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Logo del juego:** una imagen 2D correspondiente al logo y título del
juego ​ _Animal BOOM Mayhem_ ​.  

**● Botón de jugar:** ​al pulsarlo lleva a la pantalla de​ _Modo de Conexión_.  

**● Botón de opciones:** ​al pulsarlo lleva al ​ _Menú de Opciones_.  

**● Botón de créditos:** ​al pulsarlo lleva a la pantalla de ​ _Créditos_.  

**● Botón de salir:** ​al pulsarlo lleva de vuelta al Sistema Operativo.  


#### 4.1.3. Créditos  

La siguiente imagen muestra el interfaz de la pantalla ​ _Créditos_.  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Cr%C3%A9ditos.png)

Lista y descripción de todos los elementos de la pantalla:  

● **Nombres del equipo:** panel que muestra el nombre de cada
uno de los integrantes del equipo desarrollador del juego.  

#### 4.1.4. Menú de ajustes  

La siguiente imagen es un prototipo del interfaz de la pantalla de ajustes del juego.  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Men%C3%BA%20de%20ajustes.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Botones de la izquierda (Sonido, Brillo e Interfaz):** estos
botones permiten al jugador hacer ajustes sobre el juego. Una
vez se pulsen se podrán acceder a unos ajustes más
específicos por cada una de las modalidades.  

● **Botones del interfaz:** ventana en la que se muestran las
propiedades a modificar de cada una de las modalidades que
vienen descritas en la imagen, en este caso se habría pulsado
sobre el botón ​ _Interfaz._  



#### 4.1.5. Modo de conexión  

Aquí se puede observar un boceto de la pantalla de selección del ​ _Modo de
Conexión_ ​:  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Modo%20de%20conexi%C3%B3n.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Flecha:** ​ al pulsarla lleva de vuelta al ​ _Menú Principal_ ​.  

● **Botón de local:** al pulsarlo el jugador activa el modo de conexión local
y pasa a la pantalla de ​ _Modo de Juego_ .  

● **Botón de en línea:** al pulsarlo el jugador activa el modo de conexión
online y pasa a la pantalla de ​ _Modo de Juego_ ​.  

#### 4.1.6. Modo de juego  

Aquí se puede observar un boceto de la pantalla de selección del ​ _Modo de Juego_ ​:  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Modo%20de%20juego.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Flecha:** ​ al pulsarla lleva de vuelta a la pantalla de ​ _Modo de Conexión_ ​.  

● **Botón de todos contra todos:** al pulsarlo, el jugador activa el modo
de juego todos contra todos y pasa a la pantalla de ​ _Selección de
Personaje_ ​.  

● **Botón de en equipo:** al pulsarlo, el jugador activa el modo de juego
en equipo y pasa a la pantalla de ​ _Selección de Personaje_ ​.  

#### 4.1.7. Selección de personaje  

Aquí se puede observar un boceto de la pantalla de ​ _Selección de Personaje_ ​:  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Selecci%C3%B3n%20de%20personaje.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Flecha:** ​ al pulsarla lleva de vuelta a la pantalla de ​ _Modo de Juego_ ​.  

**● Botón personaje 1:** ​al pulsarlo, el jugador selecciona el personaje 1
como su avatar para la partida.  

**● Botón personaje 2:** ​al pulsarlo, el jugador selecciona el personaje 2
como su avatar para la partida.  

**● Botón personaje 3:** ​al pulsarlo, el jugador selecciona el personaje 3
como su avatar para la partida.  

**● Botón personaje 4:** ​al pulsarlo, el jugador selecciona el personaje 4
como su avatar para la partida.  

**● Botón de opciones de partida:** ​al pulsarlo, se abre la pantalla de
_Opciones de Partida_ en la cual los jugadores pueden configurar la
partida  



#### 4.1.8. Menú de opciones de partida  

En la siguiente imagen se muestra la pantalla con los ajustes que se podrán hacer
sobre las partidas.  


![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Opciones%20partida.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Rondas:** en este grupo de botones se podrán cambiar el
número de rondas que se jugarán por partida.  

● **Duración:** permite determinar la cantidad de tiempo por ronda
que se consumirá.  

● **Vida:** con este conjunto de botones se le permite al jugador
escoger cuánta vida tendrá por cada ronda.  

● **Jugadores:** con el botón ​ _Jugadores_ ​el creador de la partida
puede seleccionar cuantos miembros formarán parte de ella.  

### 4.1.9. Selección de escenario  

Aquí se puede observar un boceto de la pantalla de ​ _Selección de Escenario_ ​:  


![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Selecci%C3%B3n%20de%20escenario.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Flecha:** al pulsarla lleva de vuelta a la pantalla de ​ _Selección de
Personaje_ ​.  

● **Panel de vista previa escenario:** panel que muestra una vista
previa de cómo es el escenario que ha seleccionado el jugador.  

● **Botón escenario 1:** al pulsarlo, el jugador selecciona el
escenario 1 como escenario principal de la partida.  

**● Botón escenario 2:** ​al pulsarlo, el jugador selecciona el
escenario 2 como escenario principal de la partida.  

**● Botón escenario 3:** ​al pulsarlo, el jugador selecciona el
escenario 3 como escenario principal de la partida.  

#### 4.1.10. Tutorial  

La siguiente imagen muestra el interfaz de la pantalla ​ _Tutorial._  


![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Tutorial.png)

Lista y descripción de todos los elementos de la pantalla:  

● **Maniquí:** es el objeto sobre el que el jugador lanzará sus
ataques y sobre el que ensayarán durante el tutorial del juego.  

● **Jugador:** ​ es el elemento sobre el que el jugador interactúa.  

● **Texto emergente:** panel en el que van apareciendo las
instrucciones del juego, cómo moverse, esquivar, lanzar..  

### 4.1.11. Pantalla de batalla  

Sirva la siguiente imagen para ilustrar la pantalla ​ _Partida._  


![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Pantalla%20de%20batalla.png)

Lista y descripción de todos los elementos de la pantalla:  

● **Tiempo:** muestra el tiempo restante que queda para terminar la
ronda que se está jugando.  

● **Jugador:** ​ es el elemento sobre el que el jugador interactúa.  

● **Vida:** el elemento ​ _Vida_ se representa como un círculo en los
pies del jugador y se dividen en la cantidad de puntos de vida
que se haya elegido antes de empezar la vida. Representa la
cantidad de puntos de vida que tiene el jugador.  

#### 4.1.12. Ventana de victoria  

Aquí se puede observar un boceto de la ​ _Ventana de Victoria_ ​:  

![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Ventana%20de%20victoria.PNG)

Lista y descripción de todos los elementos de la pantalla:  

● **Ganador:** panel que muestra el nombre del jugador o equipo
que ha ganado la partida.  

● **Acciones con teclas:** pequeña ventana que muestra las teclas
que se deben presionar para: volver a jugar la partida , volver a
la pantalla de ​ _selección de personajes_ o regresar al ​ _Menú
Principal_ ​.  
  
  ### 4.2. Versión implementada  
  
  En este aparto se expondrán las modificaciones que se ha hecho en el interfaz respecto a la anterior versión
  
 ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/Diagrama%20de%20flujo%20de%20juego.png)
  
  #### 4.2.2 Menú principal  
  
  Se ha eliminado el botón _Salir_ y se ha sustituido el de _Opciones_ por el botón _Tutorial_.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/mainMenu.png)  
  
  #### 4.2.3 Créditos
  
  No se han realizado cambios en la escena de _Créditos_.  
  
![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/creditos.png)  
  
  #### 4.2.4 Menú de ajustes 
  
  La escena _Menú de ajustes_ ha sido eliminada.  
  
  #### 4.2.5. Modo de conexión  

  La escena _Modo de conexión_ ha sido eliminada.  
  
  #### 4.2.6. Modo de juego
  
  La escena _Modo de juego_ ha sido eliminada.  
  
  #### 4.2.7. Selección de personaje  
  
  En la escena _Selección de personaje_ se ha añadido un espacio destinado a la descripción de los personajes,  
  además de imágenes recordando los controles de cada uno de los personajes.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/seleccion_personaje.png)  
  
  #### 4.2.8. Ajustes de partida  
  
  La escena _Ajustes de partida_ ha sido eliminada.  
  
  #### 4.2.9. Selección de escenario  
  
  En la escena _Selección de escenario_ no se ha realizado ningún cambio.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/seleccion_escenario.png)   
  
  #### 4.2.10. Tutorial  
  
  En la escena _Tutorial_ se ha modifiado para que en la parte superior de la pantalla se muestren poco a poco  
  los controles.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/Tutorial.png)  
  
  
  ### 4.2.11. Pantalla de batalla  
  
  En la escena _Pantalla de batalla_ no se han realizado cambios.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/juego.png)   
  
  
  ### 4.2.12. Ventana de Victoria  
  
  En la escena _Pantalla de Victoria_ no se han realizado cambios.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/Victoria.png)
  
   ## 4.3. Versión Actualizada con Spring
   
   En este apartado se expondrán las modificaciones que se han hecho de nuevo en la interfaz respecto a las anteriores versiones.
   Las pantallas anteriores se mantienen durante esta versión.
   
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/Flujo%20del%20juego%20fase3.jpg)
   
   ### 4.3.1 Pantalla de carga
   
   Tenemos una escena nueva al comienzo llamada _Escena de Carga_ donde se cargan todos los recursos y se muestra una barra de progreso.
   
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/image4.png)
   
   ### 4.3.2 Introducir Nickname
   
   En la pantalla _Menú Principal_ cuando presionamos el botón _jugar_, aparece una caja de texto donde tenemos que introducir nuestro Nickname que aparecerá
   una vez nos conectemos satisfactoriamente al servidor.
   
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/image2.png)
 
   Lista y descripción de todos los elementos de la pantalla:
  
   ● **Caja de texto**: Campo en el que podemos introducir nuestro _Nickname_.
   
   ### 4.3.3 Lobby
   
   Después de la pantalla _Selección de Escenario_ y antes de la pantalla _Pantalla de Batalla_, hemos añadido la escena _Lobby_ donde los jugadores se conectan
   y esperan para comenzar la partida.
   
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Version%20Implementada/image3.png)
   
   Lista y descripción de todos los elementos de la pantalla:
   
   ● **Jugador**: Jugador conectado al _Lobby_ con su _Nickname_.
   
   ● **Corona explosivas doradas**: Indica el número partidas ganadas por el _Jugador_.
   
   ● **Corona explosivas doradas**: Indica el número partidas ganadas por el _Jugador_.
   
   ● **Enemigos derrotados**: Indica el número de enemigos derrotados en partida por el _Jugador_.
   
   ● **Día**: Indica el número de veces que ha jugado esta semana el _Jugador_.
   
   
   
   
  
  ## 5. Arte 2D
  Para esta segunda fase, se han creado multitud de sprites e imágenes para poder montar el videojuego. A continuación, se especificarán
  todos los recursos artísticos creados para esta segunda fase. Cabe destacar que todos ellos son de realización propia y se han dibujado
  con el programa Procreate. Hemos intentado mantener una estética cartoon que fuese coherente con nuestra idea inicial y el concepto cómico del videojuego.
  
  ### 5.1. Personajes
  Todos los personajes de _Animal BOOM Mayhem_ los ha diseñado el equipo y son ideas propias. De momento solo se han implementado dos personajes: la Juani y
  la Juani Cursed, pero se tiene pensado incluir más personajes.
  
  #### 5.1.1. Concept Art
  Para crear a la Juani, realizamos un concept art que representase la idea que teníamos en mente: una paloma a la que le gustase el aerobic y que fuese muy 
  fuerte. A continuación, se puede observar el concept art realizado:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/Concept%20art%20-%20La%20Juani.jpg)
  
  No hay ningún concept art de la Juani Cursed pues su diseño es el mismo que el de la Juani pero con un cambio de color. La Juani es el personaje que controlaría
  el jugador 1 y la Juani Cursed es el personaje que controlaría el jugador 2.
  
  #### 5.1.2. Animaciones
  Se han incluido animaciones de andar, lanzar la pelota, agacharse, coger la pelota y cuando el personaje recibe un golpe. Para ello, se han hecho 
  sprite sheets para poder implementar estas animaciones en el juego. A continuación, se muestran los sprite sheets que recogen todas estas animaciones
  tanto del jugador 1 como del jugador 2:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/juani_sheet.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/juani_cursed_sheet.png)
   
  
  También, cabe destacar que se realizaron sprite sheets para la animación de cuando el personaje anda con alguna de las pelotas en la mano. Cada sprite
  de la tira representaría donde se encontraría la pelota cuando el personaje está andando con ella.
   
  
  ### 5.2. Escenarios
  _Animal BOOM Mayhem_ es un videojuego competitivo en el que varios animales compiten en un torneo de balón prisionero. Debido a esto, el primer escenario
  disponible es una cancha deportiva. Este es el escenario disponible en la fase 2 y, en futuras fases, se van a introducir nuevos escenarios como una zona
  helada.
  
  A continuación, se muestra esta cancha deportiva que corresponde con el primer escenario del juego:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/scenarios/stadium_background.png)
  
  ### 5.3. Props
  
  Para poder desarrollar el videojuego, se realizaron multitud de props que se comentarán en las siguientes categorías.
  
  #### 5.3.1. Pelotas
  
  _Animal BOOM Mayhem_ es un videojuego en el que los jugadores tienen que tratar de eliminarse unos a otros lanzándose diversos objetos diferentes. En esta segunda 
  fase, los objetos que implementamos son: la pelota normal, una bomba y la patata (bomba con temporizador). Se han creado sprites png de tamaño 100x100 para las 
  tres pelotas. Concretamente, para la patata se realizaron dos sprites, uno de la patata normal y otro de la patata con un ligero tono rojizo. Esto se debe a 
  que, tras cierto tiempo, la patata explota y alternamos el sprite rojo con el normal cada vez más rápido para indicarle al usuario que queda poco para que explote.
  
  Las siguientes imágenes corresponden con los sprites de las tres pelotas explicadas, respectivamente. 
  
  Sprite de la pelota normal (balón de baloncesto):
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Pelota.png)
  
  
  Sprite de la bomba:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Bomba.png)  
  
  
  Sprite de la patata (bomba con temporizador):
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Patata.png)  
  
  Sprite de la patata roja para alertar al jugador:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Patata_2.png)
  
  
  
  También, se crearon dos sprites para la animación de la explosión cuando las bombas explotan:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/effects/explosion_sheet.png)

  
  #### 5.3.2. Sprites de vida
  En cuanto a la barra de vida, se han creado sprites para representar la vida de cada jugador dentro del juego. En este caso, la barra de vida es un semicírculo 
  que se sitúa debajo del personaje de cada jugador. Este semicírculo tiene tres secciones y, cada vez que el jugador es golpeado (pierde una vida), se elimina 
  una sección de derecha a izquierda. Para poder conseguir este efecto, se han realizado en total seis sprites, tres por cada jugador. Asimismo, para poder 
  diferenciar a cada jugador, cada semicírculo de vida tiene un color concreto: el semicírculo del jugador 1 es de color azul y el semicírculo del jugador 2 
  es de color naranja.
  
  A continuación, se pueden observar los sprites de vida del jugador 1 junto a su evolución cuando el jugador pierde vidas:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/hud/lifebar_blue.png)
  
 
  Al igual que en el caso anterior, estos serían los sprites de vida del jugador 2 junto a su evolución:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/hud/lifebar_red.png)
  
  #### 5.3.3. Marcador
  Cuando pasa cierto tiempo, indicado por un marcador (temporizador), se entra en el modo de muerte súbita donde las pelotas son más grandes y más rápidas. Para 
  mostrar el tiempo y cuando comienza la muerte súbita, se ha creado un sprite marcador que está situado arriba de la pantalla durante la partida:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/hud/marcador.png)
  
  ### 5.4. Interfaz
  Por último respecto a la parte de arte, se realizaron diversos dibujos para incluir en la interfaz.
  
  En primer lugar, se hizo un dibujo para incluir en el menú principal como portada del juego. Este incluye el título del videojuego _Animal BOOM Mayhem_ y una pila
  de personajes derrotados sobre los que se encuentra la Juani, vencedora del torneo y ganadora de la _"corona explosiva"_.
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/sceneBackground/mainMenu_background.png)
  
  
  Por otro lado, para la pantalla de selección de personajes, se realizaron los siguientes dibujos de los dos personajes disponibles en esta fase, la Juani y la Juani Cursed:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/rep_Juani.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/rep_Juani_cursed.png)
  
  Cabe destacar que se han hecho unos sprites para cuando la Juani y la Juani Cursed no están seleccionadas (imágenes superiores) y otros sprites para cuando han sido 
  seleccionadas por el jugador:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/rep_Juani_selected.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/rep_Juani_cursed_selected.png)
  
  
  Continuando con los personajes, se han dibujado sprites para cuando alguno de los jugadores gana la partida. En ellos, se muestra a su correspondiente personaje, la Juani 
  en el caso del jugador 1 o la Juani Cursed en el caso del jugador 2, con la _"corona explosiva"_ en la cabeza.
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/juani_winner.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/juani_cursed_winner.png)
  
  
  También, se han dibujado sprites de los personajes de diálogo:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/juani_dialogue.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/juani_cursed_dialogue.png)
  
  
  Este sería el dibujo de la _"corona explosiva"_ que gana el jugador que gane el torneo de balón prisionero:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/Corona_explosiva.png)
  
  
  Para finalizar, también se ha dibujado un fondo para las pantallas de la interfaz. El siguiente fondo se incluye en pantallas como la de selección de personajes:
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/sceneBackground/stage_background.png)
  
  
  ## 6. Música y efectos de sonido
  
  Con respecto a la música y efectos sonoros, hemos optado por emplear música y sonidos coherentes con la estética cómica y divertida de _Animal BOOM Mayhem_. 
  
  La música para el menú principal y la pantalla de juego la hemos sacado de la página Adobe Stock, una página de la que puedes descargar música sin derechos de autor. 
  
  ● **Menú principal:** Para la música del menú principal, como se mencionó anteriormente, hemos optado por una canción cómica pero con cierto ritmo de acuerdo al 
  concepto  del juego: torneo de balón prisionero entre animales cartoon. Aún así, hemos querido que la canción fuese algo relajada pues todavía no se está entrando 
  en el juego como tal.
  
  ● **Pantalla de juego:** Para la música de la pantalla de juego, hemos escogido una música con mucho ritmo y cañera para que sea coherente con el ambiente de 
  batalla y torneo del juego.
  
 
  Por otro lado, los efectos de sonido del juego los hemos sacado de la página: freesound.org. Para los efectos de sonido hemos optado, de nuevo, por sonidos 
  de estilo cartoon que sean graciosos. Hemos incluido los siguientes efectos de sonido:
  
  ● Un sonido para cuando el personaje es golpeado (recibe un balonazo).   
  ● Un sonido para cuando el jugador realiza los pasos del tutorial correctamente.   
  ● Un sonido para cuando las bombas o las patatas explotan.   
  ● Un sonido para cuando el jugador pulsa los botones del menú principal.   
  ● Un sonido para cuando el jugador lanza una pelota.   
  
  
  
  ## 7. Diagrama de clases y API REST
  
  La aplicación presenta varias clases, pero, para esta práctica se han implementado cinco nuevas clases, tres para el servidor y dos para el cliente.

  En el caso del servidor, las tres nuevas clases que se han implementado han sido: la clase Player2, la clase GameController y la clase Application. La 
  clase Application es de tipo @SpringBootApplication y es la clase encargada de que el servidor se ejecute como una aplicación de Java.

  Por otro lado, la clase Player2 es la clase que representa a los jugadores que se van a conectar al servidor. Tiene varios atributos para almacenar datos de 
  cada jugador, como su nombre, que serán mostrados en el lobby y se guardarán y cargarán en ficheros.

  Por último, también se ha implementado la clase GameController. Este es el controlador del juego y, por ello, esta clase se ha anotado como 
  @RestController. Esta clase se encarga de varias funciones: gestionar la conexión de los jugadores al servidor, guardar y cargar los datos de estos 
  jugadores en ficheros, etc… 

  Para lograr esto, GameController tiene dos atributos fundamentales los cuales son mapas de jugadores. Uno de los mapas se encarga de almacenar únicamente 
  a los jugadores que están conectados en ese momento en el servidor y eliminaría a los jugadores que se han desconectado. Este es el mapa front y es la lista que 
  se emplea para mostrar en el lobby los jugadores que están actualmente conectados en la esquina inferior izquierda. El segundo mapa, por otro lado, funciona como 
  un backup y  almacena a todos los jugadores que se han conectado al servidor aunque estos se hayan desconectado. De esta manera, si estos jugadores se volviesen 
  a conectar, se podrían recuperar sus datos, pues se han almacenado en ficheros.

  A continuación, se puede observar el diagrama de clases de la aplicación que muestra las relaciones existentes entre estas tres clases:

  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Diagrama%20UML_Fase%203.jpg)
  
  
  
  ## 8. Instrucciones precisas para ejecutar la aplicación
  
  Para la ejecución de Animal BOOM Mayhem se debe descargar la IDE Eclipse y, concretamente, Spring Tool Suite. Spring Tool Suite es una versión enriquecida de 
  Eclipse, basada en la versión Java EE de Eclipse, pensada para el desarrollo de aplicaciones con Spring. Esta ya tiene incorporadas el sistema de gestión de 
  dependencias Maven y Spring, por lo que no hace falta descargar nada más. El servidor está estructurado con Maven y las dependencias que se han utilizado se 
  pueden observar en el archivo pom.xml.

  Cabe destacar que, en este caso, no se ha comprimido la aplicación en un .jar por lo que, para poder activar el servidor, se debe de abrir el código del servidor 
  desde Eclipse y, una vez abierto, darle al botón de ejecutar como aplicación de Java. Con esto, el servidor se conectaría.

  En cuanto al cliente, este se ha implementado empleando el framework Phaser cómo se hizo en la fase 2. También, se ha empleado Jquery para que el cliente se comunique 
  con el servidor.

  Respecto a la URL que debemos de cargar en el navegador para empezar a jugar, para poder abrir el videojuego en el navegador, lo único que se debe de hacer es poner 
  en el navegador la dirección localhost:8081.

  Como, en este caso, no hemos utilizado ngrok para que un cliente externo pueda conectarse al servidor que está en nuestro ordenador y poder jugar desde su casa, tenemos
  que probar el juego en línea de manera local. Para ello, duplicamos la pantalla del juego en el navegador y veremos cómo en el lobby del juego, si el servidor está
  activado, se registran dos jugadores. Si alguno de los jugadores se desconecta del servidor en el tiempo de duración del lobby, la información de este desaparecerá de la
  pantalla.

  En caso de que el servidor esté apagado, aparecería un error en la consola y ninguno de los jugadores se mostrarían en el lobby.  
  
  
  
  ## 9. Fase 4
  A continuación, se van a resumir las nuevas funcionalidades introducidas en la fase 4. En concreto, nos vamos a centrar en el uso de WebSockets.
  
  
  ### 9.1 WebSockets
  En esta fase 4, se ha incluido WebSockets como mecanismo de comunicación asíncrona en el juego. Por lo tanto, el protocolo que hemos empleado ha sido WebSocketes (ws).
  También, cabe destacar que, en esta fase cuatro, no se hace uso de API REST. Toda la parte de gestión que se implementó en la fase 3 con API REST se ha implementado en 
  esta fase con WebSockets.
  
  En primer lugar, se ha implementado la conexión entre cliente y servidor con WebSockets. Para ello, en el lado del servidor, se han creado en la clase Application dos
  manejadores, uno para el lobby (LobbyHandler) y otro para la partida (IngameHandler). El cliente se puede conectar a estos dos canales empleando WebSockets cuando quiera 
  jugar. Inicialmente, el cliente se conectará al canal del lobby y, cuando inicie la partida tras cierto tiempo, el cliente cerrará la conexión con el socket del lobby para
  conectarse al canal de la partida (canal ingame).
  
  En el lado del cliente, se ha implementado un método SetUpConnection () tanto en el lobby como en el socket de la partida para que, cuando el cliente quiera jugar el
  juego, simplemente tenga que conectarse al websocket correspondiente y enviar un mensaje al servidor.
  
  Una vez establecida la conexión, cliente y servidor van a poder intercambiar mensajes que se enviarán en formato JSON. Concretamente, cada vez que alguno de los clientes
  conectados al servidor actualice cierta información, este enviará un mensaje con estos cambios al servidor y el servidor lo procesará, lo empaquetará y se lo devolverá al
  resto de clientes conectados para mantenerlos actualizados. Cabe destacar que, como cliente y servidor se intercambian multitud de información (datos del jugador en el
  lobby, datos del jugador en partida, mensaje de inicio, etc...), los mensajes se crean con una etiqueta “type” que especifica el tipo de información que contiene el
  mensaje. De esta manera, tanto el cliente como el servidor pueden identificar el tipo de información y actualizarla con los métodos correspondientes.
  
  
  
  Por otro lado, en cuanto al lobby, este funciona de manera similar a la fase 3, pero se han incluido nuevas funcionalidades. Lo primero a destacar es que se ha
  implementado toda la parte del lobby que se tenía en la fase 3 con WebSockets. Por lo tanto, los jugadores cuando se conectan al lobby se muestran en la pantalla con su
  personaje y cierta información. También, cuando se conecta un jugador, si este es nuevo se crea desde cero un perfil, pero, si este ya existía entonces se recuperan sus
  datos que están almacenados en un fichero.
  
  Sin embargo, además de esto, el lobby cuenta con un temporizador que, al unirse dos jugadores, se activa. Al terminar el tiempo, se inicia la partida. En este momento, el
  lobbyHandler le pasa la lista de jugadores activos en el lobby al IngameHandler para que prepare la partida. 
  
  Asimismo, otra nueva funcionalidad que se ha incluido son las salas. El juego ahora dispone de salas a las que se pueden conectar los jugadores. El límite de estas salas
  son dos jugadores. Cuando una sala se llena, se crea una nueva y los nuevos jugadores se insertan en esta. La gestión de las salas se lleva a cabo en la clase
  LobbyHandler.
  
  
  Otra de las funcionalidades que hemos conseguido implementar gracias a los WebSockets es la jugabilidad en línea. Ahora, cuando dos clientes se conectan al juego, estos
  pueden jugar desde cada ventana y visualizar las acciones del otro en pantalla. Para ello, los clientes se conectan al canal ingame utilizando WebSockets (clase 
  IngameSocket del cliente). Cuando un cliente hace algo en la partida, este envía la nueva información al servidor que la recibe en su clase IngameHandler. Aquí, el 
  servidor procesa y actualiza la información como le corresponda y la vuelve a empaquetar para enviársela al resto de clientes y mantenerlos actualizados. Este intercambio
  de información se repite continuamente con toda la información relativa a la partida (pelotas, jugadores, fin de la partida, etc...).
  
  En el caso del servidor, las clases que se encargan de la gestión de la partida son: IngameHandler (manejador de la partida) y MatchManager (clase encargada de la
  preparación y actualización de la partida).
  
  Al finalizar la partida, los jugadores pasan a la pantalla de victoria donde pueden volver a la pantalla de selección de personajes o al menú principal. 
  
  
  Se profundizará más en las clases empleadas para conseguir todo esto en el apartado del diagrama de clases.


  
  ### 9.2 Diagrama de clases (actualizado)
  
  Para esta fase 4, hemos implementado nuevas clases tanto en el cliente como en el servidor. Además, cabe destacar que, en el caso del servidor algunas de las clases
  de la anterior práctica se han eliminado, pues se ha sustituido toda la parte de gestión realizada con API REST por WebSockets. 
  
  A continuación, se van a resumir las nuevas clases implementadas y sus funciones, así como mostrar el diagrama de clases correspondiente a la aplicación.

  En el caso del servidor, las nuevas clases implementadas han sido las siguientes:
  
  ● **Clase Application:** La clase Application es la clase encargada de la gestión de las conexiones en el servidor. Esta clase tiene dos canales: un canal para el lobby y 
  otro para la partida como tal. Cuando un jugador inicia el juego, este se conecta al canal del lobby. Después, en el momento en el que se inicia la partida tras terminar
  el temporizador del lobby, el cliente se desconecta de este para conectarse al canal de la partida, el canal ingame.
  
  ● **Clase PlayerIngameData:** La clase PlayerIngameData es la clase que representa a los jugadores que están dentro de la partida (canal ingame). Contiene varios atributos
  que almacenan información de los personajes dentro de la partida. En este caso, se mantienen atributos para el nombre, la id, etc…, pero, además, se añaden atributos para
  almacenar información fundamental de la escena de la partida como la posición, la dirección, el tipo de pelota, etc… Esta es la información que enviará el servidor a los
  clientes conectados desde el manejador de la partida.
  
  ● **Clase PlayerLobby:** La clase PlayerLobby es la clase que representa a los jugadores que se conectan al lobby. Contiene varios atributos que almacenan la información
  del jugador, como su nick o el personaje seleccionado. También, tiene tres atributos para almacenar el número de victorias, el número de jugadores derrotados y el número
  de veces que ha jugado esa semana, pues es información que se va a mostrar en el lobby.
  
  ● **Clase Room:** La clase Room es la clase que representa las salas. En esta fase, se han implementado salas a las que los jugadores se pueden conectar. Estas salas
  tienen un límite de dos jugadores. Cuando una sala se llena, se crea una nueva sala y los nuevos jugadores se insertan en esta. 

  Cabe destacar que esta clase tiene varios métodos para la gestión de las salas como: un método para añadir a los jugadores a la sala, un método para eliminar a los
  jugadores de la sala y un método para comprobar si un jugador se encuentra ya en esa sala.
  
  ● **Clase LobbyHandler:** Esta clase es el manejador del lobby. Es la clase que se encarga de la gestión del lobby. Esta clase tiene tres atributos importantes: dos mapas
  de jugadores y una lista de salas. 

  Con respecto a los mapas de jugadores, cabe destacar que, uno de los mapas almacena a todos los jugadores que se hayan conectado al juego aunque en ese momento estén
  desconectados (stored_players). El propósito de este mapa es almacenar la información de todos los jugadores para que, si un jugador desconectado se vuelve a conectar,
  podamos recuperar sus datos. Después, el segundo mapa almacena únicamente a los jugadores actualmente conectados al lobby (active_player_sessions).

  También, esta clase tiene como atributo una instancia del manejador de la partida (IngameHandler).

  Además de atributos, esta clase tiene varios métodos que se encargan de toda la gestión del lobby. Algunas de las funciones de estos métodos son: gestionar la conexión y
  desconexión de los jugadores del lobby; recibir y enviar mensajes cuando un jugador se conecta, cuando va a iniciar la partida o cuando el temporizador se actualiza para
  que todos los clientes conozcan esta nueva información; actualizar las salas; etc...

  ● **Clase IngameHandler:** Esta clase es el manejador de la partida. Es la clase que se encarga de la gestión de la partida. Tiene varios atributos entre los que cabe
  destacar: un mapa que almacena a los jugadores conectados en la partida (active_player_sessions), una lista de objetos de tipo MatchManager (matchManagerList) y una
  instancia del manejador del lobby (LobbyHandler).

  Los métodos de esta clase se encargan de toda la gestión de la partida como tal. Concretamente, esta es la clase que se encarga de: la gestión de la conexión y desconexión
  de los jugadores a la partida; recibir los datos de cada cliente cada cierto tiempo por si se han actualizado para, después, poder enviarselos al resto de clientes y
  renderizar ese cambio en sus pantallas; comunicarse con el MatchManger mediante mensajes para la preparación y actualización de la partida; etc…

  Cabe destacar que, los mensajes que envían cliente y servidor están codificados mediante una etiqueta (type) para que, al procesarlos cliente y servidor, estos sepan qué
  tipo de información ha recibido y que deben de hacer con ella.
  
  ● **Clase MatchManager:** La clase MatchManager es la clase encargada de la preparación y actualización de la escena de la partida. Cuenta con métodos que se encargan de:
  inicializar las posiciones de los personajes y de las pelotas cuando se inicia una partida, crear pelotas durante la partida, etc…
  
  
  En el caso del cliente, solo se ha añadido en esta fase una nueva clase, la clase IngameSocket. El resto de clases se han mantenido igual o se han modificado. Este ha sido
  el caso de las clases lobbyscene e Ingamescene que ya existían, pero se han modificado en esta práctica para poder establecer la conexión mediante WebSockets. 
  
  ● **IngameSocket:** IngameSocket es la clase del cliente que establece conexión con el canal ingame del servidor y le envía la información que necesite. Esta clase tiene
  un método setUpConnection () que es el método encargado de conectarse al WebSocket de la partida. Este método también tiene varios listeners entre los cuales cabe destacar
  uno, el listener onmessage, que es el que se encarga de recibir los mensajes del servidor y parsearlos de JSON para, después, poder procesarlos. Estos mensajes se procesan
  en el método processIncomingMessage(). En función del tipo de información recibida (etiqueta type del mensaje), se llama a un método u otro.

  Por otro lado, esta clase cuenta con varios métodos para el envío de mensajes. Al igual que se ha mencionado antes, los mensajes se identifican mediante una etiqueta type
  según el tipo de información. Por ello, dependiendo de lo que queramos enviar al servidor, se debe de llamar a un método u otro. Por ejemplo, el método sendCurrentStatus 
  () empaqueta y envía la información actual del cliente (posición, dirección, pelota, etc...) al servidor para que este, después, pueda enviarle esta información al resto 
  de clientes conectados y estos puedan actualizar su juego en función de lo que haya hecho el cliente.

  Por último, esta clase tiene varios métodos update para, una vez recibida la información actualizada del resto de clientes por parte del servidor, actualizar la escena de
  la partida para que lo que haga el resto de clientes se renderice en la pantalla del cliente actual.
  
  ● **lobbyscene:** En la clase lobbyscene, se ha incluido un método setUpConnection() que se conecta al WebSocket del lobby cuando el jugador entra en este al jugar. Este
  método también emplea listeners para: indicar que se ha establecido conexión (onopen), avisar de si se ha producido algún error (onerror), recibir y procesar los mensajes
  del servidor (onmessage) e indicar que se ha cerrado la conexión (onclose). Cabe destacar que, cuando el cliente recibe el mensaje con el evento onmessage, este se parsea 
  de JSON para poder procesar en los siguientes métodos la información recibida del servidor (los mensajes se envían codificados en JSON).

  Por otro lado, tiene un nuevo método processMessage () que se encarga de comprobar de qué tipo es la información que le ha llegado en el mensaje y, en función del tipo,
  invoca un método concreto. Por ejemplo, si la información es de tipo “UPDATE_LOBBY”, entonces eso quiere decir que se ha conectado un nuevo cliente y su información se va 
  a actualizar y mostrar por pantalla con los métodos getPlayers() y showPlayers(). 

  Si el mensaje es de tipo “START”, se pasa a la siguiente escena, la del juego. 

  Si el mensaje es de tipo “LOBBY_TIMER”, se llama al método updateTimeToStart () para actualizar el tiempo y volver a pintarlo en la escena del lobby.
  
  ● **Ingamescene:** Esta clase es la clase correspondiente a la escena de la partida. Es la clase que renderiza la partida en la pantalla del cliente. Se ha modificado
  ligeramente para adaptarla al nuevo concepto de salas y a las conexiones.
  
  A continuación, se puede observar el diagrama de clases de la aplicación:
  
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Diagrama%20UML%20-%20Fase%204.jpg)

  
    
  ## 10. Mejoras  
  Para la fase de mejoras se han añadido y modificado los siguientes elementos:  
  
  ### 10.1. Personajes  
  Gato Finanzas, de orígenes italianos, Gato Finanzas es contable de día y bailarín de twerk de noche. Listo para barrer la pista de Animal BOOM Mayhem y 
  poder ehcarse unos bailables. 
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/Interfaces/characterRep/gato_Finanzas_concept.png)
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/characters/gato_finanzas_sheet.png)
  
  ### 10.2. Pelotas 
  #### 10.2. Pelota flamígera  
  La pelota flamígera una vez lanzada crea una estela de llamas que si es atravesada produce daños.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Pelota_flamigera.png)
  
  #### 10.2. Agujero negro  
  Cuando colisiona la pelota 'Agujero de Negro' absorbe todo lo que tiene a su alrededor, tanto personajes como pelotas, de manera que si un jugador  
  se queda atrapado en su gravedad posiblmente acabe muriendo si varias pelotas han sido arrastradas consigo.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/balls/Mini_agujero_negro.png)  
  
   ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/resources/img/effects/black_hole_area_sheet.png)
  
  ### 10.3. Interfaz  
  #### 10.3.1 Modo de juego  
  Se ha añadido una nueva escena al juego que permite a los usuarios seleccionar entre online u offline, si seleccionan el modo offline el jugador podrá jugar con  
  un compañero sin necesidad de conectarse al servidor. En caso del online el jugador podrá
  Se ha añadido una nueva escena al juego que permite a los usuarios seleccionar entre online u offline, si seleccionan el modo offline el jugador podrá jugar con  
  un compañero sin necesidad de conectarse al servidor. jugador con otros usuario.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Mejoras/newMode.png)
  
  #### 10.3.2. Créditos  
  Como mejora se planteó acreditar los efectos de sonido y música empleados.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Mejoras/newCredits.png)
  
  #### 10.3.3. Selección de personajes.
  Con respecto a la escena de selección de personajes se ha implemntado un carrusel para aportarle más dinamismo al juego. En caso de que el jugador haya elegido  
  jugar en offline se accederá a la pantalla de selección de personaje, y una vez seleccionado volcerá a aprecer la pantalla para que pueda elegir el jugador 2.  
  Como restricción se ha añadido que en offline los jugadores no puedan elegir al mismo personaje.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Mejoras/newCharacter.png)
  
  #### 10.3.4. PostGame.  
  Finalmente la última mejora que se ha añadido es que en la escena postGame las acciones dejen de ser por teclado y se puedan manejar mediante botones.  
  
  ![No carga la imagen](https://github.com/YeronMartin/Animal-BOOM-Mayhem-/blob/main/Imagenes%20Interfaz/Mejoras/newPostGame.png)
  
  ## 11. Referencias
  La música se ha obtenido de la siguiente página:
  
   ● https://stock.adobe.com/es/
   
  Los efectos de sonido se han obtenido de la siguiente página:
  
  ● https://freesound.org/
  

  
   
  
  
  
  
  
  
  
  
  
