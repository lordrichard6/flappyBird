//Select the Canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Variables
let frames = 0;

//Load main image
const mainImg = new Image();
mainImg.src = 'img/main.png';

//Game state
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

//Control the Game
function gameState(evt) {
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            bird.flap();
            break;
        case state.over:
            state.current = state.getReady;
            break;
    }
}
cvs.addEventListener('click', gameState)
document.addEventListener('keydown', gameState)
cvs.addEventListener('touchstart', gameState)

//Backround
const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw : function() {
        ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

//Foreground
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    draw : function() {
        ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
}

//Bird
const bird = {
    animation : [
        {sX: 276, sY: 112},
        {sX: 276, sY: 139},
        {sX: 276, sY: 164},
        {sX: 276, sY: 139}
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    frame: 0,

    draw: function() {
        let bird = this.animation[this.frame];

        ctx.drawImage(mainImg, bird.sX, bird.sY, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    },

    flap : function() {

    },
}

//Start
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width/2 - 173/2,
    y: 80,

    draw : function() {
        if (state.current == state.getReady){
            ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }   
    }
}

//Game over
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width/2 - 225/2,
    y: 90,

    draw : function() {
        if (state.current == state.over) {
            ctx.drawImage(mainImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//Draw
function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

//Update
function update() {

}

//Animation
function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}
loop();