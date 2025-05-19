import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 text-white rounded-xl overflow-hidden my-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'ar' 
              ? 'اكتشف منتجاتنا التعليمية المصممة خصيصًا' 
              : 'Discover Our Specially Designed Educational Products'}
          </h2>
          <p className="text-xl text-white/85 mb-8">
            {language === 'ar' 
              ? 'نقدم مجموعة واسعة من الألعاب والأدوات التعليمية المصممة لدعم الأطفال المصابين بالتوحد في رحلة تعلمهم.' 
              : 'We offer a wide range of educational toys and tools designed to support children with autism in their learning journey.'}
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              {language === 'ar' ? 'تصفح منتجاتنا' : 'Browse Our Products'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
