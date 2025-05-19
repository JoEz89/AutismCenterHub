import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={language === 'ar' ? product.nameAr : product.name} 
          className="w-full h-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {language === 'ar' ? product.nameAr : product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {language === 'ar' ? product.descriptionAr : product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">
            {language === 'ar' 
              ? `${product.priceAr.toFixed(2)} ${t('currency')}` 
              : `$${product.price.toFixed(2)}`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${language === 'ar' ? product.nameAr : product.name} to cart`}
        >
          {t('addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
