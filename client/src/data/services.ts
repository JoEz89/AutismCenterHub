export interface Service {
  icon: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
}

export const services: Service[] = [
  {
    icon: "mental_health",
    title: "Behavioral Therapy",
    titleAr: "العلاج السلوكي",
    description: "Customized ABA therapy programs to develop social and learning skills.",
    descriptionAr: "برامج علاجية مخصصة لتطوير المهارات الاجتماعية والتعليمية.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
  },
  {
    icon: "record_voice_over",
    title: "Speech Therapy",
    titleAr: "علاج النطق",
    description: "Helping improve communication and language development.",
    descriptionAr: "المساعدة في تحسين التواصل وتطوير اللغة.",
    image: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
  },
  {
    icon: "accessibility_new",
    title: "Occupational Therapy",
    titleAr: "العلاج الوظيفي",
    description: "Supporting daily living skills and sensory integration.",
    descriptionAr: "دعم مهارات الحياة اليومية والتكامل الحسي.",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
  },
  {
    icon: "family_restroom",
    title: "Parent Training",
    titleAr: "تدريب الوالدين",
    description: "Empowering families with strategies and knowledge.",
    descriptionAr: "تمكين الأسر بالاستراتيجيات والمعرفة.",
    image: "https://images.unsplash.com/photo-1551184451-66ad7bcdb8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
  }
];
