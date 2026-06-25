import Phaser from 'phaser';
import { ASSET_KEYS, GAME_CONFIG } from '../config';
import { FlowerState } from './FlowerState';

export { FlowerState } from './FlowerState';

export class Flower extends Phaser.Physics.Arcade.Image {
  private _flowerState: FlowerState = FlowerState.FRESH;
  readonly pointValue: number;

  constructor(scene: Phaser.Scene, x: number, y: number, colorIndex: number = 0) {
    const textureKey = `${ASSET_KEYS.FLOWER}_${colorIndex % 6}`;
    super(scene, x, y, textureKey);

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // true = static body

    this.pointValue = GAME_CONFIG.baseFlowerPoints;
    this.setDepth(5);
  }

  get flowerState(): FlowerState {
    return this._flowerState;
  }

  get isCollected(): boolean {
    return this._flowerState === FlowerState.COLLECTED;
  }

  canCollect(): boolean {
    return this._flowerState === FlowerState.FRESH;
  }

  collect(): void {
    if (this._flowerState !== FlowerState.FRESH) return;

    this._flowerState = FlowerState.COLLECTED;
    this.setTexture(`${ASSET_KEYS.FLOWER}_collected`);

    // Scale-down tween for visual feedback
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.6,
      scaleY: 0.6,
      alpha: 0.5,
      duration: 200,
      ease: 'Power2',
    });
  }

  regenerate(): void {
    if (this._flowerState !== FlowerState.COLLECTED) return;

    this._flowerState = FlowerState.REGENERATING;

    // Pop-in tween then restore
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 1,
      duration: 300,
      ease: 'Back.Out',
      onComplete: () => {
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          scaleY: 1,
          duration: 150,
          ease: 'Power1',
          onComplete: () => {
            const colorIndex = Phaser.Math.Between(0, 5);
            this.setTexture(`${ASSET_KEYS.FLOWER}_${colorIndex}`);
            this._flowerState = FlowerState.FRESH;
          },
        });
      },
    });
  }
}
