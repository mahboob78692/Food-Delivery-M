import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Truck, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Restaurant Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Menu Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Add, edit, or remove items from your menu.
            </p>
            <Link href="/dashboard/menu">
              <Button>
                Manage Menu <ChefHat className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and manage incoming and active orders.
            </p>
            <Link href="#">
              <Button variant="secondary">
                View Orders <Truck className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Welcome, Restaurant Manager!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is your central hub for managing your restaurant on Food Delivery M.
              You can update your menu, track orders, and view your performance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
