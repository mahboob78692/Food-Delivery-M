import type { Restaurant, MenuItem, RestaurantWithMenu, Order } from './types';

const restaurants: Restaurant[] = [
  { id: '1', name: 'Bella Italia', cuisine: 'Italian', rating: 4.5, reviews: 250, deliveryTime: 30, imageId: 'restaurant-1' },
  { id: '2', name: 'Sushi Palace', cuisine: 'Japanese', rating: 4.8, reviews: 400, deliveryTime: 45, imageId: 'restaurant-2' },
  { id: '3', name: 'The Green Bowl', cuisine: 'Salads & Healthy', rating: 4.2, reviews: 150, deliveryTime: 25, imageId: 'restaurant-3' },
  { id: '4', name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.6, reviews: 320, deliveryTime: 35, imageId: 'restaurant-4' },
];

const menus: Record<string, MenuItem[]> = {
  '1': [
    { id: 'm1-1', name: 'Margherita Pizza', description: 'Classic pizza with tomatoes, mozzarella, and basil.', price: 12.99, imageId: 'menu-pizza', category: 'Pizza', available: true },
    { id: 'm1-2', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta and parmesan.', price: 15.50, imageId: 'menu-pasta', category: 'Pasta', available: true },
    { id: 'm1-3', name: 'Caesar Salad', description: 'Fresh romaine with Caesar dressing and croutons.', price: 9.99, imageId: 'menu-salad', category: 'Salads', available: false },
  ],
  '2': [
    { id: 'm2-1', name: 'California Roll', description: 'Crab, avocado, and cucumber.', price: 8.99, imageId: 'menu-sushi-roll', category: 'Sushi', available: true },
    { id: 'm2-2', name: 'Tonkotsu Ramen', description: 'Rich pork broth ramen with chashu pork.', price: 14.50, imageId: 'menu-ramen', category: 'Ramen', available: true },
  ],
  '3': [
    { id: 'm3-1', name: 'Quinoa Power Bowl', description: 'Quinoa, avocado, chickpeas, and mixed greens.', price: 13.99, imageId: 'menu-salad', category: 'Bowls', available: true },
    { id: 'm3-2', name: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese.', price: 11.50, imageId: 'menu-burger', category: 'Burgers', available: true },
  ],
  '4': [
    { id: 'm4-1', name: 'Carne Asada Tacos', description: 'Three grilled steak tacos with onion and cilantro.', price: 10.99, imageId: 'menu-tacos', category: 'Tacos', available: true },
    { id: 'm4-2', name: 'Chicken Burrito', description: 'Large burrito filled with chicken, rice, beans, and cheese.', price: 12.50, imageId: 'menu-burrito', category: 'Burritos', available: true },
  ],
};

const orders: Order[] = [
    {
        id: 'xyz-123',
        userId: 'user-1',
        restaurantId: '1',
        items: [{ menuItemId: 'm1-1', quantity: 2 }],
        status: 'out-for-delivery',
        total: 25.98,
        createdAt: new Date().toISOString(),
        restaurantLocation: { lat: 34.052235, lng: -118.243683 }, // LA
        userLocation: { lat: 34.062235, lng: -118.253683 }, // Near LA
        driverLocation: { lat: 34.055235, lng: -118.248683 }, // Between
    }
]

export function getRestaurants(): Restaurant[] {
  return restaurants;
}

export function getRestaurantById(id: string): RestaurantWithMenu | undefined {
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return undefined;
  return {
    ...restaurant,
    menu: menus[id] || [],
  };
}

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}
