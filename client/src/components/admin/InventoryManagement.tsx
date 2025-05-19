import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InventoryManagement: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [productList, setProductList] = useState(products);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  
  const handleDeleteProduct = (id: number) => {
    // In a real app, we would call an API to delete the product
    setProductList(prevProducts => prevProducts.filter(product => product.id !== id));
  };
  
  const handleEditProduct = (id: number) => {
    setEditingProduct(id);
    setIsAddProductOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('inventoryManagement')}</h2>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>{t('addProduct')}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingProduct !== null ? t('editProduct') : t('addProduct')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  {language === 'ar' ? 'الاسم (بالإنجليزية)' : 'Name (English)'}
                </Label>
                <Input id="name" placeholder="Product name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nameAr">
                  {language === 'ar' ? 'الاسم (بالعربية)' : 'Name (Arabic)'}
                </Label>
                <Input id="nameAr" placeholder="اسم المنتج" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </Label>
                <Input id="category" placeholder="Category" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    {language === 'ar' ? 'السعر ($)' : 'Price ($)'}
                  </Label>
                  <Input id="price" placeholder="0.00" type="number" step="0.01" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priceAr">
                    {language === 'ar' ? 'السعر (ريال)' : 'Price (SAR)'}
                  </Label>
                  <Input id="priceAr" placeholder="0.00" type="number" step="0.01" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">
                  {language === 'ar' ? 'المخزون' : 'Stock'}
                </Label>
                <Input id="stock" placeholder="0" type="number" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </DialogClose>
              <Button type="submit">
                {editingProduct !== null 
                  ? (language === 'ar' ? 'تحديث' : 'Update') 
                  : (language === 'ar' ? 'إضافة' : 'Add')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('products')}</TableHead>
                <TableHead>{language === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead className="text-right">{t('price')}</TableHead>
                <TableHead className="text-center">{t('stock')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {language === 'ar' ? product.nameAr : product.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {language === 'ar' 
                      ? `${product.priceAr.toFixed(2)} ${t('currency')}` 
                      : `$${product.price.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        product.stock > 20 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : product.stock > 10 
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">{t('editProduct')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">{t('deleteProduct')}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
