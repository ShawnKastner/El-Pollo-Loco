class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 120;

// loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        
    }
}