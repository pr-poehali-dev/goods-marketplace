import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
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
  );
}
