import { describe, it, expect } from 'vitest';
import { calculateBeeVelocity } from '../../src/objects/beeVelocity';

const SPEED = 220;

describe('calculateBeeVelocity', () => {
  it('returns zero velocity when no keys are pressed', () => {
    const result = calculateBeeVelocity({ up: false, down: false, left: false, right: false }, SPEED);
    expect(result.vx).toBe(0);
    expect(result.vy).toBe(0);
  });

  it('moves left when left key is pressed', () => {
    const result = calculateBeeVelocity({ up: false, down: false, left: true, right: false }, SPEED);
    expect(result.vx).toBe(-SPEED);
    expect(result.vy).toBe(0);
  });

  it('moves right when right key is pressed', () => {
    const result = calculateBeeVelocity({ up: false, down: false, left: false, right: true }, SPEED);
    expect(result.vx).toBe(SPEED);
    expect(result.vy).toBe(0);
  });

  it('moves up when up key is pressed', () => {
    const result = calculateBeeVelocity({ up: true, down: false, left: false, right: false }, SPEED);
    expect(result.vx).toBe(0);
    expect(result.vy).toBe(-SPEED);
  });

  it('moves down when down key is pressed', () => {
    const result = calculateBeeVelocity({ up: false, down: true, left: false, right: false }, SPEED);
    expect(result.vx).toBe(0);
    expect(result.vy).toBe(SPEED);
  });

  it('normalises diagonal movement to prevent speed increase', () => {
    const result = calculateBeeVelocity({ up: true, down: false, left: true, right: false }, SPEED);
    const magnitude = Math.sqrt(result.vx ** 2 + result.vy ** 2);
    expect(magnitude).toBeCloseTo(SPEED, 5);
  });

  it('diagonal velocity components are equal in magnitude', () => {
    const result = calculateBeeVelocity({ up: true, down: false, left: true, right: false }, SPEED);
    expect(Math.abs(result.vx)).toBeCloseTo(Math.abs(result.vy), 5);
  });

  it('cancels out opposite directions', () => {
    const result = calculateBeeVelocity({ up: true, down: true, left: false, right: false }, SPEED);
    expect(result.vy).toBe(0);
  });
});
