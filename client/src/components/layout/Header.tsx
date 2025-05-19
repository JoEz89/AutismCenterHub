import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LocaleSwitch from '@/components/shared/LocaleSwitch';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartItemsCount?: number;
  onCartOpen?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount = 0, onCartOpen }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'home' },
    { path: '/products', label: 'products' },
    { path: '/courses', label: 'courses' },
    { path: '/appointments', label: 'appointments' },
    { path: '/admin', label: 'admin' }
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Heart className="h-5 w-5" />
          </div>
          <Link href="/">
            <a className="text-xl font-bold text-primary cursor-pointer">
              {t('siteName')}
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navLinks.map(link => (
            <Link key={link.path} href={link.path}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {t(link.label)}
              </a>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Cart Button (show only on products page) */}
          {location === '/products' && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartOpen}
              aria-label={t('cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Switch */}
          <LocaleSwitch className="hidden md:flex" />

          {/* Login Button */}
          <Button size="sm" className="hidden md:flex">
            {t('login')}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'right' : 'left'}>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <Link key={link.path} href={link.path}>
                    <a
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        isActive(link.path) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(link.label)}
                    </a>
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t flex flex-col gap-4">
                  <LocaleSwitch />
                  <Button size="sm">
                    {t('login')}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
