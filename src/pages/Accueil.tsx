import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CustomerReviews from '../components/CustomerReviews';
import LoyaltyPacks from '../components/LoyaltyPacks';

const Accueil = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <LoyaltyPacks />
      <CustomerReviews />
    </div>
  );
};

export default Accueil;