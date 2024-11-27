import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ShoppingCart from './components/ShoppingCart';
import LiveChat from './components/LiveChat';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Pages publiques
import Accueil from './pages/Accueil';
import Parfums from './pages/Parfums';
import TissusWax from './pages/TissusWax';
import DetailProduit from './pages/DetailProduit';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogCategories from './pages/BlogCategories';
import Contact from './pages/Contact';
import APropos from './pages/APropos';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import MotDePasseOublie from './pages/MotDePasseOublie';
import ResetPassword from './pages/ResetPassword';
import EnConstruction from './pages/EnConstruction';

// Pages protégées (client)
import Profil from './pages/Profil';
import Checkout from './pages/Checkout';
import PackBronze from './pages/PackBronze';
import PackGold from './pages/PackGold';
import PackPlatinum from './pages/PackPlatinum';

// Pages admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';
import AdminPromotions from './pages/admin/Promotions';
import AdminMessages from './pages/admin/Messages';
import AdminNewsletter from './pages/admin/Newsletter';
import AdminMedia from './pages/admin/Media';
import AdminPages from './pages/admin/Pages';
import AdminSEO from './pages/admin/SEO';
import AdminSettings from './pages/admin/Settings';
import AdminSecurity from './pages/admin/Security';
import AdminIntegrations from './pages/admin/Integrations';
import AdminLogin from './pages/admin/Login';

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<Accueil />} />
                <Route path="/parfums" element={<Parfums />} />
                <Route path="/tissus-wax" element={<TissusWax />} />
                <Route path="/produit/:id" element={<DetailProduit />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/article/:slug" element={<BlogPost />} />
                <Route path="/blog/:category" element={<BlogCategories />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/connexion" element={
                  isAuthenticated ? <Navigate to="/profil" replace /> : <Connexion />
                } />
                <Route path="/inscription" element={
                  isAuthenticated ? <Navigate to="/profil" replace /> : <Inscription />
                } />
                <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
                <Route path="/reinitialisation-mot-de-passe/:token" element={<ResetPassword />} />
                <Route path="/en-construction" element={<EnConstruction />} />

                {/* Routes protégées (client) */}
                <Route path="/profil" element={
                  <ProtectedRoute>
                    <Profil />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/pack-bronze" element={<PackBronze />} />
                <Route path="/pack-gold" element={<PackGold />} />
                <Route path="/pack-platinum" element={<PackPlatinum />} />

                {/* Routes admin */}
                <Route path="/admin/login" element={
                  isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin />
                } />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/produits" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/commandes" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/clients" element={
                  <AdminRoute>
                    <AdminCustomers />
                  </AdminRoute>
                } />
                <Route path="/admin/promotions" element={
                  <AdminRoute>
                    <AdminPromotions />
                  </AdminRoute>
                } />
                <Route path="/admin/messages" element={
                  <AdminRoute>
                    <AdminMessages />
                  </AdminRoute>
                } />
                <Route path="/admin/newsletter" element={
                  <AdminRoute>
                    <AdminNewsletter />
                  </AdminRoute>
                } />
                <Route path="/admin/medias" element={
                  <AdminRoute>
                    <AdminMedia />
                  </AdminRoute>
                } />
                <Route path="/admin/pages" element={
                  <AdminRoute>
                    <AdminPages />
                  </AdminRoute>
                } />
                <Route path="/admin/seo" element={
                  <AdminRoute>
                    <AdminSEO />
                  </AdminRoute>
                } />
                <Route path="/admin/parametres" element={
                  <AdminRoute>
                    <AdminSettings />
                  </AdminRoute>
                } />
                <Route path="/admin/securite" element={
                  <AdminRoute>
                    <AdminSecurity />
                  </AdminRoute>
                } />
                <Route path="/admin/integrations" element={
                  <AdminRoute>
                    <AdminIntegrations />
                  </AdminRoute>
                } />

                {/* Route 404 */}
                <Route path="*" element={<Navigate to="/en-construction" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <ShoppingCart />
          <LiveChat />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;