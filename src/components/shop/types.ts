export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}
