import { useMemo } from 'react';
import { memoize } from '../performance';

export function useMemoizedValue<T>(
  computeValue: () => T,
  dependencies: any[]
): T {
  return useMemo(() => {
    const memoizedCompute = memoize(computeValue);
    return memoizedCompute();
  }, dependencies);
}