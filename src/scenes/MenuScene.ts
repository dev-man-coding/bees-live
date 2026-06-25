import Phaser from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_CONFIG } from '../config';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MENU });
  }

  create(): void {
    const { width, height } = GAME_CONFIG;
    const cx = width / 2;

    this.add.image(cx, height / 2, ASSET_KEYS.BACKGROUND);

    // Title
    this.add
      .text(cx, height / 2 - 100, '🐝 Bees Live', {
        fontSize: '56px',
        color: '#ffd700',
        fontStyle: 'bold',
        stroke: '#333333',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // Subtitle
    this.add
      .text(cx, height / 2 - 30, 'Sammle Pollen – bevor die Zeit abläuft!', {
        fontSize: '20px',
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Start button
    const btn = this.add
      .text(cx, height / 2 + 60, '▶  Spiel starten', {
        fontSize: '28px',
        color: '#ffffff',
        backgroundColor: '#1b4332',
        padding: { x: 24, y: 12 },
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#2d6a4f' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#1b4332' }));
    btn.on('pointerdown', () => this.scene.start(SCENE_KEYS.GAME));

    // Also allow Enter / Space to start
    this.input.keyboard!.once('keydown-ENTER', () => this.scene.start(SCENE_KEYS.GAME));
    this.input.keyboard!.once('keydown-SPACE', () => this.scene.start(SCENE_KEYS.GAME));

    // Controls hint
    this.add
      .text(cx, height - 30, 'Steuerung: WASD oder Pfeiltasten', {
        fontSize: '16px',
        color: '#cccccc',
      })
      .setOrigin(0.5);
  }
}
