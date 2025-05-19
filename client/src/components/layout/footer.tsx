import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 py-12 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization info */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="text-sm font-bold">AC</span>
              </div>
              <span className="font-bold text-lg text-primary">
                {t('siteName')}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill"></i>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
                aria-label="Twitter"
              >
                <i className="ri-twitter-fill"></i>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
                aria-label="Instagram"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  {t('courses')}
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
                  {t('appointments')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t('contact.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact.address')}
                </span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <PhoneCall className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact.phone')}
                </span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact.email')}
                </span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact.hours')}
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t('footer.joinUs')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('footer.joinDescription')}
            </p>
            <Button className="w-full">
              {t('joinZoom')}
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} {t('siteName')}. {t('footer.rights')}
          </p>
          <div className="mt-2 space-x-4 rtl:space-x-reverse text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
