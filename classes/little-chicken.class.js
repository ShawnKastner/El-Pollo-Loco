class SmallChicken extends MovableObject {
    y = 325;
    height = 100;
    width = 90;
    images_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    images_dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 10,
        bottom: 10,
        left: 5,
        right: 5
    };
    energy = 5;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);

        this.x = 2500 + Math.random() * 6000; // Zahl zwischen 4500 und 5900
        this.speed = 1 + Math.random() * 2;

        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            if(this.isDead()) {
                this.hitted = true;
                this.playAnimation(this.images_dead);
            } else {
                this.playAnimation(this.images_walking);
                this.moveLeft();
            }
        }, 1000/60)
    }
}