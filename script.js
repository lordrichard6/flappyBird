var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

// Load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeDown.src = "images/pipeDown.png";

// Variables
var gap = 85; //Gap between the pipes
var constant = pipeUp.height + gap;

let bX = 10; //Bird X position
let bY = 150; //Bird Y position

let gravity = 1;

// On click
function moveUp() {
    bY -= 20;
}
document.addEventListener("keydown", moveUp)
document.addEventListener("click", moveUp)

// Pipe coordinates
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

// Draw pics
function draw() {
    // Show the images (image, X pos, Y pos)
    ctx.drawImage(bg ,0 ,0);  

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp ,pipe[i].x ,pipe[i].y);
        ctx.drawImage(pipeDown ,pipe[i].x ,pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 100) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
    }
    

    ctx.drawImage(fg ,0 ,cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);
    
    bY += gravity; //Gravity animation

    requestAnimationFrame(draw); //Show the animation
}

draw();