import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Star,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRestaurants } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredRestaurants = getRestaurants().slice(0, 3);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            Craving something delicious?
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
            Get your favorite meals from local restaurants delivered right to
            your door.
          </p>
          <Link href="/restaurants">
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Find Food Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="restaurants" className="py-12 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-headline">
            Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => {
              const restaurantImage = PlaceHolderImages.find(p => p.id === restaurant.imageId);
              return (
                <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48">
                        {restaurantImage && (
                           <Image
                            src={restaurantImage.imageUrl}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
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
          <div className="text-center mt-12">
            <Link href="/restaurants">
              <Button variant="outline">
                View All Restaurants <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
