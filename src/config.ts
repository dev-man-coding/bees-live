export const GAME_CONFIG = {
  width: 800,
  height: 600,
  gameDuration: 60,
  beeSpeed: 220,
  flowerCount: 12,
  baseFlowerPoints: 10,
  flowerRegenTime: 8000,
  comboWindow: 2000,
  comboMultiplier: 1.5,
} as const;

export const SCENE_KEYS = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MENU: 'MenuScene',
  GAME: 'GameScene',
  GAME_OVER: 'GameOverScene',
} as const;

export const ASSET_KEYS = {
  BEE: 'bee',
  FLOWER: 'flower',
  BACKGROUND: 'background',
} as const;
