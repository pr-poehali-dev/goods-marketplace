import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import ProductCard from './ProductCard';
import { Product } from './types';

interface CatalogPageProps {
  products: Product[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (product: Product) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

export default function CatalogPage({
  products,
  favorites,
  toggleFavorite,
  addToCart,
  priceRange,
  setPriceRange
}: CatalogPageProps) {
  const filteredProducts = products.filter(
    product => product.priceNum >= priceRange[0] && product.priceNum <= priceRange[1]
  );

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 space-y-6">
          <div>
            <h3 className="font-serif text-2xl mb-4">Фильтры</h3>
          </div>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">Цена</Label>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={500000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₽ {priceRange[0].toLocaleString('ru-RU')}</span>
                    <span>₽ {priceRange[1].toLocaleString('ru-RU')}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setPriceRange([0, 500000])}
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        </aside>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-4xl">Каталог</h2>
            <p className="text-muted-foreground">Найдено: {filteredProducts.length}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Товары не найдены</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setPriceRange([0, 500000])}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
