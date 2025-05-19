import { Product } from '@shared/schema';

export const products: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: 'Sensory Fidget Cube',
    nameAr: 'مكعب فيدجيت الحسي',
    description: 'Multi-sensory fidget toy for stress relief and focus improvement.',
    descriptionAr: 'لعبة فيدجيت متعددة الحواس لتخفيف التوتر وتحسين التركيز.',
    price: 19.99,
    priceAr: 75,
    image: 'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'sensory',
    stock: 45
  },
  {
    name: 'Visual Schedule Board',
    nameAr: 'لوحة الجدول الزمني المرئي',
    description: 'Customizable visual schedule for daily routines and activities.',
    descriptionAr: 'جدول مرئي قابل للتخصيص للروتين والأنشطة اليومية.',
    price: 34.99,
    priceAr: 131,
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'communication',
    stock: 23
  },
  {
    name: 'Weighted Sensory Blanket',
    nameAr: 'بطانية حسية مثقلة',
    description: 'Calming weighted blanket for better sleep and sensory regulation.',
    descriptionAr: 'بطانية مثقلة مهدئة لنوم أفضل وتنظيم حسي.',
    price: 79.99,
    priceAr: 300,
    image: 'https://images.unsplash.com/photo-1585428853901-05f8aed16dd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'sensory',
    stock: 12
  },
  {
    name: 'Communication Cards Set',
    nameAr: 'مجموعة بطاقات التواصل',
    description: 'Visual communication cards for non-verbal children to express needs.',
    descriptionAr: 'بطاقات تواصل مرئية للأطفال غير اللفظيين للتعبير عن احتياجاتهم.',
    price: 24.99,
    priceAr: 94,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'communication',
    stock: 32
  },
  {
    name: 'Sensory Swing',
    nameAr: 'أرجوحة حسية',
    description: 'Indoor therapy swing for vestibular input and sensory integration.',
    descriptionAr: 'أرجوحة علاجية داخلية للمدخلات الدهليزية والتكامل الحسي.',
    price: 119.99,
    priceAr: 450,
    image: 'https://images.unsplash.com/photo-1543169108-32ac15a21e05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'sensory',
    stock: 8
  },
  {
    name: 'Mathematical Pattern Blocks',
    nameAr: 'مكعبات الأنماط الرياضية',
    description: 'Colorful blocks for mathematical learning and pattern recognition.',
    descriptionAr: 'مكعبات ملونة للتعلم الرياضي والتعرف على الأنماط.',
    price: 29.99,
    priceAr: 112,
    image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'educational',
    stock: 28
  },
  {
    name: 'Emotion Recognition Cards',
    nameAr: 'بطاقات التعرف على المشاعر',
    description: 'Cards to help children identify and understand different emotions.',
    descriptionAr: 'بطاقات لمساعدة الأطفال على تحديد وفهم المشاعر المختلفة.',
    price: 18.99,
    priceAr: 71,
    image: 'https://images.unsplash.com/photo-1499578124509-1611b77778c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'educational',
    stock: 40
  },
  {
    name: 'Tactile Sensory Balls Set',
    nameAr: 'مجموعة كرات حسية لمسية',
    description: 'Set of textured balls for tactile sensory development.',
    descriptionAr: 'مجموعة من الكرات ذات الملمس المختلف للتطوير الحسي اللمسي.',
    price: 24.99,
    priceAr: 94,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'sensory',
    stock: 35
  },
  {
    name: 'Speech Therapy Mirror',
    nameAr: 'مرآة علاج النطق',
    description: 'Shatterproof mirror for speech therapy and articulation practice.',
    descriptionAr: 'مرآة غير قابلة للكسر لعلاج النطق وتدريب النطق.',
    price: 44.99,
    priceAr: 169,
    image: 'https://images.unsplash.com/photo-1629784352524-ad7dbc8b183b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600',
    category: 'communication',
    stock: 18
  }
];
