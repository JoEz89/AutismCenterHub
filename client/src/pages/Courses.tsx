import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { courses } from '@/data/courses';
import { Course } from '@shared/schema';
import CourseGrid from '@/components/courses/CourseGrid';
import LoginModal from '@/components/courses/LoginModal';
import { useLanguage } from '@/context/LanguageContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Courses: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleEnroll = (course: Course) => {
    setShowLoginModal(true);
  };

  const handlePreview = (course: Course) => {
    setPreviewCourse(course);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{t('siteName')} - {t('courses')}</title>
        <meta name="description" content="Explore online learning programs designed for parents, educators, and caregivers to support individuals with autism." />
        <meta property="og:title" content="Autism Support Online Courses" />
        <meta property="og:description" content="Explore online learning programs designed for parents, educators, and caregivers to support individuals with autism." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('exploreCourses')}</h1>
          <p className="text-muted-foreground max-w-3xl">
            {language === 'ar' 
              ? 'اكتشف دوراتنا المصممة للآباء والمعلمين ومقدمي الرعاية لدعم رحلة الأطفال المصابين بالتوحد.' 
              : 'Explore our courses designed for parents, educators, and caregivers to support the journey of children with autism.'}
          </p>
        </div>

        {/* Login CTA */}
        <div className="bg-gradient-to-r from-primary/90 to-primary-foreground/10 rounded-xl p-6 mb-12 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-6 rtl:md:mr-0 rtl:md:ml-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' 
                  ? 'تسجيل الدخول لإدارة دوراتك ومتابعة تقدمك' 
                  : 'Login to manage your courses and track your progress'}
              </h2>
              <p className="text-primary-foreground/90">
                {language === 'ar' 
                  ? 'سجل الدخول للوصول إلى ميزات إضافية والوصول إلى لوحة معلومات الدورة التدريبية الخاصة بك.' 
                  : 'Sign in to access additional features and access your course dashboard.'}
              </p>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              className="whitespace-nowrap"
              onClick={() => setShowLoginModal(true)}
            >
              {t('login')}
            </Button>
          </div>
        </div>

        <CourseGrid 
          courses={courses}
          featuredCourse={courses[0]}
          onEnroll={handleEnroll}
          onPreview={handlePreview}
        />

        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />

        {/* Course Preview Dialog */}
        <AlertDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <AlertDialogContent className="max-w-3xl">
            {previewCourse && (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">
                    {language === 'ar' ? previewCourse.titleAr : previewCourse.title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    <div className="flex items-center gap-4 text-foreground mb-2">
                      <div className="flex items-center">
                        <GraduationCap className="mr-1 h-4 w-4" />
                        <span>{language === 'ar' ? previewCourse.instructorAr : previewCourse.instructor}</span>
                      </div>
                      <div>
                        <span>{language === 'ar' ? previewCourse.levelAr : previewCourse.level}</span>
                      </div>
                      <div>
                        <span>{language === 'ar' ? previewCourse.durationAr : previewCourse.duration}</span>
                      </div>
                    </div>
                    <p>{language === 'ar' ? previewCourse.descriptionAr : previewCourse.description}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                {previewCourse.modules && (
                  <div className="bg-muted p-4 rounded-md my-4">
                    <h3 className="font-semibold mb-3">{t('courseModules')}</h3>
                    <ul className="space-y-2">
                      {previewCourse.modules.map((module, index) => (
                        <li key={index} className="flex items-center">
                          <span className="material-icons text-sm mr-2 rtl:ml-2 rtl:mr-0">
                            {module.completed ? 'check_circle' : 'lock'}
                          </span>
                          <span className={module.completed ? 'text-foreground' : 'text-muted-foreground'}>
                            {language === 'ar' ? module.titleAr : module.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    setIsPreviewOpen(false);
                    handleEnroll(previewCourse);
                  }}>
                    {t('enrollNow')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Courses;
