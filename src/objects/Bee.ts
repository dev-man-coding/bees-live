import Phaser from 'phaser';
import { ASSET_KEYS, GAME_CONFIG } from '../config';
import { calculateBeeVelocity, type BeeInputState } from './beeVelocity';

export { calculateBeeVelocity, type BeeInputState } from './beeVelocity';

export class Bee extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, ASSET_KEYS.BEE);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setDepth(10);

    const kb = scene.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasdKeys = {
      up: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: kb.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  handleInput(): void {
    const input: BeeInputState = {
      up: this.cursors.up.isDown || this.wasdKeys.up.isDown,
      down: this.cursors.down.isDown || this.wasdKeys.down.isDown,
      left: this.cursors.left.isDown || this.wasdKeys.left.isDown,
      right: this.cursors.right.isDown || this.wasdKeys.right.isDown,
    };

    const { vx, vy } = calculateBeeVelocity(input, GAME_CONFIG.beeSpeed);
    this.setVelocity(vx, vy);

    if (vx !== 0 || vy !== 0) {
      const angle = Math.atan2(vy, vx);
      this.setRotation(angle);
    }
  }
}
