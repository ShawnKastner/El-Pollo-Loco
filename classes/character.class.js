class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 130;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages([
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-21.png',
        ]);
    }

    jump() {

    }
}