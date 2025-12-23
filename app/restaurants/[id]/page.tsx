import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getRestaurantById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    notFound();
  }

  const restaurantImage = PlaceHolderImages.find(p => p.id === restaurant.imageId);
  const menuCategories = [...new Set(restaurant.menu.map(item => item.category))];

  return (
    <div>
      <div className="relative h-64 md:h-80 w-full">
        {restaurantImage && (
            <Image
                src={restaurantImage.imageUrl}
                alt={restaurant.name}
                fill
                className="object-cover"
                data-ai-hint={restaurantImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline drop-shadow-lg">{restaurant.name}</h1>
            <p className="text-lg mt-1">{restaurant.cuisine}</p>
            <div className="flex items-center mt-4 text-sm">
              <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
              <span className="font-bold">{restaurant.rating.toFixed(1)}</span>
              <span className="text-white/80 ml-1">({restaurant.reviews} reviews)</span>
              <span className="mx-2 text-white/80">·</span>
              <Clock className="w-5 h-5 mr-1 text-white/80" />
              <span>{restaurant.deliveryTime} min delivery</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 font-headline">Menu</h2>
        
        {menuCategories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold font-headline mb-6 border-b pb-2">{category}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {restaurant.menu.filter(item => item.category === category).map(item => {
                const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
                return (
                  <Card key={item.id} className="flex flex-col md:flex-row items-start overflow-hidden transition-shadow hover:shadow-md">
                    {itemImage && (
                      <div className="relative w-full h-48 md:w-48 md:h-full flex-shrink-0">
                         <Image
                          src={itemImage.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          data-ai-hint={itemImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-between p-6 w-full h-full">
                      <div>
                        <CardTitle className="text-xl font-headline">{item.name}</CardTitle>
                        <CardDescription className="mt-2 text-sm">{item.description}</CardDescription>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                        {item.available ? (
                          <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add
                          </Button>
                        ) : (
                          <Badge variant="outline">Unavailable</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
