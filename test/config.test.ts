import { describe, it, expect } from 'vitest';
import { GAME_CONFIG, SCENE_KEYS, ASSET_KEYS } from '../src/config';

describe('GAME_CONFIG', () => {
  it('has correct game dimensions', () => {
    expect(GAME_CONFIG.width).toBe(800);
    expect(GAME_CONFIG.height).toBe(600);
  });

  it('has a positive game duration', () => {
    expect(GAME_CONFIG.gameDuration).toBeGreaterThan(0);
  });

  it('has a positive bee speed', () => {
    expect(GAME_CONFIG.beeSpeed).toBeGreaterThan(0);
  });

  it('has a positive flower count', () => {
    expect(GAME_CONFIG.flowerCount).toBeGreaterThan(0);
  });

  it('has a positive base flower points value', () => {
    expect(GAME_CONFIG.baseFlowerPoints).toBeGreaterThan(0);
  });

  it('has a positive flower regen time', () => {
    expect(GAME_CONFIG.flowerRegenTime).toBeGreaterThan(0);
  });

  it('has a combo multiplier greater than 1', () => {
    expect(GAME_CONFIG.comboMultiplier).toBeGreaterThan(1);
  });
});

describe('SCENE_KEYS', () => {
  it('defines all required scenes', () => {
    expect(SCENE_KEYS.BOOT).toBe('BootScene');
    expect(SCENE_KEYS.PRELOAD).toBe('PreloadScene');
    expect(SCENE_KEYS.MENU).toBe('MenuScene');
    expect(SCENE_KEYS.GAME).toBe('GameScene');
    expect(SCENE_KEYS.GAME_OVER).toBe('GameOverScene');
  });
});

describe('ASSET_KEYS', () => {
  it('defines all required asset keys', () => {
    expect(ASSET_KEYS.BEE).toBeTruthy();
    expect(ASSET_KEYS.FLOWER).toBeTruthy();
    expect(ASSET_KEYS.BACKGROUND).toBeTruthy();
  });

  it('asset keys are unique', () => {
    const keys = Object.values(ASSET_KEYS);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});
