import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, MessageSquare, HandHeart, Users } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  // Service data
  const services = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: t('services.behavioralTherapy'),
      description: t('services.behavioralTherapyDesc')
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: t('services.speechTherapy'),
      description: t('services.speechTherapyDesc')
    },
    {
      icon: <HandHeart className="w-6 h-6 text-primary" />,
      title: t('services.occupationalTherapy'),
      description: t('services.occupationalTherapyDesc')
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: t('services.familySupport'),
      description: t('services.familySupportDesc')
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: t('testimonials.testimonial1'),
      author: t('testimonials.author1'),
      role: t('testimonials.role'),
      image: "https://randomuser.me/api/portraits/women/79.jpg"
    },
    {
      id: 2,
      text: t('testimonials.testimonial2'),
      author: t('testimonials.author2'),
      role: t('testimonials.role'),
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      text: t('testimonials.testimonial3'),
      author: t('testimonials.author3'),
      role: t('testimonials.role'),
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-primary-950 rounded-xl overflow-hidden text-white mb-16">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/gdf872f8ae04ed1cb7709be17cb5dbc37e65e0931460ac6dd9d081fac43daa105de1faa9b794ef24febb0a1f25acae71aceb908deb97f43b36fa4b3d11a10f530_1280.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center slide-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl opacity-90 mb-8">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 dark:bg-white dark:text-primary-700 dark:hover:bg-gray-100">
                {t('joinZoom')}
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <Link href="/appointments">{t('hero.cta')}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('services.title')}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-secondary-700 dark:from-secondary-700 dark:to-secondary-800 rounded-xl text-white mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('cta.description')}</p>
            <Button size="lg" asChild className="bg-white text-secondary-600 hover:bg-gray-100">
              <Link href="/shop">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('testimonials.title')}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="p-6">
                  <div className="absolute top-0 left-6 transform -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                    </div>
                  </div>
                  <div className="pt-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 italic">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 rtl:mr-0 rtl:ml-3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-12 px-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('finalCta.title')}</h2>
        <Button asChild size="lg">
          <Link href="/appointments">
            {t('finalCta.button')} <ArrowRight className="ml-2 w-4 h-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
