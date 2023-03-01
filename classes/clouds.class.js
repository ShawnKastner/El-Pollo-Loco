class Cloud extends MovableObject {
    y = 20;
    x = 500
    height = 250;
    width = 500;
    x = Math.random() * 6500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            this.moveLeft();
        }, 25);
    }
}