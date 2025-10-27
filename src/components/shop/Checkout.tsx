import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CartItem } from './types';

interface CheckoutProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: CartItem[];
  cartTotal: number;
  handleCheckout: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Checkout({
  isOpen,
  setIsOpen,
  cart,
  cartTotal,
  handleCheckout
}: CheckoutProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Оформление заказа</SheetTitle>
          <SheetDescription>
            Заполните данные для доставки
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleCheckout} className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя и фамилия</Label>
              <Input id="name" placeholder="Иван Иванов" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@mail.ru" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Адрес доставки</Label>
              <Input id="address" placeholder="Улица, дом, квартира" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input id="city" placeholder="Москва" required />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-semibold">Состав заказа:</h4>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="text-accent">₽ {(item.priceNum * item.quantity).toLocaleString('ru-RU')}</span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Итого:</span>
            <span className="font-serif text-2xl text-accent">₽ {cartTotal.toLocaleString('ru-RU')}</span>
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            Подтвердить заказ
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
