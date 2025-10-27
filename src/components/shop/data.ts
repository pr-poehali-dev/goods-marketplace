import { Product, Review, Order } from './types';

export const products: Product[] = [
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

export const reviews: Review[] = [
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

export const orders: Order[] = [
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
