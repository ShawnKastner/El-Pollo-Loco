class Coin extends MovableObject {
    images_coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]
    height = 200;
    width = 200;
    x = Math.floor(Math.random() * 720) + 1;
    y = 200;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.images_coin);
    }

}