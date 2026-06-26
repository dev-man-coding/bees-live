import Phaser from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_CONFIG } from '../config';
import { GameOverData } from './GameScene';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME_OVER });
  }

  init(data: GameOverData): void {
    this.registry.set('finalScore', data.score ?? 0);
  }

  create(): void {
    const { width, height } = GAME_CONFIG;
    const cx = width / 2;
    const finalScore = this.registry.get('finalScore') as number;

    this.add.image(cx, height / 2, ASSET_KEYS.BACKGROUND).setAlpha(0.5);

    // Dark overlay
    this.add.rectangle(cx, height / 2, width, height, 0x000000, 0.55);

    // Game Over title
    this.add
      .text(cx, height / 2 - 130, 'Spiel beendet!', {
        fontSize: '52px',
        color: '#ffd700',
        fontStyle: 'bold',
        stroke: '#333333',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // Score display
    this.add
      .text(cx, height / 2 - 40, `Dein Punktestand:`, {
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, height / 2 + 20, `${finalScore} Punkte`, {
        fontSize: '48px',
        color: '#ffd700',
        fontStyle: 'bold',
        stroke: '#333333',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Restart button
    const restartBtn = this.add
      .text(cx, height / 2 + 110, '🔄  Nochmal spielen', {
        fontSize: '28px',
        color: '#ffffff',
        backgroundColor: '#1b4332',
        padding: { x: 24, y: 12 },
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    restartBtn.on('pointerover', () => restartBtn.setStyle({ backgroundColor: '#2d6a4f' }));
    restartBtn.on('pointerout', () => restartBtn.setStyle({ backgroundColor: '#1b4332' }));
    restartBtn.on('pointerdown', () => this.scene.start(SCENE_KEYS.MENU));

    // Menu button
    const menuBtn = this.add
      .text(cx, height / 2 + 175, '🏠  Hauptmenü', {
        fontSize: '22px',
        color: '#cccccc',
        backgroundColor: '#333333',
        padding: { x: 18, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    menuBtn.on('pointerover', () => menuBtn.setStyle({ color: '#ffffff' }));
    menuBtn.on('pointerout', () => menuBtn.setStyle({ color: '#cccccc' }));
    menuBtn.on('pointerdown', () => this.scene.start(SCENE_KEYS.MENU));

    // Allow Enter / Space to restart
    this.input.keyboard!.once('keydown-ENTER', () => this.scene.start(SCENE_KEYS.MENU));
    this.input.keyboard!.once('keydown-SPACE', () => this.scene.start(SCENE_KEYS.MENU));
  }
}
