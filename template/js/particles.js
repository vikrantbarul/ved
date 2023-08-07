// Particles JS Effect
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
// Canvas Width and Hight
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
// Bank Particale Array Initialize 
let particlesArray;
// #############
// Mouse Array #
// #############
let mouse = {
    x: null,
    y: null,
    radius: (canvas.width / 90) * (canvas.height / 90)
};
// ######################
// Mouse Event Listener #
// ######################
window.addEventListener("mousemove", function (event) {
    // event.x contain mouse pointer x axis on window
    // event.y contain mouse pointer y axis on window
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(event);
});
// ########################
// Particles Create Class #
// ########################
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Draw Individual Particale
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // Check Mouse Position
    // Cleck Particles Postiton
    // Draw the particles
    // Move the Particale
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        // Pythagoras theorem
        // hypotenuse * hypotenuse = tangent * tangent + base * base
        // hypotenuse = square root ( tangent * tangent + base * base )
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // Move Particle
        this.x += this.directionX;
        this.y += this.directionY;
        // Draw Particle
        this.draw();
    }
}
// ##########################
// Createing Particle Array #
// ##########################
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 5 - 2.5;
        let directionY = Math.random() * 5 - 2.5;
        let color = "rgb(255, 255, 255)";

        particlesArray.push(
            new Particle(x, y, directionX, directionY, size, color)
        );
    }
}
// #################################
// Createing line between Particle #
// #################################
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance =
                ((particlesArray[a].x - particlesArray[b].x) *
                (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) *
                (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.lineWidth = .4;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
// ################
// Animation Loop #
// ################
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

init();
animate();
