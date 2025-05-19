import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart, Product } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter, 
  SheetClose 
} from "@/components/ui/sheet";
import { Search, ShoppingCart, Plus, Minus, X } from "lucide-react";

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Sensory Fidget Cube",
    nameAr: "مكعب فيدجيت الحسي",
    price: 19.99,
    priceAr: 75,
    category: "sensory",
    image: "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Multi-textured fidget cube to help with focus and sensory stimulation",
    descriptionAr: "مكعب متعدد الملمس للمساعدة في التركيز والتحفيز الحسي"
  },
  {
    id: 2,
    name: "Communication Cards Set",
    nameAr: "مجموعة بطاقات التواصل",
    price: 24.99,
    priceAr: 94,
    category: "communication",
    image: "https://images.unsplash.com/photo-1606676539940-12768ce0e762?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Visual communication cards to help express needs and feelings",
    descriptionAr: "بطاقات تواصل مرئية للمساعدة في التعبير عن الاحتياجات والمشاعر"
  },
  {
    id: 3,
    name: "Shape Sorting Cube",
    nameAr: "مكعب فرز الأشكال",
    price: 29.99,
    priceAr: 112,
    category: "educational",
    image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Wooden shape sorter to develop fine motor skills and shape recognition",
    descriptionAr: "فارز أشكال خشبي لتطوير المهارات الحركية الدقيقة والتعرف على الأشكال"
  },
  {
    id: 4,
    name: "Weighted Blanket",
    nameAr: "بطانية مثقلة",
    price: 59.99,
    priceAr: 225,
    category: "sensory",
    image: "https://images.unsplash.com/photo-1584598147860-91176b269d74?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Weighted blanket for comfort and deep pressure stimulation",
    descriptionAr: "بطانية مثقلة للراحة وتحفيز الضغط العميق"
  },
  {
    id: 5,
    name: "Picture Exchange System",
    nameAr: "نظام تبادل الصور",
    price: 34.99,
    priceAr: 131,
    category: "communication",
    image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Complete PECS kit for visual communication development",
    descriptionAr: "مجموعة كاملة من نظام تبادل الصور لتطوير التواصل المرئي"
  },
  {
    id: 6,
    name: "Emotion Recognition Game",
    nameAr: "لعبة التعرف على المشاعر",
    price: 22.99,
    priceAr: 86,
    category: "educational",
    image: "https://images.unsplash.com/photo-1568377210220-11ea79ef9d55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    description: "Card game to help recognize and understand different emotions",
    descriptionAr: "لعبة بطاقات للمساعدة في التعرف على المشاعر المختلفة وفهمها"
  }
];

export default function Shop() {
  const { t, i18n } = useTranslation();
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = (
      (i18n.language === "en" ? product.name : product.nameAr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (i18n.language === "en" ? product.description : product.descriptionAr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories = [
    { id: "all", name: t('ecommerce.allCategories') },
    { id: "sensory", name: t('ecommerce.sensory') },
    { id: "educational", name: t('ecommerce.educational') },
    { id: "communication", name: t('ecommerce.communication') }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('ecommerce.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filteredProducts.length} {i18n.language === "en" ? "products available" : "منتج متاح"}
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('ecommerce.search')}
              className="pl-9 rtl:pl-4 rtl:pr-9 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="ml-4 rtl:ml-0 rtl:mr-4 relative rounded-full md:hidden"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-min">
          <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t('ecommerce.category')}</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <button 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`block w-full text-left rtl:text-right px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === category.id 
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary dark:text-primary-foreground" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Desktop Cart Summary */}
          <div className="mt-8 hidden md:block">
            <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t('ecommerce.cart')}</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('ecommerce.emptyCart')}</p>
            ) : (
              <div>
                <div className="mb-4">
                  {cart.slice(0, 2).map(item => (
                    <div key={item.id} className="flex items-center justify-between mb-2 text-sm">
                      <span className="truncate max-w-[180px]">
                        {i18n.language === "en" ? item.name : item.nameAr} ({item.quantity})
                      </span>
                      <span className="font-medium">
                        {formatPrice(
                          (i18n.language === "en" ? item.price : item.priceAr) * item.quantity,
                          i18n.language === "en" ? "USD" : "SAR"
                        )}
                      </span>
                    </div>
                  ))}
                  {cart.length > 2 && (
                    <p className="text-gray-500 text-xs">
                      {t('ecommerce.moreItems', { count: cart.length - 2 })}
                    </p>
                  )}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mb-4">
                  <div className="flex justify-between font-medium">
                    <span>{t('ecommerce.total')}</span>
                    <span>
                      {formatPrice(cartTotal, i18n.language === "en" ? "USD" : "SAR")}
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setIsCartOpen(true)}
                >
                  {t('ecommerce.viewCart')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('ecommerce.noProducts')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('ecommerce.tryDifferent')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={i18n.language === "en" ? product.name : product.nameAr} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {i18n.language === "en" 
                          ? product.category.charAt(0).toUpperCase() + product.category.slice(1) 
                          : product.category === "sensory" 
                            ? "أدوات حسية" 
                            : product.category === "educational" 
                              ? "ألعاب تعليمية" 
                              : "وسائل تواصل"
                        }
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                      {i18n.language === "en" ? product.name : product.nameAr}
                    </h3>
                    <p className="text-primary font-bold mb-2">
                      {formatPrice(
                        i18n.language === "en" ? product.price : product.priceAr,
                        i18n.language === "en" ? "USD" : "SAR"
                      )}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {i18n.language === "en" ? product.description : product.descriptionAr}
                    </p>
                    <div className="flex justify-between">
                      <Button 
                        onClick={() => addToCart(product)}
                        className="flex items-center"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                        {t('ecommerce.addToCart')}
                      </Button>
                      <Button variant="outline">
                        {t('ecommerce.viewDetails')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Shopping Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side={i18n.language === "ar" ? "right" : "left"} className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
              {t('ecommerce.cart')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 h-[calc(100vh-10rem)] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">{t('ecommerce.emptyCart')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img
                        src={item.image}
                        alt={i18n.language === "en" ? item.name : item.nameAr}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 rtl:ml-0 rtl:mr-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3>
                            {i18n.language === "en" ? item.name : item.nameAr}
                          </h3>
                          <p className="ml-4 rtl:ml-0 rtl:mr-4">
                            {formatPrice(
                              i18n.language === "en" ? item.price : item.priceAr,
                              i18n.language === "en" ? "USD" : "SAR"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 py-1 text-center w-8">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                          {t('ecommerce.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <SheetFooter className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="w-full">
              <div className="flex justify-between mb-2 font-medium">
                <span>{t('ecommerce.subtotal')}</span>
                <span>
                  {formatPrice(cartTotal, i18n.language === "en" ? "USD" : "SAR")}
                </span>
              </div>
              <div className="flex justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{t('ecommerce.shipping')}</span>
                <span>{t('ecommerce.free')}</span>
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full" disabled={cart.length === 0}>
                  {t('ecommerce.checkout')}
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    {t('ecommerce.continueShopping')}
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
