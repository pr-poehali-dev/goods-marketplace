import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { products, reviews, orders } from '@/components/shop/data';
import { CartItem, Product } from '@/components/shop/types';
import Header from '@/components/shop/Header';
import Cart from '@/components/shop/Cart';
import Checkout from '@/components/shop/Checkout';
import HomePage from '@/components/shop/HomePage';
import CatalogPage from '@/components/shop/CatalogPage';
import FavoritesPage from '@/components/shop/FavoritesPage';
import AboutPage from '@/components/shop/AboutPage';
import ReviewsPage from '@/components/shop/ReviewsPage';
import AccountPage from '@/components/shop/AccountPage';
import Footer from '@/components/shop/Footer';

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
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={cartItemsCount}
        favoritesCount={favorites.length}
        setIsCartOpen={setIsCartOpen}
      />

      <Cart
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
        cartItemsCount={cartItemsCount}
        setActiveSection={setActiveSection}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        setIsOpen={setIsCheckoutOpen}
        cart={cart}
        cartTotal={cartTotal}
        handleCheckout={handleCheckout}
      />

      <main>
        {activeSection === 'home' && (
          <HomePage
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'catalog' && (
          <CatalogPage
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        )}

        {activeSection === 'favorites' && (
          <FavoritesPage
            favoriteProducts={favoriteProducts}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'about' && <AboutPage />}

        {activeSection === 'reviews' && <ReviewsPage reviews={reviews} />}

        {activeSection === 'account' && <AccountPage orders={orders} />}
      </main>

      <Footer />
    </div>
  );
}
