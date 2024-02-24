import type { Delayed } from '@gamestdio/timer';
import { type AnimationControllerConfig } from './types.js';

/**
 * Restrict a number between two boundaries
 */
export function restrictNumber(
  v: number,
  border1: number,
  border2: number,
): number {
  const min = Math.min(border1, border2);
  const max = Math.max(border1, border2);
  return Math.min(Math.max(v, min), max);
}

type ClockMechanism = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setInterval: (callback: Function, ms: number) => void;
  clearInterval(): void;
};

/**
 * A wrapper that will return sync clock or fallback to default interval mechanism.
 */
export function createClockingMechanism(
  clock?: AnimationControllerConfig['clock'],
): ClockMechanism {
  if (clock) {
    let delayed: Delayed | undefined;

    return {
      clearInterval: () => delayed?.clear(),
      setInterval(callback, ms) {
        delayed?.clear(); // Clear previous interval
        delayed = clock.setInterval(callback, ms);
      },
    };
  }

  let intervalId: number | undefined;

  return {
    clearInterval() {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = undefined;
    },
    setInterval(callback, ms) {
      if (intervalId) {
        // Clear previous interval
        clearInterval(intervalId);
      }

      intervalId = setInterval(callback, ms);
    },
  };
}
