class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 130;
    speed = 8;
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    images_longIdle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png']

    world;
    walking_sound = new Audio('audio/walking.mp3');
    offset = {
        top: 120,
        bottom: 30,
        left: 45,
        right: 45
    };
    lastInteraction = 0;
    idle = false;
    longIdle = false;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_longIdle);

        this.checkIdle();
        this.animate();
        this.applyGravity();
    }

    animate() {
        setStopableInterval(() => this.moveCharacter(), 1000 / 60);

        setStopableInterval(() => this.playCharacterAnimation(), 100);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft()
        }
        if (this.canJump()) {
            this.jump();
            this.lostTime = new Date().getTime();
        }
        this.world.camera_x = -this.x + 100;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    moveRight() {
        super.moveRight();
        this.walking_sound.play();
        this.playWalkingSound();
        this.lastInteraction = new Date().getTime();
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.playWalkingSound();
        this.lostTime = new Date().getTime();
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    playCharacterAnimation() {
        if (this.idle) { this.playAnimation(this.images_idle) };
        if (this.longIdle) { this.playAnimation(this.images_longIdle) };
        if (this.isDead()) {
            this.playAnimation(this.images_dead);
        } else if (this.isHurt()) {
            this.playAnimation(this.images_hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.images_jumping);
            this.deactivateIdle();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
            this.deactivateIdle();
        }
    }

    playWalkingSound() {
        this.walking_sound.play();
        this.walking_sound.volume = 0.2;
    }

    checkIdle() {
        setStopableInterval(() => {
            if (this.characterInactive()) {
                let timePassed = new Date().getTime() - this.lastInteraction;
                timePassed = timePassed / 1000;
                if (timePassed > 3) {
                    this.idle = true;
                } if (timePassed > 6) {
                    this.idle = false;
                    this.longIdle = true;
                }
            }
        }, 1000);
    }

    deactivateIdle() {
        this.idle = false;
        this.longIdle = false;
    }

    characterInactive() {
        return (
            !this.world.keyboard.RIGHT ||
            !this.world.keyboard.LEFT ||
            !this.world.keyboard.SPACE ||
            !this.world.keyboard.D
        );
    }
}