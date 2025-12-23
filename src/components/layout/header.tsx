'use client';

import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/order-tracking/xyz-123', label: 'Track Order' },
  { href: '/dashboard/menu', label: 'Dashboard' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  const desktopNav = (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
  
  const mobileNav = (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-6 pt-10">
          <Link href="/" className="flex items-center gap-2 mb-4" onClick={closeSheet}>
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Food Delivery M</span>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-foreground/80 hover:text-foreground"
              onClick={closeSheet}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block font-bold font-headline">
              Food Delivery M
            </span>
          </Link>
          {desktopNav}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
             <Link href="/checkout">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
             </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">User Profile</span>
            </Link>
          </Button>
          {isMobile && mobileNav}
        </div>
      </div>
    </header>
  );
}
