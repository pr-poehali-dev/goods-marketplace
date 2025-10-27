import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemsCount: number;
  favoritesCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  cartItemsCount, 
  favoritesCount,
  setIsCartOpen 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="font-serif text-2xl font-bold tracking-tight">ÉLITE</h1>
        
        <nav className="hidden md:flex gap-8">
          <button 
            onClick={() => setActiveSection('home')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Главная
          </button>
          <button 
            onClick={() => setActiveSection('catalog')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'catalog' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Каталог
          </button>
          <button 
            onClick={() => setActiveSection('about')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'about' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            О бренде
          </button>
          <button 
            onClick={() => setActiveSection('reviews')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'reviews' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Отзывы
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveSection('favorites')}
            className="gap-2 relative"
          >
            <Icon name="Heart" size={16} className={favoritesCount > 0 ? 'fill-accent text-accent' : ''} />
            {favoritesCount > 0 && (
              <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {favoritesCount}
              </Badge>
            )}
            <span className="hidden sm:inline">Избранное</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <Icon name="ShoppingCart" size={16} />
            {cartItemsCount > 0 && (
              <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemsCount}
              </Badge>
            )}
            <span className="hidden sm:inline">Корзина</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveSection('account')}
            className="gap-2"
          >
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Личный кабинет</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
