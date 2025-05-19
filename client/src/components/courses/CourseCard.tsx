import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, GraduationCap } from 'lucide-react';
import { Course } from '@shared/schema';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
  onPreview: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, onPreview }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={language === 'ar' ? course.titleAr : course.title} 
          className="w-full h-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="px-2 py-1 rounded-full">
            {language === 'ar' ? course.levelAr : course.level}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
            <span>{language === 'ar' ? course.durationAr : course.duration}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 text-foreground">
          {language === 'ar' ? course.titleAr : course.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {language === 'ar' ? course.descriptionAr : course.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          <span>{language === 'ar' ? course.instructorAr : course.instructor}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onPreview(course)}
        >
          {t('preview')}
        </Button>
        <Button 
          size="sm" 
          onClick={() => onEnroll(course)}
        >
          {t('enrollNow')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
