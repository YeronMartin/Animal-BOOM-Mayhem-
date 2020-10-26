# Animal BOOM Mayhem

# Documento de diseño

```
19 de Octubre de 2020
Grupo 5:
Carlos del Águila Mateu
Jesús David Rojo Martín
Maria Busto Ramos
Yerón Martín Sánchez
```

## ÍNDICE

- Cambios
- Introducción
   - Concepto del juego
   - Características principales
   - Género
   - Propósito y público objetivo
   - Jugabilidad
   - Estilo visual
   - Alcance
- Mecánicas
   - Flujo de juego
   - Personajes
   - Tipo de cámara
   - Controles
   - Colisiones
   - Reglas de interacciones
   - Niveles
   - Objetos lanzables
   - Progresión del jugador
- Interfaz
   - Diagrama de flujo
   - Menú principal
   - Créditos
   - Menú de ajustes
   - Modo de conexión
   - Modo de juego
   - Selección de personaje
   - Menú de opciones de partida
   - Selección de escenario
   - Tutorial
   - Pantalla de batalla
   - Ventana de victoria


## 1. Cambios
​En este apartado se mostrarán las versiones del documento de diseño del juego.


## 2. Introducción
Sirva este documento como documento de diseño del juego ​ _Animal BOOM
Mayhem,_ un juego multijugador en línea que implementa una versión renovada y
divertida del balón prisionero. Su principal objetivo es mostrar y explicar los
elementos que va a incluir ​ _Animal BOOM Mayhem_ ​.
### 2.1. Concepto del juego
_Animal BOOM Mayhem_ es un juego competitivo en línea en el que cada jugador
toma el control de un animal que competirá en un torneo de balón prisionero para
hacerse con la “​ _corona explosiva_ ​”.
### 2.2. Características principales
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


### 2.3. Género
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
### 2.4. Propósito y público objetivo
El propósito principal de ​ _Animal BOOM Mayhem_ es ofrecer a los jugadores un
videojuego multijugador en línea frenético y sencillo con el que puedan entretenerse
al estilo de los juegos arcade.  
_Animal BOOM Mayhem_ es un juego cuyo público objetivo son todas las edades
debido a su estética arcade y sus mecánicas fáciles de entender para cualquier
persona independientemente de la edad. Además, como la historia del juego es muy
básica, los usuarios pueden jugar ​ _Animal BOOM Mayhem_ en cualquier momento
libre que tengan.


### 2.5. Jugabilidad
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
### 2.6. Estilo visual
_Animal BOOM Mayhem_ se caracteriza por tener un estilo visual muy simple y con
estética cartoon ya que, al tratarse de un juego desenfadado, se ha preferido optar
por una opción visual menos detallada y compleja.
Por lo tanto, en el diseño de tanto los personajes como de los escenarios,
emplearemos colores saturados y diseños divertidos. En cuanto a sombreado
emplea la técnica “cell-shading”, por seguir la línea estética del juego.
### 2.7. Alcance
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
3.2. Personajes
Todos los personajes son animales humanoides y comparten las mismas
características a nivel jugable. Cada jugador podrá elegir el personaje que quiera
antes de empezar una partida. Lo único que diferencia un personaje de otro es su
aspecto.
El jugador puede desbloquear nuevos personajes y atuendos a medida que juega
partidas.


### 3.3. Tipo de cámara
_Animal BOOM Mayhem_ presenta una cámara cenital centrada en el escenario para
que el jugador pueda ver en todo momento, no solo su personaje sino, también, a
sus adversarios, el entorno y los objetos con los que puede interactuar, los cuales
van a ser muy importantes para el desarrollo de la partida.
### 3.4. Controles
A continuación, se puede observar una tabla que recoge los controles
principales de los jugadores en ​ _Animal BOOM Mayhem_ ​:
**Jugador 1 Jugador 2
Movimiento** W, A, S, D^ I, J, K, L^
**Recoger/Lanzar
bola**

### E O

**Agacharse** R^ P^
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
temporizador de 5 a 10 segundos tras ser lanzada. No explota al caer
al suelo.
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
### 4.1. Diagrama de flujo
A continuación, se puede observar el diagrama de flujo de ​ _Animal BOOM Mayhem_
que muestra las pantallas del juego y la relación entre estas.


### 4.2. Menú principal
Aquí se puede observar un boceto de la pantalla de ​ _Menú Principal_ ​:
Lista y descripción de todos los elementos de la pantalla:
● **Logo del juego:** una imagen 2D correspondiente al logo y título del
juego ​ _Animal BOOM Mayhem_ ​.
**● Botón de jugar:** ​al pulsarlo lleva a la pantalla de​ _Modo de Conexión_ ​.
**● Botón de opciones:** ​al pulsarlo lleva al ​ _Menú de Opciones_ ​.
**● Botón de créditos:** ​al pulsarlo lleva a la pantalla de ​ _Créditos_ ​.
**● Botón de salir:** ​al pulsarlo lleva de vuelta al Sistema Operativo.


### 4.3. Créditos
La siguiente imagen muestra el interfaz de la pantalla ​ _Créditos._
Lista y descripción de todos los elementos de la pantalla:
● **Nombres del equipo:** panel que muestra el nombre de cada
uno de los integrantes del equipo desarrollador del juego.
### 4.4. Menú de ajustes
La siguiente imagen es un prototipo del interfaz de la pantalla de ajustes del juego.


Lista y descripción de todos los elementos de la pantalla:
● **Botones de la izquierda (Sonido, Brillo e Interfaz):** estos
botones permiten al jugador hacer ajustes sobre el juego. Una
vez se pulsen se podrán acceder a unos ajustes más
específicos por cada una de las modalidades.
● **Botones del interfaz:** ventana en la que se muestran las
propiedades a modificar de cada una de las modalidades que
vienen descritas en la imagen, en este caso se habría pulsado
sobre el botón ​ _Interfaz._


### 4.5. Modo de conexión
Aquí se puede observar un boceto de la pantalla de selección del ​ _Modo de
Conexión_ ​:
Lista y descripción de todos los elementos de la pantalla:
● **Flecha:** ​ al pulsarla lleva de vuelta al ​ _Menú Principal_ ​.
● **Botón de local:** al pulsarlo el jugador activa el modo de conexión local
y pasa a la pantalla de ​ _Modo de Juego_ ​.
● **Botón de en línea:** al pulsarlo el jugador activa el modo de conexión
online y pasa a la pantalla de ​ _Modo de Juego_ ​.
### 4.6. Modo de juego
Aquí se puede observar un boceto de la pantalla de selección del ​ _Modo de Juego_ ​:


Lista y descripción de todos los elementos de la pantalla:
● **Flecha:** ​ al pulsarla lleva de vuelta a la pantalla de ​ _Modo de Conexión_ ​.
● **Botón de todos contra todos:** al pulsarlo, el jugador activa el modo
de juego todos contra todos y pasa a la pantalla de ​ _Selección de
Personaje_ ​.
● **Botón de en equipo:** al pulsarlo, el jugador activa el modo de juego
en equipo y pasa a la pantalla de ​ _Selección de Personaje_ ​.
4.7. Selección de personaje
Aquí se puede observar un boceto de la pantalla de ​ _Selección de Personaje_ ​:


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


4.8. Menú de opciones de partida
En la siguiente imagen se muestra la pantalla con los ajustes que se podrán hacer
sobre las partidas.
Lista y descripción de todos los elementos de la pantalla:
● **Rondas:** en este grupo de botones se podrán cambiar el
número de rondas que se jugarán por partida.
● **Duración:** permite determinar la cantidad de tiempo por ronda
que se consumirá.
● **Vida:** con este conjunto de botones se le permite al jugador
escoger cuánta vida tendrá por cada ronda.
● **Jugadores:** con el botón ​ _Jugadores_ ​el creador de la partida
puede seleccionar cuantos miembros formarán parte de ella.


### 4.9. Selección de escenario
Aquí se puede observar un boceto de la pantalla de ​ _Selección de Escenario_ ​:
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


### 4.10. Tutorial
La siguiente imagen muestra el interfaz de la pantalla ​ _Tutorial._
Lista y descripción de todos los elementos de la pantalla:
● **Maniquí:** es el objeto sobre el que el jugador lanzará sus
ataques y sobre el que ensayarán durante el tutorial del juego.
● **Jugador:** ​ es el elemento sobre el que el jugador interactúa.
● **Texto emergente:** panel en el que van apareciendo las
instrucciones del juego, cómo moverse, esquivar, lanzar..


### 4.11. Pantalla de batalla
Sirva la siguiente imagen para ilustrar la pantalla ​ _Partida._
Lista y descripción de todos los elementos de la pantalla:
● **Tiempo:** muestra el tiempo restante que queda para terminar la
ronda que se está jugando.
● **Jugador:** ​ es el elemento sobre el que el jugador interactúa.
● **Vida:** el elemento ​ _Vida_ se representa como un círculo en los
pies del jugador y se dividen en la cantidad de puntos de vida
que se haya elegido antes de empezar la vida. Representa la
cantidad de puntos de vida que tiene el jugador


### 4.12. Ventana de victoria
Aquí se puede observar un boceto de la ​ _Ventana de Victoria_ ​:
Lista y descripción de todos los elementos de la pantalla:
● **Ganador:** panel que muestra el nombre del jugador o equipo
que ha ganado la partida.
● **Acciones con teclas:** pequeña ventana que muestra las teclas
que se deben presionar para: volver a jugar la partida , volver a
la pantalla de ​ _selección de personajes_ o regresar al ​ _Menú
Principal_ ​.


