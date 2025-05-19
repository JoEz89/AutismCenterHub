import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, Search, Clock, Users, BarChart } from "lucide-react";

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Understanding Autism Spectrum",
    titleAr: "فهم طيف التوحد",
    instructor: "Dr. Sarah Johnson",
    instructorAr: "د. سارة جونسون",
    duration: "8 weeks",
    durationAr: "8 أسابيع",
    level: "beginner",
    levelAr: "مبتدئ",
    enrolledCount: 1240,
    published: true,
    price: 0, // Free
    image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    description: "A comprehensive introduction to autism spectrum disorders, symptoms, and support strategies.",
    descriptionAr: "مقدمة شاملة لاضطرابات طيف التوحد والأعراض واستراتيجيات الدعم.",
    modules: [
      { id: 1, title: "Introduction to Autism Spectrum", titleAr: "مقدمة في طيف التوحد" },
      { id: 2, title: "Understanding Sensory Processing", titleAr: "فهم المعالجة الحسية" },
      { id: 3, title: "Communication Strategies", titleAr: "استراتيجيات التواصل" },
      { id: 4, title: "Behavior Support Techniques", titleAr: "تقنيات دعم السلوك" }
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
    level: "intermediate",
    levelAr: "متوسط",
    enrolledCount: 760,
    published: true,
    price: 79.99,
    priceAr: 300,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description: "Learn the fundamental principles of ABA therapy and how to implement behavior support plans.",
    descriptionAr: "تعلم المبادئ الأساسية للعلاج السلوكي التطبيقي وكيفية تنفيذ خطط دعم السلوك.",
    modules: [
      { id: 1, title: "Principles of ABA", titleAr: "مبادئ تحليل السلوك التطبيقي" },
      { id: 2, title: "Functional Behavior Assessment", titleAr: "تقييم السلوك الوظيفي" },
      { id: 3, title: "Creating Behavior Support Plans", titleAr: "إنشاء خطط دعم السلوك" },
      { id: 4, title: "Implementing and Evaluating Plans", titleAr: "تنفيذ وتقييم الخطط" }
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
    level: "all-levels",
    levelAr: "جميع المستويات",
    enrolledCount: 980,
    published: true,
    price: 0, // Free
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    description: "Practical approaches to address sensory sensitivities and create supportive environments.",
    descriptionAr: "نهج عملي لمعالجة الحساسيات الحسية وخلق بيئات داعمة.",
    modules: [
      { id: 1, title: "Understanding Sensory Processing", titleAr: "فهم المعالجة الحسية" },
      { id: 2, title: "Sensory Assessment Tools", titleAr: "أدوات تقييم الحواس" },
      { id: 3, title: "Creating Sensory-Friendly Environments", titleAr: "إنشاء بيئات مناسبة للحواس" },
      { id: 4, title: "Sensory Integration Activities", titleAr: "أنشطة التكامل الحسي" }
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
    level: "advanced",
    levelAr: "متقدم",
    enrolledCount: 490,
    published: false,
    price: 99.99,
    priceAr: 375,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21",
    description: "Advanced techniques for enhancing verbal and non-verbal communication skills.",
    descriptionAr: "تقنيات متقدمة لتعزيز مهارات التواصل اللفظي وغير اللفظي.",
    modules: [
      { id: 1, title: "Communication Development Milestones", titleAr: "مراحل تطور التواصل" },
      { id: 2, title: "Augmentative and Alternative Communication", titleAr: "التواصل المعزز والبديل" },
      { id: 3, title: "Visual Support Systems", titleAr: "أنظمة الدعم البصري" },
      { id: 4, title: "Building Conversational Skills", titleAr: "بناء مهارات المحادثة" }
    ]
  }
];

// Module schema for form validation
const moduleSchema = z.object({
  title: z.string().min(3, { message: "Module title must be at least 3 characters" }),
  titleAr: z.string().min(3, { message: "Arabic title must be at least 3 characters" })
});

// Course schema for form validation
const courseSchema = z.object({
  title: z.string().min(3, { message: "Course title must be at least 3 characters" }),
  titleAr: z.string().min(3, { message: "Arabic title must be at least 3 characters" }),
  instructor: z.string().min(3, { message: "Instructor name must be at least 3 characters" }),
  instructorAr: z.string().min(3, { message: "Arabic instructor name must be at least 3 characters" }),
  level: z.string().min(1, { message: "Please select a level" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  durationAr: z.string().min(1, { message: "Arabic duration is required" }),
  isFree: z.boolean().default(false),
  price: z.coerce.number().nonnegative({ message: "Price must be a positive number" }).optional(),
  priceAr: z.coerce.number().nonnegative({ message: "Arabic price must be a positive number" }).optional(),
  published: z.boolean().default(false),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  descriptionAr: z.string().min(10, { message: "Arabic description must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  modules: z.array(moduleSchema).min(1, { message: "At least one module is required" })
});

export default function CourseManagement() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState(coursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Setup form
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      titleAr: "",
      instructor: "",
      instructorAr: "",
      level: "",
      duration: "",
      durationAr: "",
      isFree: false,
      price: 0,
      priceAr: 0,
      published: false,
      description: "",
      descriptionAr: "",
      image: "",
      modules: [{ title: "", titleAr: "" }]
    }
  });

  // Handle adding a new module field
  const addModule = () => {
    const currentModules = form.getValues("modules") || [];
    form.setValue("modules", [...currentModules, { title: "", titleAr: "" }]);
  };

  // Handle removing a module field
  const removeModule = (index: number) => {
    const currentModules = form.getValues("modules") || [];
    if (currentModules.length <= 1) return;
    
    const updatedModules = [...currentModules];
    updatedModules.splice(index, 1);
    form.setValue("modules", updatedModules);
  };

  // Filter courses based on search query and active tab
  const filteredCourses = courses.filter(course => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      course.title.toLowerCase().includes(searchLower) ||
      course.titleAr.includes(searchQuery) ||
      course.instructor.toLowerCase().includes(searchLower) ||
      course.instructorAr.includes(searchQuery);
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "free" && course.price === 0) || 
      (activeTab === "paid" && course.price > 0) ||
      (activeTab === "published" && course.published) ||
      (activeTab === "draft" && !course.published);
    
    return matchesSearch && matchesTab;
  });

  // Handle course form submission
  const onSubmit = (data: z.infer<typeof courseSchema>) => {
    const courseData = {
      ...data,
      price: data.isFree ? 0 : data.price || 0,
      priceAr: data.isFree ? 0 : data.priceAr || 0,
      enrolledCount: currentCourse?.enrolledCount || 0
    };
    
    if (currentCourse) {
      // Update existing course
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === currentCourse.id ? { ...course, ...courseData } : course
        )
      );
    } else {
      // Add new course
      const newCourse = {
        id: Math.max(0, ...courses.map(course => course.id)) + 1,
        ...courseData,
        enrolledCount: 0
      };
      setCourses(prevCourses => [...prevCourses, newCourse]);
    }
    setShowCourseDialog(false);
    form.reset();
  };

  // Handle edit course
  const handleEditCourse = (course: any) => {
    setCurrentCourse(course);
    form.reset({
      title: course.title,
      titleAr: course.titleAr,
      instructor: course.instructor,
      instructorAr: course.instructorAr,
      level: course.level,
      duration: course.duration,
      durationAr: course.durationAr,
      isFree: course.price === 0,
      price: course.price,
      priceAr: course.priceAr,
      published: course.published,
      description: course.description,
      descriptionAr: course.descriptionAr,
      image: course.image,
      modules: course.modules
    });
    setShowCourseDialog(true);
  };

  // Handle delete course
  const handleDeleteCourse = (course: any) => {
    setCurrentCourse(course);
    setShowDeleteDialog(true);
  };

  // Confirm delete course
  const confirmDeleteCourse = () => {
    setCourses(prevCourses =>
      prevCourses.filter(course => course.id !== currentCourse.id)
    );
    setShowDeleteDialog(false);
  };

  // Handle add new course
  const handleAddCourse = () => {
    setCurrentCourse(null);
    form.reset({
      title: "",
      titleAr: "",
      instructor: "",
      instructorAr: "",
      level: "",
      duration: "",
      durationAr: "",
      isFree: false,
      price: 0,
      priceAr: 0,
      published: false,
      description: "",
      descriptionAr: "",
      image: "",
      modules: [{ title: "", titleAr: "" }]
    });
    setShowCourseDialog(true);
  };

  // Toggle course published status
  const togglePublished = (courseId: number, newStatus: boolean) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, published: newStatus } : course
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.courses')}</h2>
        <Button onClick={handleAddCourse}>
          <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {t('admin.addCourse')}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('admin.searchCourses')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rtl:pl-4 rtl:pr-9"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">{t('admin.allCourses')}</TabsTrigger>
            <TabsTrigger value="free">{t('admin.freeCourses')}</TabsTrigger>
            <TabsTrigger value="paid">{t('admin.paidCourses')}</TabsTrigger>
            <TabsTrigger value="published">{t('admin.published')}</TabsTrigger>
            <TabsTrigger value="draft">{t('admin.drafts')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.courseName')}</TableHead>
              <TableHead>{t('admin.instructor')}</TableHead>
              <TableHead>{t('admin.level')}</TableHead>
              <TableHead>{t('admin.price')}</TableHead>
              <TableHead>{t('admin.status')}</TableHead>
              <TableHead className="text-right rtl:text-left">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">{t('admin.noCoursesFound')}</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="h-10 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={`${course.image}?w=64&h=40&fit=crop&auto=format`}
                          alt={i18n.language === "en" ? course.title : course.titleAr}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{i18n.language === "en" ? course.title : course.titleAr}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {i18n.language === "en" ? course.instructor : course.instructorAr}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {i18n.language === "en" 
                        ? course.level.charAt(0).toUpperCase() + course.level.slice(1).replace('-', ' ')
                        : course.levelAr}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {course.price === 0 ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {t('courses.free')}
                      </Badge>
                    ) : (
                      <span>
                        {i18n.language === "en" 
                          ? `$${course.price.toFixed(2)}` 
                          : `${course.priceAr.toFixed(2)} ${t('currency')}`}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch
                        checked={course.published}
                        onCheckedChange={(checked) => togglePublished(course.id, checked)}
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {course.published ? t('admin.published') : t('admin.draft')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    <div className="flex justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCourse(course)}
                      >
                        <Pencil className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        {t('admin.edit')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => handleDeleteCourse(course)}
                      >
                        <Trash2 className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        {t('admin.delete')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.totalCourses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('admin.publishedCourses', { count: courses.filter(c => c.published).length })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.totalEnrollments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((total, course) => total + course.enrolledCount, 0).toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Users className="h-3.5 w-3.5 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{t('admin.activeStudents')}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.courseCompletion')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <BarChart className="h-3.5 w-3.5 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{t('admin.averageCompletion')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Form Dialog */}
      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {currentCourse ? t('admin.editCourse') : t('admin.addCourse')}
            </DialogTitle>
            <DialogDescription>
              {currentCourse
                ? t('admin.editCourseDescription')
                : t('admin.addCourseDescription')}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.courseTitleEn')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('admin.courseTitlePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.instructorEn')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('admin.instructorPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.level')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('admin.selectLevel')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">{t('courses.beginner')}</SelectItem>
                            <SelectItem value="intermediate">{t('courses.intermediate')}</SelectItem>
                            <SelectItem value="advanced">{t('courses.advanced')}</SelectItem>
                            <SelectItem value="all-levels">{t('courses.allLevels')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.durationEn')}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 8 weeks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.descriptionEn')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('admin.descriptionPlaceholder')} 
                            {...field} 
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titleAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.courseTitleAr')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('admin.courseTitleArPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructorAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.instructorAr')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('admin.instructorArPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.imageUrl')}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="durationAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.durationAr')}</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: 8 أسابيع" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descriptionAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.descriptionAr')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('admin.descriptionArPlaceholder')} 
                            {...field} 
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 rtl:space-x-reverse space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base">{t('admin.freeNotPaid')}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 rtl:space-x-reverse space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base">{t('admin.publishCourse')}</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {!form.watch("isFree") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.priceUSD')}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" disabled={form.watch("isFree")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priceAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('admin.priceSAR')}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" disabled={form.watch("isFree")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{t('admin.courseModules')}</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addModule}
                  >
                    <Plus className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    {t('admin.addModule')}
                  </Button>
                </div>
                
                {form.watch("modules")?.map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
                    <FormField
                      control={form.control}
                      name={`modules.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('admin.moduleTitleEn')}</FormLabel>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <FormControl>
                              <Input placeholder={t('admin.moduleTitlePlaceholder')} {...field} />
                            </FormControl>
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeModule(index)}
                                className="flex-shrink-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${index}.titleAr`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('admin.moduleTitleAr')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('admin.moduleTitleArPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t('cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {currentCourse ? t('admin.updateCourse') : t('admin.createCourse')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('admin.deleteCourseConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentCourse && (
            <div className="py-4">
              <p className="font-medium">
                {i18n.language === "en"
                  ? `"${currentCourse.title}"`
                  : `"${currentCourse.titleAr}"`}
              </p>
              <div className="flex items-center mt-2 text-amber-600 dark:text-amber-400">
                <Users className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                <p className="text-sm">
                  {t('admin.enrolledStudentsWarning', { count: currentCourse.enrolledCount })}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDeleteCourse}
            >
              {t('admin.deleteCourse')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
