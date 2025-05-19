import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { services } from '@/data/services';
import { Card, CardContent } from '@/components/ui/card';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('ourServices')}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <span className="material-icons text-2xl text-primary group-hover:text-white transition-colors">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'ar' ? service.titleAr : service.title}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? service.descriptionAr : service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
