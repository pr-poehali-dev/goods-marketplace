import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const products = [
  {
    id: 1,
    name: 'Классические часы Elegance',
    price: '₽ 289 000',
    image: 'https://cdn.poehali.dev/projects/ce1330d4-b304-4375-bb50-d64b10be5261/files/fc85e544-be14-4e71-bbc3-d953f75a41df.jpg',
    category: 'Часы'
  },
  {
    id: 2,
    name: 'Сумка из итальянской кожи',
    price: '₽ 195 000',
    image: 'https://cdn.poehali.dev/projects/ce1330d4-b304-4375-bb50-d64b10be5261/files/2bfad32c-8387-4ae9-a7da-445e9a22c8a1.jpg',
    category: 'Аксессуары'
  },
  {
    id: 3,
    name: 'Золотое колье с бриллиантами',
    price: '₽ 425 000',
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
      </header>

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
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <h4 className="font-serif text-xl">{product.name}</h4>
                        <p className="text-2xl font-light text-accent">{product.price}</p>
                        <Button className="w-full" variant="outline">
                          Подробнее
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
            <h2 className="font-serif text-4xl mb-8">Каталог</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">Все товары</TabsTrigger>
                <TabsTrigger value="watches">Часы</TabsTrigger>
                <TabsTrigger value="accessories">Аксессуары</TabsTrigger>
                <TabsTrigger value="jewelry">Украшения</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <h4 className="font-serif text-xl">{product.name}</h4>
                        <p className="text-2xl font-light text-accent">{product.price}</p>
                        <Button className="w-full">В корзину</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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