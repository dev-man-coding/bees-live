import Phaser from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_CONFIG } from '../config';
import { Bee } from '../objects/Bee';
import { Flower } from '../objects/Flower';
import { ScoreDisplay } from '../ui/ScoreDisplay';
import { TimerDisplay } from '../ui/TimerDisplay';

export interface GameOverData {
  score: number;
}

export class GameScene extends Phaser.Scene {
  private bee!: Bee;
  private flowers!: Phaser.GameObjects.Group;
  private scoreDisplay!: ScoreDisplay;
  private timerDisplay!: TimerDisplay;
  private score: number = 0;
  private timeLeft: number = GAME_CONFIG.gameDuration;
  private countdownTimer!: Phaser.Time.TimerEvent;
  private gameOver: boolean = false;

  constructor() {
    super({ key: SCENE_KEYS.GAME });
  }

  create(): void {
    this.score = 0;
    this.timeLeft = GAME_CONFIG.gameDuration;
    this.gameOver = false;

    this.createBackground();
    this.spawnFlowers();
    this.createBee();
    this.setupOverlap();
    this.createUI();
    this.startCountdown();
  }

  update(): void {
    if (!this.gameOver) {
      this.bee.handleInput();
    }
  }

  private createBackground(): void {
    const { width, height } = GAME_CONFIG;
    this.add.image(width / 2, height / 2, ASSET_KEYS.BACKGROUND);
  }

  private createBee(): void {
    const { width, height } = GAME_CONFIG;
    this.bee = new Bee(this, width / 2, height / 2);
  }

  private spawnFlowers(): void {
    const { width, height, flowerCount } = GAME_CONFIG;
    this.flowers = this.add.group();

    const margin = 50;
    for (let i = 0; i < flowerCount; i++) {
      const x = Phaser.Math.Between(margin, width - margin);
      const y = Phaser.Math.Between(margin, height - margin);
      const colorIndex = i % 6;
      const flower = new Flower(this, x, y, colorIndex);
      this.flowers.add(flower);
    }
  }

  private setupOverlap(): void {
    const flowerChildren = this.flowers.getChildren() as Flower[];
    flowerChildren.forEach((flower) => {
      this.physics.add.overlap(this.bee, flower, () => {
        this.onPollenCollected(flower);
      });
    });
  }

  private onPollenCollected(flower: Flower): void {
    if (flower.canCollect()) {
      flower.collect();
      this.score += flower.pointValue;
      this.scoreDisplay.update(this.score);

      this.time.delayedCall(GAME_CONFIG.flowerRegenTime, () => {
        flower.regenerate();
      });
    }
  }

  private createUI(): void {
    this.scoreDisplay = new ScoreDisplay(this, 10, 10);
    this.timerDisplay = new TimerDisplay(this, GAME_CONFIG.width - 10, 10);
    this.scoreDisplay.update(this.score);
    this.timerDisplay.update(this.timeLeft);
  }

  private startCountdown(): void {
    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      repeat: GAME_CONFIG.gameDuration - 1,
      callback: this.tickTimer,
      callbackScope: this,
    });
  }

  private tickTimer(): void {
    this.timeLeft = Math.max(0, this.timeLeft - 1);
    this.timerDisplay.update(this.timeLeft);

    if (this.timeLeft <= 0) {
      this.endGame();
    }
  }

  private endGame(): void {
    if (this.gameOver) return;
    this.gameOver = true;
    this.countdownTimer.remove();

    this.time.delayedCall(500, () => {
      const data: GameOverData = { score: this.score };
      this.scene.start(SCENE_KEYS.GAME_OVER, data);
    });
  }
}
