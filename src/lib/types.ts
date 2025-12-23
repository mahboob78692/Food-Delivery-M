export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: number;
  imageId: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  category: string;
  available: boolean;
}

export interface RestaurantWithMenu extends Restaurant {
  menu: MenuItem[];
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: { menuItemId: string; quantity: number }[];
  status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
  total: number;
  createdAt: string;
  driverLocation: { lat: number; lng: number };
  restaurantLocation: { lat: number; lng: number };
  userLocation: { lat: number; lng: number };
}
