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
    energy = 100;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character .isColliding(chicken);
    isColliding (mo) {
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.speedY + this.height) >= mo.y &&
                (this.y + this.speedY) <= (mo.y + mo.height);
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
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
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }

    moveLeft() {
            this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.images_walking.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
}