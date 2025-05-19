import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('siteName')} - {t('home')}</title>
        <meta name="description" content="Providing comprehensive support for individuals with autism and their families through education, therapy, and community services." />
        <meta property="og:title" content="Autism Center - Specialized Care and Support" />
        <meta property="og:description" content="Providing comprehensive support for individuals with autism and their families through education, therapy, and community services." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 fade-in">
        <HeroSection />
        <ServicesSection />
        <CtaSection />
        <TestimonialsSection />
      </div>
    </>
  );
};

export default Home;
