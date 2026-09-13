/**
 * SSR-safe detection of the user's `prefers-reduced-motion` setting.
 * Use `prefersReducedMotion()` for one-off checks inside GSAP/imperative
 * effects, and `useReducedMotion()` when a component must re-render if the
 * preference changes while the page is open.
 */

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Plain, synchronous check. Returns false on the server so it is safe to call
 * anywhere, including at the top of a GSAP `useEffect`.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Reactive version. Returns false on the server and on the first client render
 * (so hydration always matches), then updates once mounted and on every change
 * to the media query.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, getServerSnapshot);
}
