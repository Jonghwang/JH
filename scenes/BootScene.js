export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        this.load.image("player", "assets/player.png");
        this.load.image("zombie", "assets/zombie.png");
        this.load.image("tiles", "assets/tiles.png");

    }

    create() {

        this.scene.start("GameScene");

    }

}
