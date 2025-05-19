import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/products/Cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { items, addToCart, removeFromCart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('siteName')} - {t('products')}</title>
        <meta name="description" content="Shop for specialized educational toys, sensory tools, and communication aids designed for children with autism." />
        <meta property="og:title" content="Educational Products for Autism Support" />
        <meta property="og:description" content="Shop for specialized educational toys, sensory tools, and communication aids designed for children with autism." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('shopProducts')}</h1>
          
          {/* Mobile Cart Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={handleOpenCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <ProductGrid 
          products={products} 
          onAddToCart={addToCart} 
        />

        <Cart 
          isOpen={isCartOpen} 
          onClose={handleCloseCart} 
          items={items} 
          onRemoveItem={removeFromCart} 
        />
      </div>
    </>
  );
};

export default Products;
