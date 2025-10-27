import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface CartProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  cartTotal: number;
  cartItemsCount: number;
  setActiveSection: (section: string) => void;
  setIsCheckoutOpen: (open: boolean) => void;
}

export default function Cart({
  isOpen,
  setIsOpen,
  cart,
  removeFromCart,
  updateQuantity,
  cartTotal,
  cartItemsCount,
  setActiveSection,
  setIsCheckoutOpen
}: CartProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
          <SheetDescription>
            {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cartItemsCount}`}
          </SheetDescription>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Добавьте товары в корзину</p>
            <Button className="mt-6" onClick={() => { setIsOpen(false); setActiveSection('catalog'); }}>
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full pt-6">
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-serif text-sm">{item.name}</h4>
                        <p className="text-accent font-light">{item.price}</p>
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="ml-auto h-7 w-7 p-0 text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Итого:</span>
                <span className="font-serif text-2xl text-accent">₽ {cartTotal.toLocaleString('ru-RU')}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  setIsOpen(false);
                  setIsCheckoutOpen(true);
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
