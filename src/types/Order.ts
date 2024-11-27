// Types pour les commandes
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: Date;
  total: number;
  status: 'en_cours' | 'expedie' | 'livre';
  items: OrderItem[];
}