import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { testimonials } from '@/data/testimonials';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QuoteIcon } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('testimonials')}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <QuoteIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-muted-foreground mb-6 italic">
                    {language === 'ar' ? testimonial.textAr : testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 rtl:ml-3 rtl:mr-0">
                      <AvatarImage src={testimonial.image} alt={language === 'ar' ? testimonial.nameAr : testimonial.name} />
                      <AvatarFallback>{language === 'ar' ? testimonial.nameAr.charAt(0) : testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {language === 'ar' ? testimonial.nameAr : testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? testimonial.roleAr : testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
