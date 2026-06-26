import Phaser from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_CONFIG } from '../config';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  create(): void {
    this.createBeeTexture();
    this.createFlowerTexture();
    this.createBackgroundTexture();
    this.scene.start(SCENE_KEYS.MENU);
  }

  private createBeeTexture(): void {
    const size = 32;
    const gfx = this.make.graphics({}, false);

    // Body: yellow ellipse
    gfx.fillStyle(0xffd700, 1);
    gfx.fillEllipse(size / 2, size / 2, 26, 22);

    // Stripes: black bands
    gfx.fillStyle(0x333333, 1);
    gfx.fillRect(9, 11, 14, 3);
    gfx.fillRect(9, 17, 14, 3);

    // Head: yellow circle
    gfx.fillStyle(0xffd700, 1);
    gfx.fillCircle(size / 2, 8, 5);

    // Eyes: small black dots
    gfx.fillStyle(0x000000, 1);
    gfx.fillCircle(13, 7, 1);
    gfx.fillCircle(19, 7, 1);

    // Wings: semi-transparent white
    gfx.fillStyle(0xffffff, 0.6);
    gfx.fillEllipse(9, 4, 10, 8);
    gfx.fillEllipse(23, 4, 10, 8);

    gfx.generateTexture(ASSET_KEYS.BEE, size, size);
    gfx.destroy();
  }

  private createFlowerTexture(): void {
    const size = 32;
    const cx = size / 2;
    const cy = size / 2;
    const petalColors = [0xff6b6b, 0xff9f43, 0xa29bfe, 0x74b9ff, 0xfd79a8, 0x55efc4];

    petalColors.forEach((color, index) => {
      const gfx = this.make.graphics({}, false);

      // Petals
      gfx.fillStyle(color, 1);
      for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2 - Math.PI / 2;
        const px = cx + Math.cos(angle) * 9;
        const py = cy + Math.sin(angle) * 9;
        gfx.fillCircle(px, py, 7);
      }

      // Centre
      gfx.fillStyle(0xffd700, 1);
      gfx.fillCircle(cx, cy, 6);

      const key = `${ASSET_KEYS.FLOWER}_${index}`;
      gfx.generateTexture(key, size, size);
      gfx.destroy();
    });

    // Also generate a greyed-out "collected" variant
    const gfx = this.make.graphics({}, false);
    gfx.fillStyle(0x888888, 1);
    for (let p = 0; p < 5; p++) {
      const angle = (p / 5) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(angle) * 9;
      const py = cy + Math.sin(angle) * 9;
      gfx.fillCircle(px, py, 7);
    }
    gfx.fillStyle(0x555555, 1);
    gfx.fillCircle(cx, cy, 6);
    gfx.generateTexture(`${ASSET_KEYS.FLOWER}_collected`, size, size);
    gfx.destroy();
  }

  private createBackgroundTexture(): void {
    const { width, height } = GAME_CONFIG;
    const gfx = this.make.graphics({}, false);

    // Main grass colour
    gfx.fillStyle(0x52b788, 1);
    gfx.fillRect(0, 0, width, height);

    // Subtle darker patches for visual interest
    gfx.fillStyle(0x40916c, 0.5);
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      gfx.fillEllipse(x, y, Phaser.Math.Between(40, 100), Phaser.Math.Between(30, 70));
    }

    gfx.generateTexture(ASSET_KEYS.BACKGROUND, width, height);
    gfx.destroy();
  }
}
