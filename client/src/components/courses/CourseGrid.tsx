import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from './CourseCard';
import { Course } from '@shared/schema';

interface CourseGridProps {
  courses: Course[];
  featuredCourse?: Course;
  onEnroll: (course: Course) => void;
  onPreview: (course: Course) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ 
  courses, 
  featuredCourse, 
  onEnroll, 
  onPreview 
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');

  // If no featured course is provided, use the first course
  const featured = featuredCourse || courses[0];

  // Filter for free and paid courses (for demonstration, let's say courses with odd ids are free)
  const freeCourses = courses.filter(course => course.id % 2 === 1);
  const paidCourses = courses.filter(course => course.id % 2 === 0);

  // Display courses based on active tab
  const displayCourses = activeTab === 'free' 
    ? freeCourses 
    : activeTab === 'paid' 
      ? paidCourses 
      : courses;

  return (
    <div className="space-y-12">
      {/* Featured Course */}
      <div className="bg-card rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-2/5">
            <img 
              src={featured.image} 
              alt={featured.title} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="p-8">
            <div className="text-sm font-medium text-primary mb-1">
              {featured.level} • {featured.duration}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {featured.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {featured.description}
            </p>
            <div className="flex items-center mb-4">
              <div className="mr-4 rtl:mr-0 rtl:ml-4">
                <p className="text-foreground font-medium">{featured.instructor}</p>
                <p className="text-muted-foreground text-sm">
                  {t('courses.featured')}
                </p>
              </div>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button 
                onClick={() => onEnroll(featured)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {t('enrollNow')}
              </button>
              <button 
                onClick={() => onPreview(featured)}
                className="bg-muted hover:bg-muted/80 text-muted-foreground px-6 py-2 rounded-md font-medium transition-colors"
              >
                {t('preview')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
          <TabsTrigger value="free">{t('courses.freeCourses')}</TabsTrigger>
          <TabsTrigger value="paid">{t('courses.paidCourses')}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={onEnroll} 
                onPreview={onPreview} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="free" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={onEnroll} 
                onPreview={onPreview} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="paid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={onEnroll} 
                onPreview={onPreview} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseGrid;
