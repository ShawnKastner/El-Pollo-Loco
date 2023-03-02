let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
background_music = new Audio('audio/backgroundMusic.mp3');
let gameIsOver = false;


function init() {
    initLevel();
    removeClasses();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, gameIsOver);
    bgMusic();
}

function restartGame() {
    init();
    removeGameOverScreen();
    gameIsOver = false;
}

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function removeClasses() {
    document.getElementById('startScreen').classList.add('dNone');
    document.getElementById('canvas').classList.remove('dNone');
}

function removeGameOverScreen() {
    document.getElementById('gameOverScreenContainer').classList.add('dNone');
}

function bgMusic() {
    background_music.volume = 0.2;
    background_music.loop = true;
    background_music.play();
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

function openFullscreen() {
    let openFullscreen = document.getElementById('fullscreen');
    enterFullscreen(openFullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
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