export interface Testimonial {
  id: number;
  name: string;
  nameAr: string;
  text: string;
  textAr: string;
  image: string;
  role: string;
  roleAr: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    nameAr: "سارة جونسون",
    text: "The center has transformed our lives. My son has made incredible progress with his communication skills.",
    textAr: "لقد غير المركز حياتنا. حقق ابني تقدمًا مذهلاً في مهارات التواصل.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    role: "Parent",
    roleAr: "أم لطفل"
  },
  {
    id: 2,
    name: "Ahmed Ali",
    nameAr: "أحمد علي",
    text: "The staff is incredibly supportive and knowledgeable. The structured programs have helped my daughter thrive.",
    textAr: "الموظفون داعمون ومطلعون بشكل لا يصدق. ساعدت البرامج المنظمة ابنتي على الازدهار.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    role: "Parent",
    roleAr: "أب لطفلة"
  },
  {
    id: 3,
    name: "Lisa Thompson",
    nameAr: "ليزا طومسون",
    text: "We've seen significant improvements in our child's social skills since joining the center's programs.",
    textAr: "لقد شهدنا تحسينات كبيرة في المهارات الاجتماعية لطفلنا منذ الانضمام إلى برامج المركز.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    role: "Parent",
    roleAr: "أم لطفل"
  }
];
