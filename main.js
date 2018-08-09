const csv = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,0,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1';
const template = csv.replace(/,/g,'');
var grid = new Array(21);
const BLOCKSIZE = 15;
var canvasElements = [];

let count = 0;
for (i = 0; i < 21; i++) {
    grid[i] = new Array(31);
    for (j = 0; j < 31; j++) {
        grid[i][j] = template.slice(count, ++count);
    }
}

const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

canvasElements.push(new PlayerBlock(15,12));

for (i = 0; i < 21; i++) {
    for (j = 0; j < 31; j++) {
        if (grid[i][j] == 1) {
            canvasElements.push(new SolidBlock(j,i));
        }
    }
}

redraw();

var upKey, downKey, leftKey, rightKey;
upKey = downKey = leftKey = rightKey = false;

setInterval(() => {
    if (upKey) {
        canvasElements[0].moveUp();
    }
    if (downKey) {
        canvasElements[0].moveDown();
    }
    if (leftKey) {
        canvasElements[0].moveLeft();
    }
    if (rightKey) {
        canvasElements[0].moveRight();
    }
    redraw();
}, 1000/30);

document.addEventListener('keydown', (event) => {
    let key = event.keyCode;
    switch (key) {
        case 37:
            leftKey = true;
            break;
        case 38:
            upKey = true;
            break;
        case 39:
            rightKey = true;
            break;
        case 40:
            downKey = true;
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (event) => {
    let key = event.keyCode;
    switch (key) {
        case 37:
            leftKey = false;
            break;
        case 38:
            upKey = false;
            break;
        case 39:
            rightKey = false;
            break;
        case 40:
            downKey = false;
            break;
        default:
            break;
    }
});



function PlayerBlock(xpos,ypos) {
    this.xCoord = xpos*BLOCKSIZE + 7;
    this.yCoord = ypos*BLOCKSIZE + 7;
    this.draw = () => {
        ctx.fillStyle = "#FFC000";
        ctx.beginPath();
        ctx.arc(this.xCoord,this.yCoord,7,0,2*Math.PI);
        ctx.fill();
    }
    this.moveUp = () => {
        this.yCoord--;
    }
    this.moveDown = () => {
        this.yCoord++;
    }
    this.moveLeft = () => {
        this.xCoord--;
    }
    this.moveRight = () => {
        this.xCoord++;
    }
}

function SolidBlock(xpos, ypos) {
    this.xCoord = xpos*BLOCKSIZE;
    this.yCoord = ypos*BLOCKSIZE;
    this.draw = () => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.xCoord, this.yCoord, BLOCKSIZE, BLOCKSIZE);
    }
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasElements.forEach(canvasElement => {
        canvasElement.draw();
    });
}