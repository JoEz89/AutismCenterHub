import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock inventory data (would come from API in a real app)
const inventoryData = [
  {
    id: 1,
    name: "Sensory Fidget Cube",
    nameAr: "مكعب فيدجيت الحسي",
    category: "sensory",
    categoryAr: "أدوات حسية",
    price: 19.99,
    priceAr: 75,
    stock: 45,
    image: "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94"
  },
  {
    id: 2,
    name: "Communication Cards Set",
    nameAr: "مجموعة بطاقات التواصل",
    category: "communication",
    categoryAr: "وسائل تواصل",
    price: 24.99,
    priceAr: 94,
    stock: 32,
    image: "https://images.unsplash.com/photo-1606676539940-12768ce0e762"
  },
  {
    id: 3,
    name: "Shape Sorting Cube",
    nameAr: "مكعب فرز الأشكال",
    category: "educational",
    categoryAr: "ألعاب تعليمية",
    price: 29.99,
    priceAr: 112,
    stock: 28,
    image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d"
  },
  {
    id: 4,
    name: "Weighted Blanket",
    nameAr: "بطانية مثقلة",
    category: "sensory",
    categoryAr: "أدوات حسية",
    price: 59.99,
    priceAr: 225,
    stock: 15,
    image: "https://images.unsplash.com/photo-1584598147860-91176b269d74"
  },
  {
    id: 5,
    name: "Picture Exchange System",
    nameAr: "نظام تبادل الصور",
    category: "communication",
    categoryAr: "وسائل تواصل",
    price: 34.99,
    priceAr: 131,
    stock: 20,
    image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473"
  }
];

// Product schema for form validation
const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  nameAr: z.string().min(3, { message: "Arabic name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  priceAr: z.coerce.number().positive({ message: "Arabic price must be a positive number" }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  image: z.string().url({ message: "Please enter a valid image URL" })
});

export default function InventoryManagement() {
  const { t, i18n } = useTranslation();
  const [inventory, setInventory] = useState(inventoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Setup form
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      category: "",
      price: 0,
      priceAr: 0,
      stock: 0,
      description: "",
      descriptionAr: "",
      image: ""
    }
  });

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.nameAr.includes(searchQuery) ||
      item.category.toLowerCase().includes(searchLower)
    );
  });

  // Handle product form submission
  const onSubmit = (data: z.infer<typeof productSchema>) => {
    if (currentProduct) {
      // Update existing product
      setInventory(prevInventory =>
        prevInventory.map(item =>
          item.id === currentProduct.id ? { ...item, ...data } : item
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(0, ...inventory.map(item => item.id)) + 1,
        ...data
      };
      setInventory(prevInventory => [...prevInventory, newProduct]);
    }
    setShowProductDialog(false);
    form.reset();
  };

  // Handle edit product
  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    form.reset({
      name: product.name,
      nameAr: product.nameAr,
      category: product.category,
      price: product.price,
      priceAr: product.priceAr,
      stock: product.stock,
      description: product.description || "",
      descriptionAr: product.descriptionAr || "",
      image: product.image
    });
    setShowProductDialog(true);
  };

  // Handle delete product
  const handleDeleteProduct = (product: any) => {
    setCurrentProduct(product);
    setShowDeleteDialog(true);
  };

  // Confirm delete product
  const confirmDeleteProduct = () => {
    setInventory(prevInventory =>
      prevInventory.filter(item => item.id !== currentProduct.id)
    );
    setShowDeleteDialog(false);
  };

  // Handle add new product
  const handleAddProduct = () => {
    setCurrentProduct(null);
    form.reset({
      name: "",
      nameAr: "",
      category: "",
      price: 0,
      priceAr: 0,
      stock: 0,
      description: "",
      descriptionAr: "",
      image: ""
    });
    setShowProductDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.inventory')}</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {t('admin.addProduct')}
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('admin.searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rtl:pl-4 rtl:pr-9"
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.productName')}</TableHead>
              <TableHead>{t('admin.category')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('admin.price')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('admin.stock')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">{t('admin.noProductsFound')}</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={`${product.image}?w=40&h=40&fit=crop&auto=format`}
                          alt={i18n.language === "en" ? product.name : product.nameAr}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{i18n.language === "en" ? product.name : product.nameAr}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {i18n.language === "en" 
                        ? product.category.charAt(0).toUpperCase() + product.category.slice(1) 
                        : product.categoryAr}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    {formatPrice(
                      i18n.language === "en" ? product.price : product.priceAr,
                      i18n.language === "en" ? "USD" : "SAR"
                    )}
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    <Badge
                      className={`${
                        product.stock > 20
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : product.stock > 10
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    <div className="flex justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">{t('admin.editProduct')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">{t('admin.deleteProduct')}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? t('admin.editProduct') : t('admin.addProduct')}
            </DialogTitle>
            <DialogDescription>
              {currentProduct
                ? t('admin.editProductDescription')
                : t('admin.addProductDescription')}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.productNameEn')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('admin.productNameEnPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nameAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.productNameAr')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('admin.productNameArPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.category')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('admin.selectCategory')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sensory">{t('ecommerce.sensory')}</SelectItem>
                          <SelectItem value="educational">{t('ecommerce.educational')}</SelectItem>
                          <SelectItem value="communication">{t('ecommerce.communication')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.priceUSD')}</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.priceSAR')}</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.stock')}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.imageUrl')}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.descriptionEn')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('admin.descriptionEnPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descriptionAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.descriptionAr')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('admin.descriptionArPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t('cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {currentProduct ? t('admin.updateProduct') : t('admin.addProduct')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('admin.deleteProductConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <p className="py-4">
              {i18n.language === "en"
                ? `Are you sure you want to delete "${currentProduct.name}"?`
                : `هل أنت متأكد من حذف "${currentProduct.nameAr}"؟`}
            </p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDeleteProduct}
            >
              {t('admin.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
