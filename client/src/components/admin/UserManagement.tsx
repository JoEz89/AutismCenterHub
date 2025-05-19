import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, UserPlus, LockOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock user data
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', fullName: 'Admin User', role: 'admin' },
  { id: 2, username: 'therapist1', email: 'therapist1@example.com', fullName: 'Jane Smith', role: 'therapist' },
  { id: 3, username: 'therapist2', email: 'therapist2@example.com', fullName: 'John Doe', role: 'therapist' },
  { id: 4, username: 'user1', email: 'user1@example.com', fullName: 'Alice Johnson', role: 'user' },
  { id: 5, username: 'user2', email: 'user2@example.com', fullName: 'Bob Williams', role: 'user' }
];

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<number | null>(null);

  const handleEditUser = (id: number) => {
    setSelectedUser(id);
    setIsAddUserOpen(true);
  };

  const handleResetPassword = (id: number) => {
    setSelectedUser(id);
    setIsResetPasswordOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('userManagement')}</h2>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>{language === 'ar' ? 'إضافة مستخدم' : 'Add User'}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedUser !== null 
                  ? (language === 'ar' ? 'تعديل المستخدم' : 'Edit User') 
                  : (language === 'ar' ? 'إضافة مستخدم' : 'Add User')}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">
                  {language === 'ar' ? 'اسم المستخدم' : 'Username'}
                </Label>
                <Input id="username" placeholder="username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </Label>
                <Input id="fullName" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">
                  {language === 'ar' ? 'الدور' : 'Role'}
                </Label>
                <Select defaultValue="user">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      {language === 'ar' ? 'مدير' : 'Admin'}
                    </SelectItem>
                    <SelectItem value="therapist">
                      {language === 'ar' ? 'معالج' : 'Therapist'}
                    </SelectItem>
                    <SelectItem value="user">
                      {language === 'ar' ? 'مستخدم' : 'User'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedUser === null && (
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <Input id="password" type="password" placeholder="********" />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </DialogClose>
              <Button type="submit">
                {selectedUser !== null 
                  ? (language === 'ar' ? 'تحديث' : 'Update') 
                  : (language === 'ar' ? 'إضافة' : 'Add')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">
                {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <Input id="newPassword" type="password" placeholder="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <Input id="confirmPassword" type="password" placeholder="********" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
            </DialogClose>
            <Button type="submit">
              {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'ar' ? 'اسم المستخدم' : 'Username'}</TableHead>
                <TableHead>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                <TableHead>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</TableHead>
                <TableHead>{language === 'ar' ? 'الدور' : 'Role'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        <LockOpen className="h-4 w-4" />
                        <span className="sr-only">Reset Password</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
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

export default UserManagement;
