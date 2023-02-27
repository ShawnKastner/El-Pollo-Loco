let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
background_music = new Audio('audio/backgroundMusic.mp3');
background_music.volume = 0.2;
background_music.loop = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


    console.log('My character is', world.character)
}

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function startGame() {
    document.getElementById('startScreen').style = 'display: none';
    document.getElementById('canvas').style = 'display: unset';
    background_music.play();
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});