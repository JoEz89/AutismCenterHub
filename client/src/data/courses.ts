import { Course } from '@shared/schema';

export const courses: Omit<Course, 'id' | 'createdAt'>[] = [
  {
    title: 'Understanding Autism Spectrum',
    titleAr: 'فهم طيف التوحد',
    description: 'A comprehensive introduction to autism spectrum disorders, signs, and support strategies for families and caregivers.',
    descriptionAr: 'مقدمة شاملة لاضطرابات طيف التوحد والعلامات واستراتيجيات الدعم للعائلات ومقدمي الرعاية.',
    instructor: 'Dr. Sarah Johnson',
    instructorAr: 'د. سارة جونسون',
    duration: '8 weeks',
    durationAr: '8 أسابيع',
    level: 'Beginners',
    levelAr: 'مبتدئين',
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    modules: [
      {
        title: 'Introduction to Autism Spectrum',
        titleAr: 'مقدمة في طيف التوحد',
        completed: true
      },
      {
        title: 'Understanding Sensory Processing',
        titleAr: 'فهم المعالجة الحسية',
        completed: true
      },
      {
        title: 'Communication Strategies',
        titleAr: 'استراتيجيات التواصل',
        completed: false
      },
      {
        title: 'Behavior Support Techniques',
        titleAr: 'تقنيات دعم السلوك',
        completed: false
      }
    ]
  },
  {
    title: 'Applied Behavior Analysis Basics',
    titleAr: 'أساسيات تحليل السلوك التطبيقي',
    description: 'Learn the fundamental principles of ABA therapy and how to implement behavior support plans for children with autism.',
    descriptionAr: 'تعلم المبادئ الأساسية للعلاج السلوكي التطبيقي وكيفية تنفيذ خطط دعم السلوك للأطفال المصابين بالتوحد.',
    instructor: 'Prof. Michael Thomas',
    instructorAr: 'أ. مايكل توماس',
    duration: '6 weeks',
    durationAr: '6 أسابيع',
    level: 'Intermediate',
    levelAr: 'متوسط',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    modules: [
      {
        title: 'Foundations of ABA',
        titleAr: 'أسس تحليل السلوك التطبيقي',
        completed: false
      },
      {
        title: 'Behavior Assessment Techniques',
        titleAr: 'تقنيات تقييم السلوك',
        completed: false
      },
      {
        title: 'Creating Effective Behavior Plans',
        titleAr: 'إنشاء خطط سلوكية فعالة',
        completed: false
      },
      {
        title: 'Implementing and Monitoring Interventions',
        titleAr: 'تنفيذ ومراقبة التدخلات',
        completed: false
      },
      {
        title: 'Measuring and Analyzing Progress',
        titleAr: 'قياس وتحليل التقدم',
        completed: false
      }
    ]
  },
  {
    title: 'Sensory Processing Strategies',
    titleAr: 'استراتيجيات المعالجة الحسية',
    description: 'Practical approaches to address sensory sensitivities and create supportive environments for individuals with autism.',
    descriptionAr: 'نهج عملي لمعالجة الحساسيات الحسية وخلق بيئات داعمة للأفراد المصابين بالتوحد.',
    instructor: 'Dr. Lisa Wong',
    instructorAr: 'د. ليزا وونغ',
    duration: '4 weeks',
    durationAr: '4 أسابيع',
    level: 'All Levels',
    levelAr: 'جميع المستويات',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    modules: [
      {
        title: 'Understanding Sensory Processing Disorder',
        titleAr: 'فهم اضطراب المعالجة الحسية',
        completed: false
      },
      {
        title: 'Sensory Assessment Tools',
        titleAr: 'أدوات تقييم الحواس',
        completed: false
      },
      {
        title: 'Creating Sensory-Friendly Environments',
        titleAr: 'إنشاء بيئات صديقة للحواس',
        completed: false
      },
      {
        title: 'Sensory Integration Techniques',
        titleAr: 'تقنيات التكامل الحسي',
        completed: false
      }
    ]
  },
  {
    title: 'Communication Development',
    titleAr: 'تطوير التواصل',
    description: 'Advanced techniques for enhancing verbal and non-verbal communication skills in children and adolescents with autism.',
    descriptionAr: 'تقنيات متقدمة لتعزيز مهارات التواصل اللفظي وغير اللفظي لدى الأطفال والمراهقين المصابين بالتوحد.',
    instructor: 'Dr. James Peterson',
    instructorAr: 'د. جيمس بيترسون',
    duration: '10 weeks',
    durationAr: '10 أسابيع',
    level: 'Advanced',
    levelAr: 'متقدم',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    modules: [
      {
        title: 'Language Development in Autism',
        titleAr: 'تطور اللغة في التوحد',
        completed: false
      },
      {
        title: 'Augmentative and Alternative Communication',
        titleAr: 'التواصل المعزز والبديل',
        completed: false
      },
      {
        title: 'Visual Support Systems',
        titleAr: 'أنظمة الدعم البصري',
        completed: false
      },
      {
        title: 'Social Communication Skills',
        titleAr: 'مهارات التواصل الاجتماعي',
        completed: false
      },
      {
        title: 'Technology-Assisted Communication',
        titleAr: 'التواصل بمساعدة التكنولوجيا',
        completed: false
      }
    ]
  }
];
