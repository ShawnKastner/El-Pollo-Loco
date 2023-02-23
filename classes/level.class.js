class Level {
    enemies;
    clouds;
    background;
    coins;
    bottle;
    smallChicken;
    level_end_x = 6200;

    constructor(enemies, clouds, background, coins, bottle, smallChicken) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.bottle = bottle;
        this.smallChicken = smallChicken;
    }
}