import Phaser from 'phaser';

export class ScoreDisplay {
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.label = scene.add
      .text(x, y, 'Punkte: 0', {
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
        backgroundColor: '#00000066',
        padding: { x: 8, y: 4 },
      })
      .setScrollFactor(0)
      .setDepth(20);
  }

  update(score: number): void {
    this.label.setText(`Punkte: ${score}`);
  }
}
