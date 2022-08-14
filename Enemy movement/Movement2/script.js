/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 50;
const enemyArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './resources/enemy2.png'
        this.speedX = Math.random() * 4 + 1;
        this.speedY = Math.random() * 4 - 2;
        this.amplitude = Math.random()*500;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.scale = Math.random()*0.75+0.25;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.x = Math.random() * 1.5 * CANVAS_WIDTH;
        this.yStart = Math.random() * (CANVAS_HEIGHT - this.height);
        this.y = 0;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 2);
        this.angle = 0;
        this.frequency = Math.random()*1;
    }
    update(){

        this.x -= this.speedX;
        this.y = this.yStart + this.amplitude * Math.sin(this.frequency*this.angle*Math.PI/180);

        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++
        }

        if (this.x < 0 - this.width) { this.x = CANVAS_WIDTH } 
        
        this.angle++

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
