class ThrowableObject extends MovableObject {

    bottle_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    bottle_splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.bottle_rotation);
        this.loadImages(this.bottle_splash);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw();
     }

     throw() {
        this.speedY = 30;
        this.applyGravity();
        this.playBottleRotation();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    playBottleRotation() {
        setInterval(() => {
            this.playAnimation(this.bottle_rotation);
        }, 100);
    }
}