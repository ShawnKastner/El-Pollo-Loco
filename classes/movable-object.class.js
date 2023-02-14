class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;
    energy = 100;
    lastHit = 0;
    coin = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

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

    // character .isColliding(chicken);
    isColliding (mo) {
        return  (this.x + this.width -this.offset.right) >= mo.x + mo.offset.left && this.x + this.offset.left <= (mo.x + mo.width - mo.offset.right) && 
                (this.y + this.speedY + this.height - this.offset.bottom) >= mo.y + mo.offset.top &&
                (this.y + this.speedY + this.offset.top) <= (mo.y + mo.height - mo.offset.bottom);
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    addCoin() {
        this.coin += 10;
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // Differenz in s
        return timePassed < 5;
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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
}