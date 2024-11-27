import { z } from 'zod';

export const productValidationSchema = {
  create: z.object({
    name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
    description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
    price: z.number().positive('Le prix doit être positif'),
    category: z.enum(['parfum', 'tissu'], {
      errorMap: () => ({ message: 'Catégorie invalide' })
    }),
    stock: z.number().int().positive('Le stock doit être positif'),
    tags: z.array(z.string()).min(1, 'Au moins un tag est requis')
  }),

  update: z.object({
    name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').optional(),
    description: z.string().min(10, 'La description doit contenir au moins 10 caractères').optional(),
    price: z.number().positive('Le prix doit être positif').optional(),
    stock: z.number().int().positive('Le stock doit être positif').optional(),
    tags: z.array(z.string()).min(1, 'Au moins un tag est requis').optional()
  })
};