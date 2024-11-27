import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactForm />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Nos coordonnées</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gold-500 mr-3" />
              <span>contact@wachix.com</span>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gold-500 mr-3" />
              <span>01 23 45 67 89</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gold-500 mr-3" />
              <span>75001 Paris, France</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;