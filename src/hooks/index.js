import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

/**
 * Custom hook for responsive breakpoint detection.
 * @param {number} breakpoint - Pixel width threshold
 * @returns {boolean} Whether viewport is below breakpoint
 */
export function useMediaQuery(breakpoint = BREAKPOINTS.tablet) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
}

/**
 * Debounce a value — useful for search inputs.
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Simulate async data fetching with loading/error states.
 * Useful for dummy data pages before backend integration.
 */
export function useAsyncData(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
