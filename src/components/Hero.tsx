import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566633806327-68e152aaf26d"
          alt="Élégance Wachix"
          className="w-full h-full object-cover object-center brightness-50"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`text-white space-y-8 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="space-y-4">
              <h1 className="text-7xl font-bold mb-2 leading-tight animate-fade-in">
                Wachix
              </h1>
              <p className="text-4xl font-light animate-slide-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
                L'élégance est un prix
              </p>
            </div>
            
            <p className="text-xl text-gray-200 animate-fade-in opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards] max-w-xl">
              Découvrez notre collection exclusive de parfums inspirés des traditions ancestrales et de tissus wax authentiques.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0 [animation-delay:1500ms] [animation-fill-mode:forwards]">
              <Link 
                to="/parfums" 
                className="group inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-all duration-300 transform hover:translate-x-1"
              >
                Nos Parfums
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/tissus-wax" 
                className="group inline-flex items-center justify-center bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-1"
              >
                Tissus Wax
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f"
                alt="Collection de parfums exclusifs"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;