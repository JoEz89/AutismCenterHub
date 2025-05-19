import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { CheckCircle, Clock, School, Lock, Play, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useMediaQuery } from "@/hooks/use-mobile";

// Mock course data
const courses = [
  {
    id: 1,
    title: "Understanding Autism Spectrum",
    titleAr: "فهم طيف التوحد",
    instructor: "Dr. Sarah Johnson",
    instructorAr: "د. سارة جونسون",
    duration: "8 weeks",
    durationAr: "8 أسابيع",
    level: "Beginners",
    levelAr: "مبتدئين",
    isFree: true,
    image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    description: "A comprehensive introduction to autism spectrum disorders, symptoms, and support strategies.",
    descriptionAr: "مقدمة شاملة لاضطرابات طيف التوحد والأعراض واستراتيجيات الدعم.",
    enrolledCount: 1240,
    modules: [
      { id: 1, title: "Introduction to Autism Spectrum", titleAr: "مقدمة في طيف التوحد", isUnlocked: true },
      { id: 2, title: "Understanding Sensory Processing", titleAr: "فهم المعالجة الحسية", isUnlocked: true },
      { id: 3, title: "Communication Strategies", titleAr: "استراتيجيات التواصل", isUnlocked: false },
      { id: 4, title: "Behavior Support Techniques", titleAr: "تقنيات دعم السلوك", isUnlocked: false }
    ]
  },
  {
    id: 2,
    title: "Applied Behavior Analysis Basics",
    titleAr: "أساسيات تحليل السلوك التطبيقي",
    instructor: "Prof. Michael Thomas",
    instructorAr: "أ. مايكل توماس",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    level: "Intermediate",
    levelAr: "متوسط",
    isFree: false,
    price: 79.99,
    priceAr: 300,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description: "Learn the fundamental principles of ABA therapy and how to implement behavior support plans.",
    descriptionAr: "تعلم المبادئ الأساسية للعلاج السلوكي التطبيقي وكيفية تنفيذ خطط دعم السلوك.",
    enrolledCount: 760,
    modules: [
      { id: 1, title: "Principles of ABA", titleAr: "مبادئ تحليل السلوك التطبيقي", isUnlocked: false },
      { id: 2, title: "Functional Behavior Assessment", titleAr: "تقييم السلوك الوظيفي", isUnlocked: false },
      { id: 3, title: "Creating Behavior Support Plans", titleAr: "إنشاء خطط دعم السلوك", isUnlocked: false },
      { id: 4, title: "Implementing and Evaluating Plans", titleAr: "تنفيذ وتقييم الخطط", isUnlocked: false }
    ]
  },
  {
    id: 3,
    title: "Sensory Processing Strategies",
    titleAr: "استراتيجيات المعالجة الحسية",
    instructor: "Dr. Lisa Wong",
    instructorAr: "د. ليزا وونغ",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    level: "All Levels",
    levelAr: "جميع المستويات",
    isFree: true,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    description: "Practical approaches to address sensory sensitivities and create supportive environments.",
    descriptionAr: "نهج عملي لمعالجة الحساسيات الحسية وخلق بيئات داعمة.",
    enrolledCount: 980,
    modules: [
      { id: 1, title: "Understanding Sensory Processing", titleAr: "فهم المعالجة الحسية", isUnlocked: true },
      { id: 2, title: "Sensory Assessment Tools", titleAr: "أدوات تقييم الحواس", isUnlocked: false },
      { id: 3, title: "Creating Sensory-Friendly Environments", titleAr: "إنشاء بيئات مناسبة للحواس", isUnlocked: false },
      { id: 4, title: "Sensory Integration Activities", titleAr: "أنشطة التكامل الحسي", isUnlocked: false }
    ]
  },
  {
    id: 4,
    title: "Communication Development",
    titleAr: "تطوير التواصل",
    instructor: "Dr. James Peterson",
    instructorAr: "د. جيمس بيترسون",
    duration: "10 weeks",
    durationAr: "10 أسابيع",
    level: "Advanced",
    levelAr: "متقدم",
    isFree: false,
    price: 99.99,
    priceAr: 375,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21",
    description: "Advanced techniques for enhancing verbal and non-verbal communication skills.",
    descriptionAr: "تقنيات متقدمة لتعزيز مهارات التواصل اللفظي وغير اللفظي.",
    enrolledCount: 490,
    modules: [
      { id: 1, title: "Communication Development Milestones", titleAr: "مراحل تطور التواصل", isUnlocked: false },
      { id: 2, title: "Augmentative and Alternative Communication", titleAr: "التواصل المعزز والبديل", isUnlocked: false },
      { id: 3, title: "Visual Support Systems", titleAr: "أنظمة الدعم البصري", isUnlocked: false },
      { id: 4, title: "Building Conversational Skills", titleAr: "بناء مهارات المحادثة", isUnlocked: false }
    ]
  }
];

export default function Courses() {
  const { t, i18n } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState<null | any>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Form for login
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle course preview
  const handlePreview = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // Handle course enrollment
  const handleEnroll = (course: any) => {
    setSelectedCourse(course);
    setShowLoginModal(true);
  };

  // Handle login form submission
  const onSubmit = (data: any) => {
    console.log(data); // In a real app, we would handle login here
    setShowLoginModal(false);
  };

  return (
    <div>
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-primary-600 dark:from-purple-800 dark:to-primary-800 rounded-xl p-6 mb-12 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-6 rtl:md:mr-0 rtl:md:ml-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {t('courses.loginCta.title')}
            </h2>
            <p className="text-purple-100">
              {t('courses.loginCta.description')}
            </p>
          </div>
          <Button
            onClick={() => setShowLoginModal(true)}
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            {t('login')}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('courses.title')}</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
            <TabsTrigger value="free">{t('courses.freeCourses')}</TabsTrigger>
            <TabsTrigger value="paid">{t('courses.paidCourses')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <CourseGrid 
              courses={courses} 
              handlePreview={handlePreview} 
              handleEnroll={handleEnroll} 
            />
          </TabsContent>
          
          <TabsContent value="free">
            <CourseGrid 
              courses={courses.filter(course => course.isFree)} 
              handlePreview={handlePreview} 
              handleEnroll={handleEnroll} 
            />
          </TabsContent>
          
          <TabsContent value="paid">
            <CourseGrid 
              courses={courses.filter(course => !course.isFree)} 
              handlePreview={handlePreview} 
              handleEnroll={handleEnroll} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Course Details Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showCourseDetails} onOpenChange={setShowCourseDetails}>
          <DrawerContent>
            <CourseDetailsContent 
              course={selectedCourse} 
              handleEnroll={handleEnroll} 
              onClose={() => setShowCourseDetails(false)} 
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
          <DialogContent className="max-w-4xl">
            <CourseDetailsContent 
              course={selectedCourse} 
              handleEnroll={handleEnroll} 
              onClose={() => setShowCourseDetails(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Login Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('login')}</DrawerTitle>
              <DrawerDescription>{t('courses.loginRequired')}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <LoginForm form={form} onSubmit={onSubmit} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">{t('cancel')}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('login')}</DialogTitle>
              <DialogDescription>{t('courses.loginRequired')}</DialogDescription>
            </DialogHeader>
            <LoginForm form={form} onSubmit={onSubmit} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('cancel')}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Course Grid Component
function CourseGrid({ courses, handlePreview, handleEnroll }: any) {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course: any) => (
        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all">
          <div className="h-48 overflow-hidden relative">
            <img 
              src={`${course.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500`}
              alt={i18n.language === "en" ? course.title : course.titleAr} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
            {course.isFree && (
              <Badge className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-green-500">
                {t('courses.free')}
              </Badge>
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {i18n.language === "en" ? course.level : course.levelAr}
              </Badge>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                <span>{i18n.language === "en" ? course.duration : course.durationAr}</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              {i18n.language === "en" ? course.title : course.titleAr}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {i18n.language === "en" ? course.description : course.descriptionAr}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {i18n.language === "en" ? course.instructor : course.instructorAr}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <School className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                <span>{course.enrolledCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <Button 
                onClick={() => handleEnroll(course)}
                className="flex-1 mr-2 rtl:mr-0 rtl:ml-2"
              >
                {t('courses.enroll')}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handlePreview(course)}
                className="flex-1"
              >
                {t('courses.preview')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Course Details Content
function CourseDetailsContent({ course, handleEnroll, onClose }: any) {
  const { t, i18n } = useTranslation();
  
  if (!course) return null;
  
  return (
    <>
      <div>
        <div className="relative mb-6">
          <img 
            src={`${course.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400`}
            alt={i18n.language === "en" ? course.title : course.titleAr} 
            className="w-full h-40 md:h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center px-6">
              {i18n.language === "en" ? course.title : course.titleAr}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center mb-4 flex-wrap gap-4">
          <Badge variant="outline" className="flex items-center">
            <Clock className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
            {i18n.language === "en" ? course.duration : course.durationAr}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <School className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
            {i18n.language === "en" ? course.level : course.levelAr}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 rtl:mr-0 rtl:ml-1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {course.enrolledCount} {t('courses.students')}
          </Badge>
          {course.isFree ? (
            <Badge className="bg-green-500">{t('courses.free')}</Badge>
          ) : (
            <span className="font-bold text-primary">
              {i18n.language === "en"
                ? `$${course.price.toFixed(2)}`
                : `${course.priceAr.toFixed(2)} ${t('currency')}`}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{t('courses.instructor')}</h3>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 mr-3 rtl:mr-0 rtl:ml-3">
            <span>{(i18n.language === "en" ? course.instructor : course.instructorAr).split(' ')[0][0]}</span>
          </div>
          <div>
            <p className="font-medium">{i18n.language === "en" ? course.instructor : course.instructorAr}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('courses.instructorTitle')}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{t('courses.aboutCourse')}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {i18n.language === "en" ? course.description : course.descriptionAr}
        </p>
        
        <h3 className="text-lg font-semibold mb-4">{t('courses.modules')}</h3>
        <div className="space-y-3 mb-6">
          {course.modules.map((module: any) => (
            <div 
              key={module.id} 
              className={`p-3 rounded-lg border flex justify-between items-center ${
                module.isUnlocked
                  ? "border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center">
                {module.isUnlocked ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 rtl:mr-0 rtl:ml-2" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                )}
                <span className={module.isUnlocked ? "font-medium" : "text-gray-500"}>
                  {i18n.language === "en" ? module.title : module.titleAr}
                </span>
              </div>
              {module.isUnlocked && (
                <Button variant="ghost" size="sm" className="text-primary">
                  <Play className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                  {t('courses.startModule')}
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {course.isFree && course.modules.some((m: any) => m.isUnlocked) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('courses.progress')}</h3>
            <div className="space-y-2">
              <Progress value={25} className="h-2" />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>25% {t('courses.completed')}</span>
                <span>1/4 {t('courses.modules')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <Button variant="outline" onClick={onClose}>
          {t('close')}
        </Button>
        <Button onClick={() => handleEnroll(course)}>
          {course.isFree ? t('courses.continueStudying') : t('courses.enroll')}
          <ChevronRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
        </Button>
      </div>
    </>
  );
}

// Login Form Component
function LoginForm({ form, onSubmit }: any) {
  const { t } = useTranslation();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('login.email')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('login.emailPlaceholder')} 
                  type="email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('login.password')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('login.passwordPlaceholder')}
                  type="password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input 
              type="checkbox" 
              id="remember" 
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.rememberMe')}
            </Label>
          </div>
          <a 
            href="#" 
            className="text-sm font-medium text-primary hover:text-primary-700 dark:hover:text-primary-300"
          >
            {t('login.forgotPassword')}
          </a>
        </div>
        <Button type="submit" className="w-full">
          {t('login')}
        </Button>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('login.noAccount')}{' '}
          <a 
            href="#" 
            className="font-medium text-primary hover:text-primary-700 dark:hover:text-primary-300"
          >
            {t('register')}
          </a>
        </div>
      </form>
    </Form>
  );
}
