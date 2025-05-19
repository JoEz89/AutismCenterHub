import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <Heart className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-primary">
                {t('siteName')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? 'توفير دعم شامل للأفراد المصابين بالتوحد وعائلاتهم من خلال التعليم والعلاج وخدمات المجتمع.' 
                : 'Providing comprehensive support for individuals with autism and their families through education, therapy, and community services.'}
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t('home')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t('products')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t('courses')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/appointments">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t('appointments')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">
              {t('contactUs')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  {t('address')}
                </span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t('phone')}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t('email')}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t('hours')}</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Follow Us */}
          <div>
            <h3 className="font-bold text-foreground mb-4">
              {t('followUs')}
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <i className="ri-twitter-fill"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <i className="ri-instagram-fill"></i>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                aria-label="YouTube"
              >
                <i className="ri-youtube-fill"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t('siteName')}. {t('rights')}
          </p>
          <div className="mt-2 space-x-4 rtl:space-x-reverse">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('privacy')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
