export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'parfum' | 'tissu';
  image: string;
  images: string[];
  tags: string[];
  featured: boolean;
  stock?: number;
  sku?: string;
}