// Utilitaires pour les performances
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};

// Cache pour mémoriser les résultats des fonctions
export const memoize = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>) => {
    const cle = JSON.stringify(args);
    if (cache.has(cle)) {
      return cache.get(cle)!;
    }
    const resultat = func(...args);
    cache.set(cle, resultat);
    return resultat;
  };
};

// Mesure des performances
export const mesurePerformance = (nomOperation: string) => {
  const debut = performance.now();
  return () => {
    const fin = performance.now();
    console.info(`${nomOperation} : ${(fin - debut).toFixed(2)}ms`);
  };
};