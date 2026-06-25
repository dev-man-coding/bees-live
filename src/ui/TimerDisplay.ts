import Phaser from 'phaser';

export class TimerDisplay {
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.label = scene.add
      .text(x, y, 'Zeit: 60', {
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
        backgroundColor: '#00000066',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(20);
  }

  update(secondsLeft: number): void {
    const urgentColor = secondsLeft <= 10 ? '#ff4444' : '#ffffff';
    this.label.setStyle({ color: urgentColor });
    this.label.setText(`Zeit: ${secondsLeft}`);
  }
}
