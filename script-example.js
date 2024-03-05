let speed = 3;

//=====================================
// Playfield Objekt
//=====================================
let playfield = {
    x: 0,
    y: 0,
    elem: document.getElementById("playfield"),
    right: function(){
        if (this.x>-4200) { this.x -= speed;}
    },
    left: function(){
        if (this.x<0) { this.x += speed; }
    },
    draw: function(){
        this.elem.style.transform = 'translateX('+this.x+'px)';
    }
};


//=====================================
// Player Klasse
//=====================================
class Player{
    constructor(name, x, y){
        this.name = name;
        this.player = document.getElementById(name);
        this.skin = document.getElementById(name+"-skin");
        
        this.x = x;
        this.y = y;
        this.w = 150;
        this.h = 100;

        this.speed = 3;
        this.minX = 300;
        this.maxX = 4600;
        this.minY = -130;
        this.maxY = 470;
    }


    up(){
        if (this.y > this.minY){this.y -= this.speed;}
    }

    down(){
        if (this.y < this.maxY){this.y +=this.speed;}
    }
    
    left(){
        if (this.x>this.minX){this.x -= this.speed;}
    }
    
    right(){
        if (this.x<this.maxX){ this.x += this.speed;}
    } 

    draw(cmd){
        this.player.style.transform = 'translate('+this.x+'px,'+this.y+'px)';
        this.skin.className=cmd;
    }
}


const player = new Player('player',410,180);


//=====================================
// Game Loop
//=====================================
let run = false;


// Start and Stop Game OnClick
document.onclick = () =>  {(run) ? stopGame() : startGame(); run = !run;};


function startGame(){
    info.innerText = 'Use "a" or "d" key for moving "left" or "right".';
    requestAnimationFrame(gameLoop,10);
}

function stopGame(){
    info.innerText = "Game paused, click to resume";
    cancelAnimationFrame(gameLoop);
}

let gameLoop = function(){
    if (!cmd.includes('stay')) {
        if (cmd.includes('right')) { 
            playfield.right();
            player.right();
        }
        else if (cmd.includes('left')) { 
            playfield.left();
            player.left();
        }
        if (cmd.includes('up')){ 
            player.up();
        }
        else if (cmd.includes('down')) { 
            player.down();
        }
    }
  info.innerText = 'Use "a" or "d" key for moving "left" or "right".';
  
    playfield.draw();
    player.draw(cmd); 
    requestAnimationFrame(gameLoop,10);
};


//=====================================
// Tastaturabfrage
//=====================================

globalThis.addEventListener('down', onkeydown, false);
globalThis.addEventListener('up', onkeyup, false);

let cmd = "stay-right";
let keys = {};
onkeydown = onkeyup = (e) => {
    keys[e.code] = e.type == 'keydown';    
    if ((keys.KeyW && keys.KeyD))       { cmd = "run-up-right";}
    else if (keys.KeyS && keys.KeyD)    { cmd = "run-down-right";}
    else if (keys.KeyW && keys.KeyA)    { cmd = "run-up-left";}
    else if (keys.KeyS && keys.KeyA)    { cmd = "run-down-left";}
    else if (keys.KeyW)                 { cmd = "run-up";}
    else if (keys.KeyD)                 { cmd = "run-right";}
    else if (keys.KeyS)                 { cmd = "run-down";}
    else if (keys.KeyA)                 { cmd = "run-left";}
    else  {
        if (cmd.includes('left'))       { cmd = "stay-left";}
        else if (cmd.includes('right')) { cmd = "stay-right";}
        else if (cmd.includes('up'))    { cmd = "stay-up";}
        else if (cmd.includes('down'))  { cmd = "stay-down";}
    }
};