class Coin extends MovableObject {
    images_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]
    height = 200;
    width = 200;
    offset = {
        top: 60,
        bottom: 120,
        left: 80,
        right: 80
    }

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.images_coin);
        this.x = x;
        this.y = y;
    }
}