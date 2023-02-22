class Chicken extends MovableObject {
    y = 325;
    height = 100;
    width = 90;
    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    images_dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    offset = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0
    };
    energy = 5;
    hitted = false;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);

        this.x = 400 + Math.random() * 5200; // Zahl zwischen 400 und 5200
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            if(this.isDead()) {
                this.hitted = true;
                this.playAnimation(this.images_dead);
            } else {
                this.playAnimation(this.images_walking);
            }
        }, 100);
        this.chickenMoveLeft();
    }

    chickenMoveLeft() {
        setStopableInterval(() => {
            if(!this.isDead()) {
                this.moveLeft()
            }
        }, 1000/60); 
    }
}