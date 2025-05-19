import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('shop'), href: '/shop' },
    { name: t('courses'), href: '/courses' },
    { name: t('appointments'), href: '/appointments' },
    { name: t('admin'), href: '/admin' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex gap-2 items-center mr-4 rtl:mr-0 rtl:ml-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-xl font-bold">AC</span>
          </div>
          <Link href="/" className="font-bold text-xl text-primary">
            {t('siteName')}
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                location === item.href 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4 rtl:space-x-reverse">
          {/* Shopping cart */}
          {location === '/shop' && (
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative rounded-full"
                  aria-label={t('cart')}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side={t('language') === 'ar' ? 'left' : 'right'}>
                <SheetHeader>
                  <SheetTitle>{t('cart')}</SheetTitle>
                </SheetHeader>
                {/* Cart content will be implemented in the cart component */}
              </SheetContent>
            </Sheet>
          )}

          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full w-10 h-10"
            aria-label={theme === "light" ? t('darkMode') : t('lightMode')}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Language toggle */}
          <LanguageToggle />

          {/* Mobile menu */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-full w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-background border-t border-border/40">
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "p-2 rounded transition-colors",
                  location === item.href 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
