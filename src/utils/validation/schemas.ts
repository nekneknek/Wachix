import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(10),
  category: z.enum(['parfum', 'tissu']),
  image: z.string().url(),
  images: z.array(z.string().url()),
  tags: z.array(z.string())
});