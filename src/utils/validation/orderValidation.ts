import { z } from 'zod';

export const orderValidationSchema = {
  create: z.object({
    items: z.array(z.object({
      id: z.number(),
      quantity: z.number().int().positive()
    })).min(1, 'Le panier ne peut pas être vide'),
    
    shippingAddress: z.object({
      firstName: z.string().min(2, 'Le prénom est requis'),
      lastName: z.string().min(2, 'Le nom est requis'),
      address: z.string().min(5, 'L\'adresse est requise'),
      city: z.string().min(2, 'La ville est requise'),
      postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
      country: z.string().min(2, 'Le pays est requis')
    }),

    paymentMethod: z.enum(['card', 'paypal'], {
      errorMap: () => ({ message: 'Méthode de paiement invalide' })
    })
  }),

  update: z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], {
      errorMap: () => ({ message: 'Statut invalide' })
    }),
    trackingNumber: z.string().optional()
  })
};