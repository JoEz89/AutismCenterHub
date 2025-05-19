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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  UserPlus, 
  Lock, 
  ShieldCheck,
  Mail,
  UserCircle
} from "lucide-react";

// Mock user data
const usersData = [
  {
    id: 1,
    name: "Admin User",
    nameAr: "المستخدم المسؤول",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-08-01T10:30:00",
    createdAt: "2023-01-15T08:00:00",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    nameAr: "سارة جونسون",
    email: "sarah.j@example.com",
    role: "therapist",
    status: "active",
    lastLogin: "2023-08-10T14:15:00",
    createdAt: "2023-02-20T11:30:00",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Mohammed Al-Farsi",
    nameAr: "محمد الفارسي",
    email: "m.alfarsi@example.com",
    role: "therapist",
    status: "active",
    lastLogin: "2023-08-09T09:45:00",
    createdAt: "2023-03-10T13:20:00",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Emily Chen",
    nameAr: "إيميلي تشن",
    email: "emily.chen@example.com",
    role: "parent",
    status: "active",
    lastLogin: "2023-08-05T16:00:00",
    createdAt: "2023-04-05T10:15:00",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 5,
    name: "John Smith",
    nameAr: "جون سميث",
    email: "john.smith@example.com",
    role: "parent",
    status: "inactive",
    lastLogin: "2023-07-15T11:30:00",
    createdAt: "2023-05-12T09:40:00",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 6,
    name: "Fatima Hassan",
    nameAr: "فاطمة حسن",
    email: "f.hassan@example.com",
    role: "therapist",
    status: "suspended",
    lastLogin: "2023-07-02T08:20:00",
    createdAt: "2023-06-01T14:30:00",
    avatar: "https://i.pravatar.cc/150?img=15"
  }
];

// User schema for form validation
const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  nameAr: z.string().min(2, { message: "Arabic name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
  confirmPassword: z.string().optional(),
  avatar: z.string().url({ message: "Please enter a valid avatar URL" }).optional(),
  permissions: z.object({
    manageUsers: z.boolean().default(false),
    manageContent: z.boolean().default(false),
    viewReports: z.boolean().default(false),
    processPayments: z.boolean().default(false)
  })
}).refine(data => !data.password || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function UserManagement() {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Setup form
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      email: "",
      role: "",
      status: "active",
      password: "",
      confirmPassword: "",
      avatar: "",
      permissions: {
        manageUsers: false,
        manageContent: false,
        viewReports: false,
        processPayments: false
      }
    }
  });

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.name.toLowerCase().includes(searchLower) ||
      user.nameAr.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchLower);
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle user form submission
  const onSubmit = (data: z.infer<typeof userSchema>) => {
    const userData = {
      ...data,
      // Add default values for timestamps when creating a new user
      lastLogin: currentUser?.lastLogin || new Date().toISOString(),
      createdAt: currentUser?.createdAt || new Date().toISOString(),
      avatar: data.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    if (currentUser) {
      // Update existing user
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === currentUser.id ? { ...user, ...userData } : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(0, ...users.map(user => user.id)) + 1,
        ...userData
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    setShowUserDialog(false);
    form.reset();
  };

  // Handle edit user
  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    form.reset({
      name: user.name,
      nameAr: user.nameAr,
      email: user.email,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
      permissions: user.permissions || {
        manageUsers: user.role === "admin",
        manageContent: user.role === "admin" || user.role === "therapist",
        viewReports: user.role === "admin" || user.role === "therapist",
        processPayments: user.role === "admin"
      }
    });
    setShowUserDialog(true);
  };

  // Handle delete user
  const handleDeleteUser = (user: any) => {
    setCurrentUser(user);
    setShowDeleteDialog(true);
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    setUsers(prevUsers =>
      prevUsers.filter(user => user.id !== currentUser.id)
    );
    setShowDeleteDialog(false);
  };

  // Handle add new user
  const handleAddUser = () => {
    setCurrentUser(null);
    form.reset({
      name: "",
      nameAr: "",
      email: "",
      role: "",
      status: "active",
      password: "",
      confirmPassword: "",
      avatar: "",
      permissions: {
        manageUsers: false,
        manageContent: false,
        viewReports: false,
        processPayments: false
      }
    });
    setShowUserDialog(true);
  };

  // Toggle user status
  const toggleUserStatus = (userId: number, newStatus: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === 'ar' ? 'ar-SA' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.users')}</h2>
        <Button onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {t('admin.addUser')}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('admin.searchUsers')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rtl:pl-4 rtl:pr-9"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder={t('admin.filterByRole')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.allRoles')}</SelectItem>
              <SelectItem value="admin">{t('admin.roleAdmin')}</SelectItem>
              <SelectItem value="therapist">{t('admin.roleTherapist')}</SelectItem>
              <SelectItem value="parent">{t('admin.roleParent')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder={t('admin.filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.allStatuses')}</SelectItem>
              <SelectItem value="active">{t('admin.statusActive')}</SelectItem>
              <SelectItem value="inactive">{t('admin.statusInactive')}</SelectItem>
              <SelectItem value="suspended">{t('admin.statusSuspended')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.user')}</TableHead>
              <TableHead>{t('admin.email')}</TableHead>
              <TableHead>{t('admin.role')}</TableHead>
              <TableHead>{t('admin.status')}</TableHead>
              <TableHead>{t('admin.lastLogin')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">{t('admin.noUsersFound')}</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{i18n.language === "en" ? user.name : user.nameAr}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/30"
                          : user.role === "therapist"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/30"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 border-gray-200 dark:border-gray-700/30"
                      }
                    >
                      {t(`admin.role${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 rtl:mr-0 rtl:ml-2 ${
                          user.status === "active"
                            ? "bg-green-500"
                            : user.status === "inactive"
                            ? "bg-gray-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      {t(`admin.status${user.status.charAt(0).toUpperCase() + user.status.slice(1)}`)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(user.lastLogin)}
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    <div className="flex justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Pencil className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        {t('admin.edit')}
                      </Button>
                      {user.id !== 1 && ( // Prevent deleting the main admin user
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                          {t('admin.delete')}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Form Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentUser ? t('admin.editUser') : t('admin.addUser')}
            </DialogTitle>
            <DialogDescription>
              {currentUser
                ? t('admin.editUserDescription')
                : t('admin.addUserDescription')}
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
                      <FormLabel>{t('admin.nameEn')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('admin.namePlaceholder')} {...field} />
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
                      <FormLabel>{t('admin.nameAr')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('admin.nameArPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('admin.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.role')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('admin.selectRole')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">{t('admin.roleAdmin')}</SelectItem>
                          <SelectItem value="therapist">{t('admin.roleTherapist')}</SelectItem>
                          <SelectItem value="parent">{t('admin.roleParent')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.status')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('admin.selectStatus')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">{t('admin.statusActive')}</SelectItem>
                          <SelectItem value="inactive">{t('admin.statusInactive')}</SelectItem>
                          <SelectItem value="suspended">{t('admin.statusSuspended')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {!currentUser && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.password')}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.confirmPassword')}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('admin.avatarUrl')}</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">{t('admin.permissions')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="permissions.manageUsers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('admin.permManageUsers')}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions.manageContent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('admin.permManageContent')}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions.viewReports"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('admin.permViewReports')}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions.processPayments"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('admin.permProcessPayments')}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t('cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {currentUser ? t('admin.updateUser') : t('admin.createUser')}
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
              {t('admin.deleteUserConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Avatar>
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {i18n.language === "en" ? currentUser.name : currentUser.nameAr}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              {currentUser.role === "therapist" && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-md text-yellow-800 dark:text-yellow-300 text-sm">
                  <p>{t('admin.deleteTherapistWarning')}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDeleteUser}
            >
              {t('admin.deleteUser')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
