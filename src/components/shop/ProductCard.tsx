import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-10 w-10 p-0 bg-background/80 hover:bg-background"
          onClick={() => onToggleFavorite(product.id)}
        >
          <Icon 
            name="Heart" 
            size={20} 
            className={isFavorite ? 'fill-accent text-accent' : ''}
          />
        </Button>
      </div>
      <CardContent className="p-6 space-y-3">
        <Badge variant="outline" className="text-xs">{product.category}</Badge>
        <h4 className="font-serif text-xl">{product.name}</h4>
        <p className="text-2xl font-light text-accent">{product.price}</p>
        <Button 
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
}
