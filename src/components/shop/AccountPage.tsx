import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Order } from './types';

interface AccountPageProps {
  orders: Order[];
}

export default function AccountPage({ orders }: AccountPageProps) {
  return (
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
  );
}
