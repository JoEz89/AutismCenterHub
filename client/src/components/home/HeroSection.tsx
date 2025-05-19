import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 text-white overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center slide-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('missionTitle')}</h1>
          <p className="text-xl text-primary-50 mb-8">{t('missionDescription')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              {t('joinZoom')}
            </Button>
            <Link href="/appointments">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
