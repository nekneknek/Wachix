import { loadStripe, Stripe } from '@stripe/stripe-js';
import api from '../api';

class StripeService {
  private static instance: StripeService;
  private stripe: Promise<Stripe | null>;

  private constructor() {
    this.stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }

  static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async createPaymentIntent(amount: number, currency: string = 'eur'): Promise<string> {
    const response = await api.post('/payments/create-intent', { amount, currency });
    return response.data.clientSecret;
  }

  async getStripeInstance(): Promise<Stripe | null> {
    return await this.stripe;
  }
}

export const stripeService = StripeService.getInstance();