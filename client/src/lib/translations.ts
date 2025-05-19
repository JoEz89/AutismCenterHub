import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navigation
        siteName: "Autism Center",
        home: "Home",
        products: "Products",
        courses: "Courses",
        appointments: "Appointments",
        admin: "Admin",
        login: "Login",
        register: "Register",
        
        // Theme and language
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        arabic: "العربية",
        english: "English",
        
        // Landing page
        missionTitle: "Supporting Autism Journey",
        missionDescription: "Our center provides comprehensive support for individuals with autism and their families through education, therapy, and community services.",
        joinZoom: "Join a Zoom Call",
        learnMore: "Learn More",
        ourServices: "Our Services",
        testimonials: "Testimonials",
        
        // Services
        behavioralTherapy: "Behavioral Therapy",
        behavioralTherapyDesc: "Customized ABA therapy programs to develop social and learning skills.",
        speechTherapy: "Speech Therapy",
        speechTherapyDesc: "Helping improve communication and language development.",
        occupationalTherapy: "Occupational Therapy",
        occupationalTherapyDesc: "Supporting daily living skills and sensory integration.",
        parentTraining: "Parent Training",
        parentTrainingDesc: "Empowering families with strategies and knowledge.",
        
        // Testimonials
        testimonial1Name: "Sarah Johnson",
        testimonial1Text: "The center has transformed our lives. My son has made incredible progress with his communication skills.",
        testimonial2Name: "Ahmed Ali",
        testimonial2Text: "The staff is incredibly supportive and knowledgeable. The structured programs have helped my daughter thrive.",
        testimonial3Name: "Lisa Thompson",
        testimonial3Text: "We've seen significant improvements in our child's social skills since joining the center's programs.",
        
        // E-commerce
        shopProducts: "Shop Products",
        addToCart: "Add to Cart",
        viewCart: "View Cart",
        checkout: "Checkout",
        cart: "Cart",
        emptyCart: "Your cart is empty",
        totalPrice: "Total Price",
        currency: "USD",
        search: "Search products...",
        category: "Category",
        allCategories: "All Categories",
        
        // Product categories
        sensoryToys: "Sensory Toys",
        educationalTools: "Educational Tools",
        communicationAids: "Communication Aids",
        
        // Courses
        exploreCourses: "Explore Our Courses",
        enrollNow: "Enroll Now",
        preview: "Preview",
        freeCourses: "Free Courses",
        paidCourses: "Paid Courses",
        featured: "Featured Courses",
        allCourses: "All Courses",
        loginRequired: "Login required to enroll",
        progress: "Your Progress",
        duration: "Duration",
        level: "Level",
        beginners: "Beginners",
        intermediate: "Intermediate",
        advanced: "Advanced",
        courseModules: "Course Modules",
        
        // Appointments
        scheduleAppointment: "Schedule an Appointment",
        selectDate: "Select Date",
        availableTimes: "Available Times",
        confirmAppointment: "Confirm Appointment",
        appointmentConfirmed: "Your appointment has been confirmed!",
        zoomLinkMessage: "A Zoom link will be sent to your email.",
        appointmentDetails: "Appointment Details",
        appointmentType: "Appointment Type",
        initialConsultation: "Initial Consultation",
        therapySession: "Therapy Session",
        followUp: "Follow-up",
        bookAppointment: "Book Appointment",
        reschedule: "Reschedule",
        cancel: "Cancel",
        upcomingAppointments: "Upcoming Appointments",
        noAppointments: "No upcoming appointments",
        confirmationTitle: "Appointment Confirmed",
        date: "Date",
        time: "Time",
        type: "Type",
        
        // Admin dashboard
        adminDashboard: "Admin Dashboard",
        inventoryManagement: "Inventory Management",
        appointmentManagement: "Appointment Management",
        courseManagement: "Course Management",
        userManagement: "User Management",
        reports: "Reports",
        addProduct: "Add Product",
        editProduct: "Edit Product",
        deleteProduct: "Delete Product",
        addCourse: "Add Course",
        editCourse: "Edit Course",
        revenue: "Revenue",
        clients: "Clients",
        thisWeek: "This Week",
        thisMonth: "This Month",
        adminMenu: "Admin Menu",
        patients: "Patients",
        status: "Status",
        actions: "Actions",
        stock: "Stock",
        
        // Contact and footer
        contactUs: "Contact Us",
        address: "123 Therapy Avenue, Cityville, State 12345",
        phone: "+1 (555) 123-4567",
        email: "info@autismcenter.com",
        hours: "Mon-Fri: 8am-6pm, Sat: 9am-2pm",
        rights: "All Rights Reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        followUs: "Follow Us",
        quickLinks: "Quick Links",
      }
    },
    ar: {
      translation: {
        // Navigation
        siteName: "مركز التوحد",
        home: "الرئيسية",
        products: "المنتجات",
        courses: "الدورات",
        appointments: "المواعيد",
        admin: "الإدارة",
        login: "تسجيل الدخول",
        register: "التسجيل",
        
        // Theme and language
        darkMode: "الوضع المظلم",
        lightMode: "الوضع الفاتح",
        arabic: "العربية",
        english: "English",
        
        // Landing page
        missionTitle: "دعم رحلة التوحد",
        missionDescription: "يقدم مركزنا دعمًا شاملاً للأفراد المصابين بالتوحد وعائلاتهم من خلال التعليم والعلاج وخدمات المجتمع.",
        joinZoom: "انضم إلى مكالمة زوم",
        learnMore: "اعرف المزيد",
        ourServices: "خدماتنا",
        testimonials: "الشهادات",
        
        // Services
        behavioralTherapy: "العلاج السلوكي",
        behavioralTherapyDesc: "برامج علاجية مخصصة لتطوير المهارات الاجتماعية والتعليمية.",
        speechTherapy: "علاج النطق",
        speechTherapyDesc: "المساعدة في تحسين التواصل وتطوير اللغة.",
        occupationalTherapy: "العلاج الوظيفي",
        occupationalTherapyDesc: "دعم مهارات الحياة اليومية والتكامل الحسي.",
        parentTraining: "تدريب الوالدين",
        parentTrainingDesc: "تمكين الأسر بالاستراتيجيات والمعرفة.",
        
        // Testimonials
        testimonial1Name: "سارة جونسون",
        testimonial1Text: "لقد غير المركز حياتنا. حقق ابني تقدمًا مذهلاً في مهارات التواصل.",
        testimonial2Name: "أحمد علي",
        testimonial2Text: "الموظفون داعمون ومطلعون بشكل لا يصدق. ساعدت البرامج المنظمة ابنتي على الازدهار.",
        testimonial3Name: "ليزا طومسون",
        testimonial3Text: "لقد شهدنا تحسينات كبيرة في المهارات الاجتماعية لطفلنا منذ الانضمام إلى برامج المركز.",
        
        // E-commerce
        shopProducts: "تسوق المنتجات",
        addToCart: "أضف إلى السلة",
        viewCart: "عرض السلة",
        checkout: "الدفع",
        cart: "السلة",
        emptyCart: "سلة التسوق فارغة",
        totalPrice: "السعر الإجمالي",
        currency: "ريال",
        search: "البحث عن المنتجات...",
        category: "الفئة",
        allCategories: "جميع الفئات",
        
        // Product categories
        sensoryToys: "ألعاب حسية",
        educationalTools: "أدوات تعليمية",
        communicationAids: "وسائل مساعدة للتواصل",
        
        // Courses
        exploreCourses: "استكشف دوراتنا",
        enrollNow: "سجل الآن",
        preview: "معاينة",
        freeCourses: "دورات مجانية",
        paidCourses: "دورات مدفوعة",
        featured: "الدورات المميزة",
        allCourses: "جميع الدورات",
        loginRequired: "تسجيل الدخول مطلوب للتسجيل",
        progress: "تقدمك",
        duration: "المدة",
        level: "المستوى",
        beginners: "مبتدئين",
        intermediate: "متوسط",
        advanced: "متقدم",
        courseModules: "وحدات الدورة",
        
        // Appointments
        scheduleAppointment: "حجز موعد",
        selectDate: "حدد التاريخ",
        availableTimes: "الأوقات المتاحة",
        confirmAppointment: "تأكيد الموعد",
        appointmentConfirmed: "تم تأكيد موعدك!",
        zoomLinkMessage: "سيتم إرسال رابط زوم إلى بريدك الإلكتروني.",
        appointmentDetails: "تفاصيل الموعد",
        appointmentType: "نوع الموعد",
        initialConsultation: "استشارة أولية",
        therapySession: "جلسة علاجية",
        followUp: "متابعة",
        bookAppointment: "حجز موعد",
        reschedule: "إعادة جدولة",
        cancel: "إلغاء",
        upcomingAppointments: "المواعيد القادمة",
        noAppointments: "لا توجد مواعيد قادمة",
        confirmationTitle: "تم تأكيد الموعد",
        date: "التاريخ",
        time: "الوقت",
        type: "النوع",
        
        // Admin dashboard
        adminDashboard: "لوحة تحكم الإدارة",
        inventoryManagement: "إدارة المخزون",
        appointmentManagement: "إدارة المواعيد",
        courseManagement: "إدارة الدورات",
        userManagement: "إدارة المستخدمين",
        reports: "التقارير",
        addProduct: "إضافة منتج",
        editProduct: "تعديل منتج",
        deleteProduct: "حذف منتج",
        addCourse: "إضافة دورة",
        editCourse: "تعديل دورة",
        revenue: "الإيرادات",
        clients: "العملاء",
        thisWeek: "هذا الأسبوع",
        thisMonth: "هذا الشهر",
        adminMenu: "قائمة الإدارة",
        patients: "المرضى",
        status: "الحالة",
        actions: "الإجراءات",
        stock: "المخزون",
        
        // Contact and footer
        contactUs: "اتصل بنا",
        address: "123 شارع العلاج، المدينة، الولاية 12345",
        phone: "+1 (555) 123-4567",
        email: "info@autismcenter.com",
        hours: "الاثنين-الجمعة: 8ص-6م، السبت: 9ص-2م",
        rights: "جميع الحقوق محفوظة",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        followUs: "تابعنا",
        quickLinks: "روابط سريعة",
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
