import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';
import { Product } from './types';

interface HomePageProps {
  products: Product[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (product: Product) => void;
  setActiveSection: (section: string) => void;
}

export default function HomePage({
  products,
  favorites,
  toggleFavorite,
  addToCart,
  setActiveSection
}: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container relative z-10 text-center space-y-6">
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight animate-scale-in">
            Роскошь в каждой детали
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Эксклюзивные изделия для ценителей совершенства
          </p>
          <Button 
            size="lg" 
            className="mt-8"
            onClick={() => setActiveSection('catalog')}
          >
            Посмотреть коллекцию
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container">
          <h3 className="font-serif text-4xl text-center mb-16">Избранное</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <Icon name="Award" size={48} className="mx-auto text-accent" />
            <h4 className="font-serif text-xl">Премиальное качество</h4>
            <p className="text-muted-foreground">Только лучшие материалы и ручная работа мастеров</p>
          </div>
          <div className="space-y-4">
            <Icon name="Shield" size={48} className="mx-auto text-accent" />
            <h4 className="font-serif text-xl">Гарантия подлинности</h4>
            <p className="text-muted-foreground">Сертификат на каждое изделие</p>
          </div>
          <div className="space-y-4">
            <Icon name="Truck" size={48} className="mx-auto text-accent" />
            <h4 className="font-serif text-xl">Доставка по всему миру</h4>
            <p className="text-muted-foreground">Безопасная и быстрая доставка</p>
          </div>
        </div>
      </section>
    </div>
  );
}
