class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 120;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 130;
    }

// loadImage('img/test.png')
loadImage(path) {
    this.img = new Image();
    this.img.src = path;
}

/**
 * 
 * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
 */
loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}

moveRight() {
    console.log('Moving right');
}

moveLeft() {
    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);
}

playAnimation() {
    let i = this.currentImage % this.images_walking.length;
    let path = this.images_walking[i];
    this.img = this.imageCache[path];
    this.currentImage++;
}
}