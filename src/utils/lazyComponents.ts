import { lazy } from 'react';

// Composants avec chargement paresseux
export const LazyBlog = lazy(() => import('../pages/Blog'));
export const LazyDetailProduit = lazy(() => import('../pages/DetailProduit'));
export const LazyCheckout = lazy(() => import('../pages/Checkout'));
export const LazyProfil = lazy(() => import('../pages/Profil'));
export const LazyAdmin = lazy(() => import('../pages/admin/Dashboard'));
export const LazyAdminLogin = lazy(() => import('../pages/admin/Login'));

// Préchargement des composants critiques
export const preloadCriticalComponents = () => {
  const components = [
    import('../pages/Accueil'),
    import('../pages/Parfums'),
    import('../pages/TissusWax')
  ];
  return Promise.all(components);
};