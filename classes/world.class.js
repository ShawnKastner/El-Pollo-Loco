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
    drink_sound = new Audio('audio/drinking.mp3');
    collectCoin_sound = new Audio('audio/collectCoin.mp3');
    killChicken_sound = new Audio('audio/jumpOnChicken.mp3');
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
        }, 10)
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionThrowableObjects();
        }, 200)
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss();
        }, 300)
    }

    checkOnTopOfEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround() && this.character.isColliding(enemy) && !enemy.hitted == true) {
                enemy.hit();
                this.killChicken_sound.play();
            }
        })
    }

    checkCollisionWithEndboss() {
        if(this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    checkCollisionThrowableObjects() {
        this.throwableObject.forEach((tO) => {
            if(this.endboss.isColliding(tO)) {
                this.endboss.hit(this.endboss.energy -= 10);
                this.endbossBar.setPercentage(this.endboss.energy);
                this.killChicken_sound.play();
                this.throwableObject.splice(this.throwableObject, 1);
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) & !enemy.hitted == true) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coins => {
            if (this.character.isColliding(coins)) {
                this.character.addCoin();
                this.collectCoin_sound.play();
                this.level.coins.splice(coins, 1);
                this.coinBar.setPercentage(this.character.collectedCoin);
            }
        }));
    }

    checkCollisionsBottles() {
        this.level.bottle.forEach((bottles => {
            if (this.character.isColliding(bottles)) {
                this.character.addBottle();
                this.drink_sound.play();
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Spaced for fixed objects------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.smallChicken);
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
        mo.drawFrame(this.ctx);

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