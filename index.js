//eliminar cuatro de bienvenida
let deleteStart = () => {

    document.querySelector('.displayGame').style.display = "none";
    document.getElementById("bgMusic").play()

}

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
        element.setAttribute("style", `top:${this.positionY}px;left:${this.positionX}px`);
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
            document.querySelectorAll(".muro")[element.numberElement].style.left = `${element.positionX}px`;
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
        this.myCounter;
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
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 243 && this.top - element.positionY < 245 && index == 2) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 193 && this.top - element.positionY < 195 && index == 1) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 143 && this.top - element.positionY < 145 && index == 0) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
        });
        return state;
    }
    //comprobar si debe colisionar por encima con un muro
    testTopColision() {
        let state = false;
        muros.forEach((element, index) => {
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 173 && this.top - element.positionY < 175 && index == 2) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 123 && this.top - element.positionY < 125 && index == 1) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (this.left >= element.positionX - 25 && this.left < element.positionX + 125 && this.top - element.positionY > 73 && this.top - element.positionY < 75 && index == 0) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeY');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
        });
        return state;
    }

    //comprobar si debe colisionar por la derecha con un muro
    testRightColision() {
        let state = false;
        muros.forEach((element, index) => {
            if (index == 0 && this.left < element.positionX + 117 && this.left > element.positionX + 110 && this.top >= 175 && this.top <= 231) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (index == 1 && this.left < element.positionX + 117 && this.left > element.positionX + 110 && this.top >= 330 && this.top <= 390) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (index == 2 && this.left < element.positionX + 117 && this.left > element.positionX + 110 && this.top >= 477 && this.top <= 537) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
        });
        return state;
    }
    //comprobar si debe colisionar por la izquierda con un muro
    testLeftColision() {
        let state = false;
        muros.forEach((element, index) => {
            if (index == 0 && this.left > element.positionX - 20 && this.left < element.positionX - 15 && this.top >= 175 && this.top <= 231) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (index == 1 && this.left > element.positionX - 20 && this.left < element.positionX - 15 && this.top >= 330 && this.top <= 390) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
            if (index == 2 && this.left > element.positionX - 20 && this.left < element.positionX - 15 && this.top >= 477 && this.top <= 537) {
                state = true;
                document.querySelectorAll('.muro')[index].setAttribute('class', 'muro animate__animated animate__shakeX');
                setTimeout(() => {
                    document.querySelectorAll('.muro')[index].setAttribute('class', 'muro');
                }, 1000);
            }
        });
        return state;
    }
    //comprobar si colisiona con la tabla
    testTablaColision() {
        let state = false;
        let positionTabla = Number(document.querySelector(".tabla").style.left.replace("px", ""));
        if (this.left > positionTabla - 20 && this.left < positionTabla + 137 && this.top == 634) {
            state = true;
            document.querySelector('.tabla').setAttribute('class', 'tabla animate__animated animate__wobble');
            setTimeout(() => {
                document.querySelector('.tabla').setAttribute('class', 'tabla');
            }, 1000);
        }
        return state;
    }
    //comprobar si colisiona con la campana
    sumarUno() {
        this.myCounter = setTimeout(function () {
            document.querySelector('.counterScore').innerHTML = Number(document.querySelector('.counterScore').innerHTML) + 1;
        }, 100);
    }
    myStopSumarUno() {
        clearTimeout(this.myCounter);
    }

    testCampanaColision() {
        if (this.left > 260 && this.left < 327 && this.top < 75) {
            document.getElementById("campana").play()
            document.querySelector('.campana').setAttribute('class', 'campana animate__animated animate__swing');
            setTimeout(() => {
                document.querySelector('.campana').setAttribute('class', 'campana');
                this.myStopSumarUno();
                this.sumarUno();
            }, 1000);
        }
    }


    gameOver() {
        this.top = 2;
        this.left = 2;
        this.run = false;
        document.getElementById('bote').pause();
        document.getElementById('bote').currentTime = 0;
        document.getElementById('bgMusic').pause();
        document.getElementById('bgMusic').currentTime = 0;
        document.getElementById('surprise').play();
        document.querySelector('.animationGame').setAttribute('class', 'animationGame animate__animated animate__hinge');
        setTimeout(() => {
            document.querySelector('.containerReStart').style.display = "flex";
            document.getElementById('troll').play();
            document.querySelectorAll('#bgMusic')[1].play()
            document.querySelector('.scoreGameOver').innerHTML = "Score: " + document.querySelector('.counterScore').innerHTML;
        }, 2000);
    }
    move() {
        setInterval(() => {
            //comprobacion choque campana
            this.testCampanaColision()
            //comprobación game over
            if (this.top == 713) {
                this.run = false;
                this.gameOver();
            }
            //ejes de arriba a abajo
            if (this.top == 0 || this.testBottomColision() && this.run == true) {
                document.getElementById("bote").play()
                this.directionY = "down";
            } else if (this.top == 713 || this.testTopColision() || this.testTablaColision() && this.run == true) {
                document.getElementById("bote").play()
                this.directionY = "up";
            }
            //ejes de izquierda a derecha
            if (this.left == 0 || this.testRightColision() && this.run == true) {
                document.getElementById("bote").play()
                this.directionX = "right";
            } else if (this.left == 585 || this.testLeftColision() && this.run == true) {
                document.getElementById("bote").play()
                this.directionX = "left";
            }

            //mover pelota

            if (this.directionY == "up" && this.run == true) {
                this.top--;
                document.querySelector(".pelota").style.top = `${this.top}px`;
            }
            if (this.directionY == "down" && this.run == true) {
                this.top++;
                document.querySelector(".pelota").style.top = `${this.top}px`;
            }
            if (this.directionX == "left" && this.run == true) {
                this.left--;
                document.querySelector(".pelota").style.left = `${this.left}px`;
            }
            if (this.directionX == "right" && this.run == true) {
                this.left++;
                document.querySelector(".pelota").style.left = `${this.left}px`;
            }
        }, this.speed);
    }
}
//CREAR LA PELOTA
let pelota = new Pelota(5, "up", "left", 292, 634, false);
pelota.pintarPelota();

//LANZAR PELOTA Y MOVER DE DERECHA A IZQUIERDA LA TABLA
let moveRightInterval = "";
let moveRight = () => {
    if (Number(document.querySelector(".tabla").style.left.replace("px", "")) < 489) {
        document.querySelector(".tabla").style.left = `${Number(document.querySelector(".tabla").style.left.replace("px", "")) + 1}px`;
    }
}
let moveLeftInterval = "";
let moveLeft = () => {
    if (Number(document.querySelector(".tabla").style.left.replace("px", "")) > 0) {
        document.querySelector(".tabla").style.left = `${Number(document.querySelector(".tabla").style.left.replace("px", "")) - 1}px`;
    }
}

let pulsadaA = false;
let pulsadaD = false;
document.addEventListener("keydown", (logKey = (e) => {
    if (e.code === "Space" && document.querySelector('.displayGame').style.display === "none") {
        pelota.run = true;
        document.querySelector('.pelota').setAttribute('class', 'pelota')
        pelota.move();
    }
    if (e.code === "ArrowLeft" && document.querySelector('.displayGame').style.display === "none") {
        if (pulsadaA !== true) {
            pulsadaA = true;
            moveLeftInterval = setInterval(moveLeft, 1);
        }
    }
    if (e.code === "ArrowRight" && document.querySelector('.displayGame').style.display === "none") {
        if (pulsadaD !== true) {
            pulsadaD = true;
            moveRightInterval = setInterval(moveRight, 1);
        }
    }
}));

document.addEventListener("keyup", (logKey = (e) => {
    if (e.code === "ArrowLeft") {
        clearInterval(moveLeftInterval);
        pulsadaA = false;
    }
    if (e.code === "ArrowRight") {
        clearInterval(moveRightInterval);
        pulsadaD = false;
    }
}));