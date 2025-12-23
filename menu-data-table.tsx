"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export function MenuDataTable({ initialData }: { initialData: MenuItem[] }) {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialData)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [currentItem, setCurrentItem] = React.useState<MenuItem | null>(null)

  const handleEditClick = (item: MenuItem) => {
    setCurrentItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (itemId: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId))
  }
  
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: MenuItem = {
      id: `m-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      available: formData.get("available") === "on",
      imageId: "menu-pizza", // Default image
    };
    setMenuItems([...menuItems, newItem]);
    setIsAddDialogOpen(false);
  }

  const handleEditItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentItem) return;
    const formData = new FormData(e.currentTarget);
    const updatedItem: MenuItem = {
      ...currentItem,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      available: formData.get("available") === "on",
    };
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsEditDialogOpen(false);
    setCurrentItem(null);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">Your Menu</h2>
         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Menu Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddItem} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" name="description" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input id="price" name="price" type="number" step="0.01" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input id="category" name="category" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="available" className="text-right">Available</Label>
                        <Switch id="available" name="available" defaultChecked />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Item</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={item.available ? "default" : "destructive"}>
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteClick(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {currentItem && (
            <form onSubmit={handleEditItem} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name-edit" className="text-right">Name</Label>
                    <Input id="name-edit" name="name" defaultValue={currentItem.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description-edit" className="text-right">Description</Label>
                    <Textarea id="description-edit" name="description" defaultValue={currentItem.description} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price-edit" className="text-right">Price</Label>
                    <Input id="price-edit" name="price" type="number" step="0.01" defaultValue={currentItem.price} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-edit" className="text-right">Category</Label>
                    <Input id="category-edit" name="category" defaultValue={currentItem.category} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="available-edit" className="text-right">Available</Label>
                    <Switch id="available-edit" name="available" defaultChecked={currentItem.available} />
                </div>
                <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
