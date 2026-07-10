export default class Zombie extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "zombie");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;

        this.hp = 100;
        this.speed = Phaser.Math.Between(70, 120);
        this.attackRange = 45;
        this.attackCooldown = 1000;
        this.lastAttack = 0;

        this.setCollideWorldBounds(true);
    }

    update(player) {

        if (!this.active) return;

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        this.rotation = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            player.x,
            player.y
        );

        if (dist > this.attackRange) {

            this.scene.physics.moveToObject(
                this,
                player,
                this.speed
            );

        } else {

            this.setVelocity(0);

            if (this.scene.time.now > this.lastAttack) {

                this.lastAttack =
                    this.scene.time.now + this.attackCooldown;

                if (player.hp === undefined)
                    player.hp = 100;

                player.hp -= 10;

                console.log("PLAYER HP :", player.hp);

            }

        }

    }

    damage(amount) {

        this.hp -= amount;

        if (this.hp <= 0) {

            this.destroy();

        }

    }

}
