export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'parfum' | 'tissu';
  image: string;
  images: string[];
  tags: string[];
  featured: boolean;
};

export const parfums: Product[] = [
  {
    id: 1,
    name: "Élégance Dorée",
    price: 95.00,
    description: "Un parfum envoûtant aux notes de vanille et de bois précieux",
    category: "parfum",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
      "https://images.unsplash.com/photo-1541643600914-78b084683601"
    ],
    tags: ["vanille", "bois", "oriental"],
    featured: true
  },
  {
    id: 2,
    name: "Nuit d'Afrique",
    price: 120.00,
    description: "Une fragrance mystérieuse aux accents de jasmin et d'ambre",
    category: "parfum",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94c5b3f1",
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94c5b3f1",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    ],
    tags: ["jasmin", "ambre", "floral"],
    featured: true
  }
];

export const tissus: Product[] = [
  {
    id: 3,
    name: "Wax Royal",
    price: 75.00,
    description: "Tissu wax authentique aux motifs géométriques traditionnels",
    category: "tissu",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "https://images.unsplash.com/photo-1533827432537-70133748f5c8"
    ],
    tags: ["wax", "géométrique", "traditionnel"],
    featured: true
  }
];

export const getAllProducts = (): Product[] => [...parfums, ...tissus];

export const getProductById = (id: number): Product | undefined => 
  getAllProducts().find(product => product.id === id);

export const getProductsByCategory = (category: 'parfum' | 'tissu'): Product[] =>
  getAllProducts().filter(product => product.category === category);

export const getFeaturedProducts = (): Product[] =>
  getAllProducts().filter(product => product.featured);

export const getProductsByTag = (tag: string): Product[] =>
  getAllProducts().filter(product => product.tags.includes(tag));