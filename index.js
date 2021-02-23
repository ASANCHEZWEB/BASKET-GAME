//MOVER TABLA

document.addEventListener(
  "keydown",
  (logKey = (e) => {
    if (e.code === "ArrowLeft" && Number(document.querySelector(".tabla").style.left.replace("px", "")) !== 1) {
      document.querySelector(".tabla").style.left = `${Number(document.querySelector(".tabla").style.left.replace("px", "")) - 15}px`;
    }
    if (e.code === "ArrowRight" && Number(document.querySelector(".tabla").style.left.replace("px", "")) !== 481) {
      document.querySelector(".tabla").style.left = `${Number(document.querySelector(".tabla").style.left.replace("px", "")) + 15}px`;
    }
  })
);

//GENERAR LOS 3 MUROS Y MOVERLOS
class Muro {
  constructor(speed, positionX, positionY, direction, number) {
    this.numberElement = number;
    this.speed = speed;
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
  }

  pintarMuro() {
    //pinta el muro
    let element = document.createElement("div");
    element.setAttribute("class", "muro");

    if (this.numberElement == 0) {
      this.positionY = 100;
    }
    if (this.numberElement == 1) {
      this.positionY = 200;
    }
    if (this.numberElement == 2) {
      this.positionY = 300;
    }
    element.setAttribute("style",`top:${this.positionY}px;left:${this.positionX}px`);
    document.querySelector(".containerJuego").appendChild(element);
  }
}
let muros = [];
for (let i = 0; i < 3; i++) {
  let muro = new Muro(
    Math.floor(Math.random() * (15 - 30)) + 15,
    Math.floor(Math.random() * (489 - 0)) + 0,
    0,
    Math.floor(Math.random() * (2 - 0)) + 0,
    i
  );
  muro.pintarMuro();
  muros.push(muro);
}

//MOVER MUROS

 muros.forEach((element) => {
   setInterval(() => {
     if (element.positionX == 0) {
       element.direction = 1;
     } else if (element.positionX == 488) {
       element.direction = 0;
     }

     if (element.direction === 1) {
       element.positionX++;
       document.querySelectorAll(".muro")[element.numberElement].style.left = `${element.positionX}px`;
     }
     if (element.direction === 0) {
       element.positionX--;
       document.querySelectorAll(".muro")[element.numberElement].style.left = `${element.positionX}px`;}
   }, element.speed);
 });

//CREAR PELOTA Y ANIMARLA CON COLISIONES
class Pelota {
  constructor(speed, directionY, directionX, left, top, run) {
    this.speed = speed;
    this.directionY = directionY;
    this.directionX = directionX;
    this.left = left;
    this.top = top;
    this.run = run;
  }

  pintarPelota() {
    document
      .querySelector(".pelota")
      .setAttribute("style", `top: ${this.top}px;left: ${this.left}px;`);
  }
  //comprobar si debe colisionar por debajo con un muro
  testBottomColision() {
    let state = false;
    muros.forEach((element, index) => {
      if ( this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 244 && index == 2 ) {
        state = true;
      }
      if (this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 193 && index == 1) {
        state = true;
      }
      if (this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 144 && index == 0) {
        state = true;
      }
    });
    return state;
  }
//comprobar si debe colisionar por encima con un muro
testTopColision() {
    let state = false;
    muros.forEach((element, index) => {
      if (this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 194 && index == 2) {
        state = true;
      }
      if (this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 143 && index == 1) {
        state = true;
      }
      if (this.left >= element.positionX - 10 && this.left < element.positionX + 120 && this.top - element.positionY == 94 && index == 0) {
        state = true;
      }
    });
    return state;
  }

  //comprobar si debe colisionar por la derecha con un muro
testRightColision() {
    let state = false;
    muros.forEach((element, index) => {
        if (index==0 && this.left==element.positionX+117&& this.top>=179 && this.top<=229) {
            state = true;
          }
          if (index==1 && this.left==element.positionX+117&& this.top>=335 && this.top<=385) {
            state = true;
          }
          if (index==2 && this.left==element.positionX+117&& this.top>=482 && this.top<=532) {
            state = true;
          }
    });
    return state;
  }
  //comprobar si debe colisionar por la izquierda con un muro
  testLeftColision() {
    let state = false;
    muros.forEach((element, index) => {
        if (index==0 && this.left==element.positionX-20 && this.top>=179 && this.top<=229) {
            state = true;
          }
          if (index==1 && this.left==element.positionX-20 && this.top>=335 && this.top<=385) {
            state = true;
          }
          if (index==2 && this.left==element.positionX-20 && this.top>=482 && this.top<=532) {
            state = true;
          }
    });
    return state;
  }

  move() {
    setInterval(() => {
      //ejes de arriba a abajo
      if (this.top == 0 || this.testBottomColision()) {
        this.directionY = "down";
      } else if (this.top == 660||this.testTopColision()) {
        this.directionY = "up";
      }
      //ejes de izquierda a derecha
      if (this.left == 0 || this.testRightColision()) {
        this.directionX = "right";
      } else if (this.left == 585 || this.testLeftColision()) {
        this.directionX = "left";
      }

      //mover pelota

      if (this.directionY == "up") {
        this.top--;
        document.querySelector(".pelota").style.top = `${this.top}px`;
      }
      if (this.directionY == "down") {
        this.top++;
        document.querySelector(".pelota").style.top = `${this.top}px`;
      }
      if (this.directionX == "left") {
        this.left--;
        document.querySelector(".pelota").style.left = `${this.left}px`;
      }
      if (this.directionX == "right") {
        this.left++;
        document.querySelector(".pelota").style.left = `${this.left}px`;
      }
    }, this.speed);
  }
}
//CREAR LA PELOTA
let pelota = new Pelota(5, "up", "left", 292, 634, false);
pelota.pintarPelota();

//Lanzarla
document.addEventListener(
  "keydown",
  (logKey = (e) => {
    if (e.code === "Space") {
      pelota.run = true;
      pelota.move();
    }
  })
);
