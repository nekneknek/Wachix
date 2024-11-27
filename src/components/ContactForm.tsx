import React, { FormEvent, useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire ici
    console.log('Formulaire soumis:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Votre nom</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Jean Dupont"
          value={formData.nom}
          onChange={(e) => setFormData({...formData, nom: e.target.value})}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Votre email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md"
          placeholder="jean@exemple.fr"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Votre message</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          placeholder="Écrivez votre message ici..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600"
      >
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;