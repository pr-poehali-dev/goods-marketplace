import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';
import { Product } from './types';

interface FavoritesPageProps {
  favoriteProducts: Product[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (product: Product) => void;
  setActiveSection: (section: string) => void;
}

export default function FavoritesPage({
  favoriteProducts,
  favorites,
  toggleFavorite,
  addToCart,
  setActiveSection
}: FavoritesPageProps) {
  return (
    <div className="container py-12 animate-fade-in">
      <h2 className="font-serif text-4xl mb-8">Избранное</h2>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-24">
          <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">Ваш список избранного пуст</p>
          <p className="text-muted-foreground mb-6">Добавьте товары, которые вам понравились</p>
          <Button onClick={() => setActiveSection('catalog')}>
            Перейти в каталог
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
