class Chicken extends MovableObject {
    y = 325;
    height = 100;
    width = 90;
    chicken_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.chicken_walking);

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.chicken_walking.length;
            let path = this.chicken_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
        this.moveLeft();
    }
}