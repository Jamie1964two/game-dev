/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 10
const enemyArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './resources/enemy1.png'
        this.changeDirection = Math.floor(Math.random()*50+10);
        this.directionCount = 0;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.scale = Math.random()*0.75+0.25;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 2);
    }
    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++
        }

        if (this.directionCount > this.changeDirection) {
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.directionCount = 0;
        }

        if (this.x > CANVAS_WIDTH-this.width) { this.speedX = Math.random() * 4 - 5; this.directionCount = 0; }
        if (this.x < 0) { this.speedX = Math.random() * 4 + 2; this.directionCount = 0; }                    
        if (this.y > CANVAS_HEIGHT-this.height) { this.speedY = Math.random() * 4 - 5; this.directionCount = 0; }
        if (this.y < 0) { this.speedY = Math.random() * 4 + 2; this.directionCount = 0; }

        this.directionCount++
    }

    changeDirection(){

    }

    draw(){
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
};


//createEnemies
    
for (let i=0; i< numberOfEnemies; i++){
    enemyArray.push(new Enemy())
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyArray.forEach(element => {     
        element.update();
        element.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}

animate()
