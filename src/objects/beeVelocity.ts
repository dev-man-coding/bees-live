export type BeeInputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

/**
 * Calculates the velocity vector for the bee based on pressed keys and speed.
 * Pure function – no Phaser dependency, fully unit-testable.
 */
export function calculateBeeVelocity(
  input: BeeInputState,
  speed: number
): { vx: number; vy: number } {
  let vx = 0;
  let vy = 0;

  if (input.left) vx -= speed;
  if (input.right) vx += speed;
  if (input.up) vy -= speed;
  if (input.down) vy += speed;

  // Normalise diagonal movement so it doesn't exceed full speed
  if (vx !== 0 && vy !== 0) {
    const factor = 1 / Math.sqrt(2);
    vx *= factor;
    vy *= factor;
  }

  return { vx, vy };
}
