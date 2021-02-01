class Carrousel {
  constructor(scene, front, back, left, right, numCharacter){

    //Escena
    this.scene = scene;

    //Planos del carrusel
    this.front = front;
    this.back = back;
    this.left = left;
    this.right = right;

    this.numCharacter = numCharacter; //numero de personajes
    this.elements_depth; //vector de profundidad
    this.elements_position; //vector de posiciones
    this.elements; //elementos visibles
    this.elementToSelect; //elemento a seleccionar
    this.currentElement; //Elemento actual seleccionado
    this.tweens;//vector de tweens

    this.characters  =  ["juani_carrousel", "juani_Cursed_carrousel", "gato_Finanzas_carrousel"];

    this.init();


  }

  //CLASE
  //Inicialización de la clase
  init(){

    this.elements_position = new Array (this.numCharacter);
    this.elements = new Array (this.numCharacter);
    this.elements_depth = new Array (this.numCharacter);
    this.tweens = new Array (this.numCharacter);

    this.elementToSelect = 0;
    this.currentElement = 0;

    this.initCarrosuel();

    var bottom = this.numCharacter/2;
    for (var i = 0; i < this.numCharacter; i++) {
      this.elements[i] = this.scene.add.image(this.elements_position[i].x, this.elements_position[i].y, this.characters[i]).setScale(.1);
      this.elements_depth[i] = (this.numCharacter + Math.abs (bottom - i));
      this.elements[i].setDepth(this.elements_depth[i]);
    }

    this.elements[0].setScale(.2);

  }

  // EXTRAAAS
  //rango de pertenencia
  between(a, b) {
    var min = a - 1,
    max = a + 1;

    return b > min && b < max;
  }

  //TWEENS
  //Creaccion de tweens
  addTween(gameObject, posX, posY, newPosX, newPosY, scale, newScale, depth, newDepth){
    var tween = this.scene.tweens.add({
      targets: gameObject,
      x: { from: posX, to: newPosX },
      y: { from: posY, to: newPosY },
      scale: {from: scale, to: newScale},
      //scaleY: {from: scaleY, to: newScaleY},
      ease: 'linear',
      duration: 1000,
      repeat: 0,
    });


    return tween;
  }

  //CARROUSEL
  //Inicializacion del carrusel
  initCarrosuel(){
    if (this.numCharacter% 2 == 0) {
      this.initPar();
    }else{
      this.initImpar();
    }
  };

  initPar (){

    var toBack = true;
    var y = this.front;
    var toLeft = true;
    var x = this.left - (this.left - this.right)/2;
    var times = 1;

    var yElapse = (this.numCharacter % 2 == 0)? (this.front - this.back)/(this.numCharacter*0.5) :
    (this.front - this.back)/this.numCharacter*0.5 -1;
    var xElapse = (this.numCharacter % 2 == 0)? (this.right - this.left)/(this.numCharacter*0.5) :
    (this.right - this.left)/this.numCharacter*0.5 -1;

    for (var i = 0; i < this.elements_position.length; i++) {
      this.elements_position [i] = new Phaser.Math.Vector2(x, y);
      if(toBack){
        if(this.between(this.back, y)){
          toBack = false;
          y+= yElapse
        }else{
          y+= -yElapse
        }
      }else {
        if(this.between(this.front, y)){
          toBack = true;
          y+= -yElapse;
        }else{
          y+= yElapse
        }
      }

      if(toLeft){
        if(this.between(this.left, x)){
          toLeft = false;
          x+= xElapse
        }else{
          x+= -xElapse
        }
      }else {
        if(this.between(this.right, x)){
          toLeft = true;
          x+= -xElapse;
        }else{
          x+= xElapse
        }
      }

    }
  }

  initImpar (){

    var toBack = true;
    var y = this.front;
    var toLeft = true;
    var x = this.left - (this.left - this.right)/2;
    var times = 1;

    var yElapse = (this.numCharacter % 2 == 0)? (this.front - this.back)/(this.numCharacter*0.5) :
    (this.front - this.back)/this.numCharacter*0.5 -1;
    var xElapse = (this.numCharacter % 2 == 0)? (this.right - this.left)/(this.numCharacter*0.5) :
    (this.right - this.left)/this.numCharacter*0.5 -1;

    for (var i = 0; i < this.elements_position.length; i++) {
      this.elements_position [i] = new Phaser.Math.Vector2(x, y);
      if(toBack){
        if(this.between(this.back, y)){
          toBack = false;
          y+= yElapse
        }else{
          y+= -yElapse
        }
      }else {
        if(this.between(this.front, y)){
          toBack = true;
          y+= -yElapse;
        }else{
          y+= yElapse
        }
      }

      if(toLeft){
        if(this.between(this.left, x)){
          toLeft = false;
          x+= xElapse
        }else{
          x+= -xElapse
        }
      }else {
        if(this.between(this.right, x)){
          toLeft = true;
          x+= -xElapse;
        }else{
          x+= xElapse
        }
      }

    }

    this.elements_position [1] = new Phaser.Math.Vector2(this.left, this.back);
    this.elements_position [2] = new Phaser.Math.Vector2(this.right, this.back);


  }

  //Mover el carrusel a la derecha
  moveCarrouselRight(){
    this.elementToSelect++;
    this.elementToSelect = this.elementToSelect % this.elements.length;

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].setDepth(this.elements_depth[(this.elementToSelect+ i)%this.numCharacter]);
      this.tweens[i] = this.addTween(this.elements[i],this.elements[i].x, this.elements[i].y,
      this.elements_position[(this.elementToSelect+ i)%this.numCharacter].x,
      this.elements_position[(this.elementToSelect+ i)%this.numCharacter].y,
      0.1, 0.1,
       this.elements_depth[(this.elementToSelect+ i)%this.numCharacter],
       this.elements_depth[i]
    )
    }
  };

  //Mover el carrusel a la izquierda
  moveCarrouselLeft(){
    this.elementToSelect--;
    this.elementToSelect = (this.elementToSelect >= 0)? (this.elementToSelect % this.elements.length) : (this.numCharacter -1);

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].setDepth(this.elements_depth[(this.elementToSelect+ i)%this.numCharacter]);
      this.tweens[i] = this.addTween(this.elements[i],this.elements[i].x, this.elements[i].y,
      this.elements_position[(this.elementToSelect+ i)%this.numCharacter].x,
      this.elements_position[(this.elementToSelect+ i)%this.numCharacter].y,
      0.1, 0.1,
       this.elements_depth[(this.elementToSelect+ i)%this.numCharacter],
       this.elements_depth[i]
    )
    }
  };

  //re escalado a la derecha
  reScaleRight(){
  var i = this.elementToSelect;
  var a = (this.numCharacter-i+1) % this.numCharacter;
  var b = (this.numCharacter-i) % this.numCharacter;



  this.tweens[a] =
  this.addTween(this.elements[a],
  this.tweens[a].data[0].getStartValue(),
  this.tweens[a].data[1].getStartValue(),
  this.tweens[a].data[0].getEndValue(),
  this.tweens[a].data[1].getEndValue(),
  0.2, 0.1
  );
  this.currentElement = b;

  this.tweens[b] =
  this.addTween(this.elements[b],
  this.tweens[b].data[0].getStartValue(),
  this.tweens[b].data[1].getStartValue(),
  this.tweens[b].data[0].getEndValue(),
  this.tweens[b].data[1].getEndValue(),
  0.1, 0.2
)
};

  //re escalado a la izquierda
  reScaleLeft(){
    var i = this.elementToSelect;
    var a = (this.numCharacter-i) % this.numCharacter;
    var b = (this.numCharacter-i-1) % this.numCharacter;


    this.tweens[a] =
    this.addTween(this.elements[a],
    this.tweens[a].data[0].getStartValue(),
    this.tweens[a].data[1].getStartValue(),
    this.tweens[a].data[0].getEndValue(),
    this.tweens[a].data[1].getEndValue(),
    0.1, 0.2
    )

    this.currentElement = a;

    this.tweens[b] =
    this.addTween(this.elements[b],
    this.tweens[b].data[0].getStartValue(),
    this.tweens[b].data[1].getStartValue(),
    this.tweens[b].data[0].getEndValue(),
    this.tweens[b].data[1].getEndValue(),
    0.2, 0.1
    )
  };

  //update derecha
  updateRight(){
    this.moveCarrouselRight();
    this.reScaleRight();
  };

  //updateLeft(){
  updateLeft(){
    this.moveCarrouselLeft();
    this.reScaleLeft();
  };

  selectItem (i){
    this.tweens[i] = this.addTween(
    this.elements[i],
    this.elements_position[i].x,
    this.elements_position[i].x,
    this.elements_position[i].y,
    this.elements_position[i].y,
    0.2, 0.25
    )
  }

  getCurrent (){
    var charCurrent;
    if (this.currentElement == 0){
      return 'juani';
    } else if (this.currentElement == 1){
      return 'juani_Cursed';
    }else if (this.currentElement == 2){
      return 'gato_Finanzas'
    }

  }
};
