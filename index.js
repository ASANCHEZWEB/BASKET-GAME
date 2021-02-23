//MOVER TABLA

document.addEventListener(
  "keydown",
  (logKey = (e) => {
    if (
      e.code === "ArrowLeft" &&
      Number(document.querySelector(".tabla").style.left.replace("px", "")) !==
        1
    ) {
      document.querySelector(".tabla").style.left = `${
        Number(document.querySelector(".tabla").style.left.replace("px", "")) -
        15
      }px`;
    }
    if (
      e.code === "ArrowRight" &&
      Number(document.querySelector(".tabla").style.left.replace("px", "")) !==
        481
    ) {
      document.querySelector(".tabla").style.left = `${
        Number(document.querySelector(".tabla").style.left.replace("px", "")) +
        15
      }px`;
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
    element.setAttribute(
      "style",
      `top:${this.positionY}px;left:${this.positionX}px`
    );
    document.querySelector(".containerJuego").appendChild(element);
  }
}
let muros = [];
for (let i = 0; i < 3; i++) {
  let muro = new Muro(
    Math.floor(Math.random() * (100 - 500)) + 100,
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
      document.querySelectorAll(".muro")[
        element.numberElement
      ].style.left = `${element.positionX}px`;
    }
    if (element.direction === 0) {
      element.positionX--;
      document.querySelectorAll(".muro")[
        element.numberElement
      ].style.left = `${element.positionX}px`;
    }
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
      .setAttribute("style", `left: ${this.left}px;top: ${this.top}px;`);
  }
  move() {
    setInterval(() => {
      //ejes de arriba a abajo
      if (this.top == 0) {
        this.directionY = "down";
      } else if (this.top == 660) {
        this.directionY = "up";
      }
      //ejes de izquierda a derecha
      if (this.left == 0) {
        this.directionX = "right";
      } else if (this.left == 585) {
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
let pelota = new Pelota(1, "up", "left", 292, 634, false);
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
