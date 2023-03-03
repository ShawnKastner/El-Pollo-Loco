let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
background_music = new Audio('audio/backgroundMusic.mp3');
let gameIsOver = false;


function init() {
    initLevel();
    bindBtnPress();
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
    // if(window.innerHeight <= 480) {
    //     document.getElementById('hud').classList.remove('dNone');
    // } 
    document.getElementById('btnLeft').classList.remove('dNone');
    document.getElementById('btnRight').classList.remove('dNone');
    document.getElementById('btnUp').classList.remove('dNone');
    document.getElementById('btnThrow').classList.remove('dNone');
}

function removeGameOverScreen() {
    document.getElementById('gameOverScreenContainer').classList.add('dNone');
}

function bgMusic() {
    background_music.volume = 0.2;
    background_music.loop = true;
    background_music.play();
}

function muteBgMusic() {
    if (background_music.muted == false) {
        background_music.muted = true;
    } else {
        background_music.muted = false;
    }
}

function showInstructions() {
    let showInstructions = document.getElementById('instructions');
    if (showInstructions.classList.contains('dNone')) {
        showInstructions.classList.remove('dNone');
    } else {
        showInstructions.classList.add('dNone');
    }
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

function bindBtnPress() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
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