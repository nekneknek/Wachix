import { lazy } from 'react';

// Fonction utilitaire pour le chargement paresseux des composants
export function lazyImport(factory: () => Promise<any>, name: string) {
  return lazy(() => factory().then((module) => ({ default: module[name] })));
}

// Préchargement des composants critiques
export function preloadComponent(path: string) {
  const component = import(/* @vite-ignore */ path);
  return component;
}