import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

// Initialize Stripe outside of component to avoid re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useCart();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (state.items.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: state.items.map(item => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création du paiement');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [state.items]);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Panier vide</h2>
          <p className="mt-1 text-sm text-gray-500">
            Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Paiement</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif de la commande</h2>
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium">
                {(item.price * item.quantity).toFixed(2)} €
              </span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {clientSecret && (
          <Elements 
            stripe={stripePromise} 
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#D9B50D',
                }
              }
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;