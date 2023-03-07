class Level {
    enemies;
    clouds;
    background;
    coins;
    bottle;
    level_end_x = 6200;

    constructor(enemies, clouds, background, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.bottle = bottle;
    }
}