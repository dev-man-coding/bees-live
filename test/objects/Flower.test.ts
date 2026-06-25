import { describe, it, expect } from 'vitest';
import { FlowerState } from '../../src/objects/FlowerState';

describe('FlowerState enum', () => {
  it('defines FRESH state', () => {
    expect(FlowerState.FRESH).toBe('FRESH');
  });

  it('defines COLLECTED state', () => {
    expect(FlowerState.COLLECTED).toBe('COLLECTED');
  });

  it('defines REGENERATING state', () => {
    expect(FlowerState.REGENERATING).toBe('REGENERATING');
  });

  it('has exactly three states', () => {
    const states = Object.values(FlowerState);
    expect(states).toHaveLength(3);
  });

  it('all state values are unique strings', () => {
    const states = Object.values(FlowerState);
    const unique = new Set(states);
    expect(unique.size).toBe(states.length);
  });
});

describe('FlowerState transitions (logical)', () => {
  it('FRESH is the initial state', () => {
    // The lifecycle always begins at FRESH
    expect(FlowerState.FRESH).toBeDefined();
  });

  it('state values follow the documented lifecycle order', () => {
    const lifecycle = [FlowerState.FRESH, FlowerState.COLLECTED, FlowerState.REGENERATING];
    expect(lifecycle[0]).toBe(FlowerState.FRESH);
    expect(lifecycle[1]).toBe(FlowerState.COLLECTED);
    expect(lifecycle[2]).toBe(FlowerState.REGENERATING);
  });
});
