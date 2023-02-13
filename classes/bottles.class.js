class Bottle extends MovableObject {
    images_bottle = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ]
    height = 100;
    width = 100;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.images_bottle);
        this.x = x;
        this.y = y;
    }
}