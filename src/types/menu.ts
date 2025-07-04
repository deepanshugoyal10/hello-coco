export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
}
