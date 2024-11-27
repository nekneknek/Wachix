import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, Heart, Sparkles, Gem } from 'lucide-react';

const APropos = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Histoire */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
        <p className="text-lg text-gray-600 mb-8">
          Wachix est né de la passion pour l'artisanat africain et de la volonté de partager 
          cette richesse culturelle avec le monde. Notre mission est de promouvoir l'excellence 
          des parfums et tissus africains tout en soutenant les artisans locaux.
        </p>
      </section>

      {/* Section Valeurs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Heart className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authenticité</h3>
            <p className="text-gray-600">
              Nous valorisons les traditions et le savoir-faire ancestral africain.
            </p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Durabilité</h3>
            <p className="text-gray-600">
              Nous nous engageons pour un commerce équitable et responsable.
            </p>
          </div>
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              Nous sélectionnons les meilleurs produits pour nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Section Engagement */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Notre Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-8 w-8 text-gold-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
            <p className="text-gray-600">
              Chaque produit est minutieusement sélectionné pour garantir une qualité exceptionnelle.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-gold-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Support aux Artisans</h3>
            <p className="text-gray-600">
              Nous travaillons directement avec les artisans pour assurer une rémunération équitable.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-gray-900 text-white py-16 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Découvrez Notre Collection</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Explorez notre sélection unique de parfums et tissus wax authentiques.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/parfums"
            className="bg-gold-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition duration-300"
          >
            Voir les Parfums
          </Link>
          <Link 
            to="/tissus-wax"
            className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
          >
            Découvrir les Tissus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default APropos;