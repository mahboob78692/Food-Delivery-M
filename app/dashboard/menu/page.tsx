import { getRestaurantById } from "@/lib/data"
import { MenuDataTable } from "@/components/menu-data-table"
import { Card, CardDescription } from "@/components/ui/card"

export default function MenuManagementPage() {
  // We'll use a mock restaurant ID for this example.
  // In a real app, this would come from the authenticated user's session.
  const restaurant = getRestaurantById("1")

  if (!restaurant) {
    return (
      <Card>
        <CardDescription>Could not find restaurant data.</CardDescription>
      </Card>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-2">Menu Management</h1>
      <p className="text-muted-foreground mb-8">
        Manage the menu for <span className="font-semibold text-foreground">{restaurant.name}</span>.
      </p>
      <MenuDataTable initialData={restaurant.menu} />
    </div>
  )
}
