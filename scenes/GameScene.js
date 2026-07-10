export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        // 맵 크기
        this.physics.world.setBounds(0, 0, 3000, 3000);

        // 배경
        this.add.tileSprite(1500, 1500, 3000, 3000, "tiles");

        // 플레이어
        this.player = this.physics.add.sprite(1500, 1500, "player");

        this.player.setCollideWorldBounds(true);
        this.player.setDrag(1200);
        this.player.setMaxVelocity(300);

        // 카메라
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);

        // 입력
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            dodgeL: Phaser.Input.Keyboard.KeyCodes.Q,
            dodgeR: Phaser.Input.Keyboard.KeyCodes.E,
            run: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

        this.canDodge = true;

    }

    update() {

        let speed = this.keys.run.isDown ? 420 : 250;

        let vx = 0;
        let vy = 0;

        if (this.keys.left.isDown) vx = -speed;
        if (this.keys.right.isDown) vx = speed;

        if (this.keys.up.isDown) vy = -speed;
        if (this.keys.down.isDown) vy = speed;

        this.player.setVelocity(vx, vy);

        // 마우스 방향 보기
        this.player.rotation = Phaser.Math.Angle.Between(
            this.player.x,
            this.player.y,
            this.input.activePointer.worldX,
            this.input.activePointer.worldY
        );

        // 왼쪽 횡이동
        if (Phaser.Input.Keyboard.JustDown(this.keys.dodgeL) && this.canDodge) {

            this.canDodge = false;

            this.physics.velocityFromRotation(
                this.player.rotation - Math.PI / 2,
                650,
                this.player.body.velocity
            );

            this.time.delayedCall(250, () => {
                this.canDodge = true;
            });

        }

        // 오른쪽 횡이동
        if (Phaser.Input.Keyboard.JustDown(this.keys.dodgeR) && this.canDodge) {

            this.canDodge = false;

            this.physics.velocityFromRotation(
                this.player.rotation + Math.PI / 2,
                650,
                this.player.body.velocity
            );

            this.time.delayedCall(250, () => {
                this.canDodge = true;
            });

        }

    }

}
