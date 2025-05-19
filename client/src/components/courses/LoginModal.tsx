import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('login')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                {language === 'ar' ? 'تذكرني' : 'Remember me'}
              </Label>
            </div>
            <Button variant="link" className="p-0">
              {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button type="submit" className="w-full">
            {t('login')}
          </Button>
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2 sm:mt-0"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
          </DialogClose>
        </DialogFooter>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {language === 'ar' ? 'ليس لديك حساب؟' : 'Don\'t have an account?'}{' '}
          <Button variant="link" className="p-0">
            {t('register')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
