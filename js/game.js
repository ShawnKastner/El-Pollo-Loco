let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
background_music = new Audio('audio/backgroundMusic.mp3');


function init() {
    initLevel();
    removeClasses();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bgMusic();
}

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function removeClasses() {
    document.getElementById('startScreen').classList.add('dNone');
    document.getElementById('canvas').classList.remove('dNone');
}

function bgMusic() {
    background_music.volume = 0.2;
    background_music.loop = true;
    background_music.play();
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});