import React, { useState } from 'react';
import { AlertCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotDePasseOublie = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoiEnCours(true);
    setMessage('');
    setErreur('');

    try {
      const reponse = await fetch('/api/auth/reinitialisation-mot-de-passe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (reponse.ok) {
        setMessage('Un email de réinitialisation a été envoyé à votre adresse.');
        setEmail('');
      } else {
        const data = await reponse.json();
        setErreur(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      setErreur('Le service est temporairement indisponible. Veuillez réessayer plus tard.');
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Mot de passe oublié
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {erreur && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {erreur}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="exemple@email.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={envoiEnCours}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 ${
                  envoiEnCours ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {envoiEnCours ? 'Envoi en cours...' : 'Envoyer le lien'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link
              to="/connexion"
              className="flex items-center justify-center text-sm text-gold-600 hover:text-gold-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotDePasseOublie;