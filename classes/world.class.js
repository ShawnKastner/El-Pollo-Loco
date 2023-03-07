class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossStatus();
    throwableObject = [];

    constructor(canvas, keyboard, gameIsOver) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameIsOver = gameIsOver;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkOnTopOfEnemy();
        }, 50)
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss();
            this.checkThrowObjects();
            this.checkCollisionThrowableObjects();
            this.gameOver();
        }, 200)
    }

    gameOver() {
        if (this.character.isDead()) {
            this.character.playAnimation(this.character.images_dead);
            setTimeout(() => {
                this.showEndScreen();
                this.resetLevel();
            }, 1000);
            gameIsOver = true;
            stopGame();

        }
        if (this.endboss.isDead()) {
            this.endboss.playAnimation(this.endboss.images_dead);
            setTimeout(() => {
                this.showEndScreen();
                this.resetLevel();
            }, 2000)
            gameIsOver = true;
            stopGame();
        }
    }

    checkOnTopOfEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround() && this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.hitted == true && this.character.speedY < 0) {
                enemy.hit();
                this.character.jump();
                if (killChicken_sound.muted == false) {
                    killChicken_sound.play();
                }
            }
        })
    }

    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss) && !gameIsOver == true) {
            this.character.hit();
            if (hitted_sound.muted == false) {
                hitted_sound.play();
            }
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    checkCollisionThrowableObjects() {
        this.throwableObject.forEach((tO) => {
            if (this.endboss.isColliding(tO)) {
                this.endboss.hit(this.endboss.energy -= 10);
                this.endbossBar.setPercentage(this.endboss.energy);
                if (killChicken_sound.muted == false) {
                    killChicken_sound.play();
                }
                this.throwableObject.splice(this.throwableObject, 1);
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.hitted == true && !gameIsOver == true && !this.character.isAboveGround()) {
                this.character.hit();
                if (hitted_sound.muted == false) {
                    hitted_sound.play();
                }
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coins => {
            if (this.character.isColliding(coins)) {
                this.character.addCoin();
                if (collectCoin_sound.muted == false) {
                    collectCoin_sound.play();
                }
                this.level.coins.splice(coins, 1);
                this.coinBar.setPercentage(this.character.collectedCoin);
            }
        }));
    }

    checkCollisionsBottles() {
        this.level.bottle.forEach((bottles => {
            if (this.character.isColliding(bottles)) {
                this.character.addBottle();
                if (drink_sound.muted == false) {
                    drink_sound.play();
                }
                this.level.bottle.splice(bottles, 1);
                this.bottleBar.setPercentage(this.character.collectedBottle);
            }
        }));
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottle > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.collectedBottle -= 10;
            this.bottleBar.setPercentage(this.character.collectedBottle);
        }
    }

    showEndScreen() {
        document.getElementById('gameOverScreenContainer').classList.remove('dNone');
        this.muteAllSounds();
    }

    resetLevel() {
        this.resetBottles();
        this.resetCharacter();
        this.resetChicken();
        this.resetCoins();
        this.resetEndboss();
        this.resetSmallChicken();
        restartMusic();
    }

    resetCoins() {
        this.level.coins.splice(0, this.level.coins.length);
        this.coinBar.setPercentage(0);
    }

    resetCharacter() {
        this.character.energy = 100;
    }

    resetBottles() {
        this.level.bottle.splice(0, this.level.bottle.length);
        this.bottleBar.setPercentage(0);
    }

    resetChicken() {
        this.level.enemies.splice(0, this.level.enemies.length);
    }

    resetEndboss() {
        this.endboss.energy = 100;
        this.endboss.x = 6500;
    }

    muteAllSounds() {
        drink_sound.pause();
        collectCoin_sound.pause();
        killChicken_sound.pause();
        collectHealth_sound.pause();
        hitted_sound.pause();
        background_music.pause();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        // ------ Spaced for fixed objects------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.character.x > 5000) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.addToMap(this.endboss);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}