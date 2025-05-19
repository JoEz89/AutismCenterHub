import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '@shared/schema';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Calculate total
  const total = items.reduce((sum, item) => {
    const price = language === 'ar' ? item.priceAr : item.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {t('cart')}
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">{t('emptyCart')}</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[65vh] pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={language === 'ar' ? item.nameAr : item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium leading-none truncate mb-1">
                        {language === 'ar' ? item.nameAr : item.name}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>
                          {language === 'ar' 
                            ? `${item.priceAr.toFixed(2)} ${t('currency')}` 
                            : `$${item.price.toFixed(2)}`}
                        </span>
                        <span className="mx-2">×</span>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${language === 'ar' ? item.nameAr : item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-4 mt-6">
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">{t('totalPrice')}</span>
                <span className="font-bold text-primary">
                  {language === 'ar' 
                    ? `${total.toFixed(2)} ${t('currency')}` 
                    : `$${total.toFixed(2)}`}
                </span>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="w-full" size="lg">{t('checkout')}</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
