import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getRestaurants } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Clock, Search } from 'lucide-react';

export default function RestaurantsPage() {
  const restaurants = getRestaurants();

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Restaurants</h1>
        <p className="text-muted-foreground mt-2">Explore a world of flavors from our partner restaurants.</p>
      </header>

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for restaurants or cuisines..." className="pl-10" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {restaurants.map((restaurant) => {
          const restaurantImage = PlaceHolderImages.find(p => p.id === restaurant.imageId);
          return (
            <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col group">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                    {restaurantImage && (
                       <Image
                        src={restaurantImage.imageUrl}
                        alt={restaurant.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={restaurantImage.imageHint}
                      />
                    )}
                  </div>
                  <CardTitle className="p-6 pb-2 font-headline">{restaurant.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({restaurant.reviews} reviews)</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
