export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "L'art de la parfumerie africaine",
    slug: "art-parfumerie-africaine",
    excerpt: "Découvrez les secrets ancestraux des parfums africains et leur influence sur la parfumerie moderne.",
    content: `
      <p>La parfumerie africaine est un art millénaire qui puise ses racines dans les traditions les plus anciennes du continent. Les maîtres parfumeurs africains ont développé des techniques uniques pour capturer les essences naturelles et créer des fragrances incomparables.</p>
      
      <h2>Les ingrédients traditionnels</h2>
      <p>Les parfums africains utilisent une variété d'ingrédients naturels, notamment :</p>
      <ul>
        <li>L'encens d'Éthiopie</li>
        <li>La myrrhe de Somalie</li>
        <li>Le bois de santal du Ghana</li>
        <li>Les fleurs de jasmin du Maroc</li>
      </ul>
      
      <h2>L'héritage moderne</h2>
      <p>Aujourd'hui, ces traditions ancestrales inspirent une nouvelle génération de parfumeurs qui créent des fragrances contemporaines tout en respectant les méthodes traditionnelles.</p>
    `,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
    date: "2024-03-15",
    author: "Sophie Martin",
    categories: ["parfums", "culture"],
    tags: ["parfumerie", "tradition", "artisanat"]
  },
  {
    id: 2,
    title: "Histoire des tissus wax",
    slug: "histoire-tissus-wax",
    excerpt: "Plongez dans l'histoire fascinante des tissus wax et leur importance culturelle en Afrique.",
    content: `
      <p>Les tissus wax sont bien plus qu'un simple textile - ils racontent l'histoire riche et complexe des cultures africaines. Chaque motif a une signification profonde et raconte une histoire unique.</p>
      
      <h2>Origines du wax</h2>
      <p>Le tissu wax trouve ses origines dans le batik indonésien, mais il a été adopté et transformé par les cultures africaines pour devenir un symbole d'identité et d'expression artistique.</p>
      
      <h2>Symbolisme des motifs</h2>
      <p>Chaque motif wax raconte une histoire ou transmet un message. Les symboles peuvent représenter :</p>
      <ul>
        <li>Des proverbes traditionnels</li>
        <li>Des événements historiques</li>
        <li>Des statuts sociaux</li>
        <li>Des célébrations</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    date: "2024-03-10",
    author: "Jean Dupont",
    categories: ["tissus", "culture"],
    tags: ["wax", "tradition", "mode"]
  }
];

// Fonction utilitaire pour obtenir toutes les catégories uniques
export const getAllCategories = () => {
  const categories = new Set<string>();
  blogPosts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories);
};