import { it, describe, vi, expect, beforeEach } from 'vitest';
import { getWelcomingText } from './utils';

describe('getWelcomingText', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return "Miłej nocy." before 05:00', () => {
    const mockDate = new Date('2023-06-23T04:00:00');
    vi.setSystemTime(mockDate);

    const result = getWelcomingText();
    expect(result).toBe('Miłej nocy.');
  });

  it('should return "Dzień dobry." between 05:00 and 18:00', () => {
    const mockDate = new Date('2023-06-23T14:00:00');
    vi.setSystemTime(mockDate);

    const result = getWelcomingText();
    expect(result).toBe('Dzień dobry.');
  });

  it('should return "Miłej nocy." after 21:00', () => {
    const mockDate = new Date('2023-06-23T22:00:00');
    vi.setSystemTime(mockDate);

    const result = getWelcomingText();
    expect(result).toBe('Miłej nocy.');
  });

  it('should return "Dobry wieczór." between 18:00 and 21:00', () => {
    const mockDate = new Date('2023-06-23T20:00:00');
    vi.setSystemTime(mockDate);

    const result = getWelcomingText();
    expect(result).toBe('Dobry wieczór.');
  });
});
