import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Классические часы Elegance',
    price: '₽ 289 000',
    priceNum: 289000,
    image: 'https://cdn.poehali.dev/projects/ce1330d4-b304-4375-bb50-d64b10be5261/files/fc85e544-be14-4e71-bbc3-d953f75a41df.jpg',
    category: 'Часы'
  },
  {
    id: 2,
    name: 'Сумка из итальянской кожи',
    price: '₽ 195 000',
    priceNum: 195000,
    image: 'https://cdn.poehali.dev/projects/ce1330d4-b304-4375-bb50-d64b10be5261/files/2bfad32c-8387-4ae9-a7da-445e9a22c8a1.jpg',
    category: 'Аксессуары'
  },
  {
    id: 3,
    name: 'Золотое колье с бриллиантами',
    price: '₽ 425 000',
    priceNum: 425000,
    image: 'https://cdn.poehali.dev/projects/ce1330d4-b304-4375-bb50-d64b10be5261/files/6a4e42b9-e785-425d-b78e-63dbdd911804.jpg',
    category: 'Украшения'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна Волкова',
    rating: 5,
    text: 'Невероятное качество! Каждая деталь продумана до мелочей. Сервис на высшем уровне.',
    date: '15 октября 2024'
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    rating: 5,
    text: 'Приобрел часы для особого случая. Превзошли все ожидания. Рекомендую!',
    date: '8 октября 2024'
  },
  {
    id: 3,
    name: 'Екатерина Новикова',
    rating: 5,
    text: 'Роскошь в каждой детали. Упаковка достойна отдельного восхищения.',
    date: '2 октября 2024'
  }
];

const orders = [
  {
    id: '#ORD-2024-1847',
    date: '20 октября 2024',
    status: 'Доставляется',
    total: '₽ 289 000',
    items: 1
  },
  {
    id: '#ORD-2024-1621',
    date: '5 октября 2024',
    status: 'Доставлен',
    total: '₽ 195 000',
    items: 1
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Добавлено в корзину',
      description: product.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        toast({
          title: 'Удалено из избранного',
        });
        return prev.filter(id => id !== productId);
      } else {
        toast({
          title: 'Добавлено в избранное',
        });
        return [...prev, productId];
      }
    });
  };

  const filteredProducts = products.filter(
    product => product.priceNum >= priceRange[0] && product.priceNum <= priceRange[1]
  );

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Заказ оформлен!',
      description: `Спасибо за покупку! Сумма заказа: ₽ ${cartTotal.toLocaleString('ru-RU')}`,
    });
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveSection('account');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
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
              <Icon name="Heart" size={16} className={favorites.length > 0 ? 'fill-accent text-accent' : ''} />
              {favorites.length > 0 && (
                <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {favorites.length}
                </Badge>
              )}
              <span className="hidden sm:inline">Избранное</span>
            </Button>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 relative">
                  <Icon name="ShoppingCart" size={16} />
                  {cartItemsCount > 0 && (
                    <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                  <span className="hidden sm:inline">Корзина</span>
                </Button>
              </SheetTrigger>
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
                    <Button className="mt-6" onClick={() => { setIsCartOpen(false); setActiveSection('catalog'); }}>
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
                          setIsCartOpen(false);
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

      <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
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

      <main>
        {activeSection === 'home' && (
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
                    <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={20} 
                            className={favorites.includes(product.id) ? 'fill-accent text-accent' : ''}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <h4 className="font-serif text-xl">{product.name}</h4>
                        <p className="text-2xl font-light text-accent">{product.price}</p>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => addToCart(product)}
                        >
                          В корзину
                        </Button>
                      </CardContent>
                    </Card>
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
        )}

        {activeSection === 'catalog' && (
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
                    <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={20} 
                            className={favorites.includes(product.id) ? 'fill-accent text-accent' : ''}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <h4 className="font-serif text-xl">{product.name}</h4>
                        <p className="text-2xl font-light text-accent">{product.price}</p>
                        <Button 
                          className="w-full"
                          onClick={() => addToCart(product)}
                        >
                          В корзину
                        </Button>
                      </CardContent>
                    </Card>
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
        )}

        {activeSection === 'about' && (
          <div className="container py-12 max-w-4xl animate-fade-in">
            <h2 className="font-serif text-4xl mb-8">О бренде</h2>
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg leading-relaxed">
                <strong className="font-serif text-xl">ÉLITE</strong> — это философия роскоши, воплощенная в каждом изделии. 
                С 2010 года мы создаем эксклюзивные коллекции для людей, которые ценят безупречное качество и изысканный стиль.
              </p>
              <div className="bg-secondary/30 p-8 rounded-lg my-8">
                <h3 className="font-serif text-2xl mb-4">Наши ценности</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <span><strong>Мастерство</strong> — каждое изделие создается вручную опытными мастерами</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <span><strong>Эксклюзивность</strong> — ограниченные коллекции для избранных</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <span><strong>Наследие</strong> — традиции в сочетании с современным дизайном</span>
                  </li>
                </ul>
              </div>
              <p className="text-lg leading-relaxed">
                Мы работаем только с проверенными поставщиками премиальных материалов: 
                швейцарские часовые механизмы, итальянская кожа, драгоценные камни с международными сертификатами.
              </p>
              <p className="text-lg leading-relaxed">
                Наша миссия — делать роскошь доступной для тех, кто действительно понимает её ценность.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="container py-12 max-w-4xl animate-fade-in">
            <h2 className="font-serif text-4xl mb-8">Отзывы клиентов</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Оставить отзыв
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'favorites' && (
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
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={20} 
                          className="fill-accent text-accent"
                        />
                      </Button>
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      <h4 className="font-serif text-xl">{product.name}</h4>
                      <p className="text-2xl font-light text-accent">{product.price}</p>
                      <Button 
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'account' && (
          <div className="container py-12 max-w-4xl animate-fade-in">
            <h2 className="font-serif text-4xl mb-8">Личный кабинет</h2>
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="orders">Мои заказы</TabsTrigger>
                <TabsTrigger value="profile">Профиль</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">{order.id}</h4>
                            <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} className="inline mr-1" />
                            {order.date}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <Icon name="Package" size={14} className="inline mr-1" />
                            {order.items} {order.items === 1 ? 'товар' : 'товара'}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <p className="text-2xl font-light text-accent">{order.total}</p>
                          <Button variant="outline" className="w-full">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="profile" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Имя</label>
                      <p className="text-muted-foreground">Александр Петров</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-muted-foreground">alexandr@example.com</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                    <Button className="mt-4">Редактировать профиль</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-24 py-12 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold">ÉLITE</h3>
              <p className="text-sm text-muted-foreground">
                Эксклюзивные изделия премиум-класса
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Контакты</h4>
              <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
              <p className="text-sm text-muted-foreground">info@elite-shop.ru</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Информация</h4>
              <p className="text-sm text-muted-foreground">Доставка и оплата</p>
              <p className="text-sm text-muted-foreground">Гарантия</p>
              <p className="text-sm text-muted-foreground">Возврат</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Следите за нами</h4>
              <div className="flex gap-4">
                <Icon name="Instagram" size={20} className="text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ÉLITE. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}