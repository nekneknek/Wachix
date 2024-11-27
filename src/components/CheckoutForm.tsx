import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Une erreur est survenue');
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Une erreur est survenue lors du paiement');
      } else {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/confirmation');
      }
    } catch (err) {
      setError('Une erreur inattendue est survenue');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600 transition-colors
          ${(!stripe || processing) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {processing ? 'Traitement en cours...' : 'Payer maintenant'}
      </button>
    </form>
  );
};

export default CheckoutForm;