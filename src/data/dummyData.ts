import { Product, User, PriceSubmission, Store, HealthGoal, DietaryPreference, Allergy } from '../types';

// Dummy Products
export const dummyProducts: Product[] = [
  {
    id: '1',
    barcode: '1234567890123',
    name: 'Almarai Fresh Milk',
    nameAr: 'حليب المراعي الطازج',
    brand: 'Almarai',
    brandAr: 'المراعي',
    category: {
      id: 'dairy',
      name: 'Dairy',
      nameAr: 'منتجات الألبان',
    },
    nutritionalFacts: {
      servingSize: '1 cup (240ml)',
      servingSizeAr: 'كوب واحد (240مل)',
      calories: 150,
      totalFat: 8,
      saturatedFat: 5,
      transFat: 0,
      cholesterol: 30,
      sodium: 120,
      totalCarbohydrates: 12,
      dietaryFiber: 0,
      sugars: 12,
      protein: 8,
      vitaminA: 10,
      vitaminC: 2,
      calcium: 30,
      iron: 0,
    },
    ingredients: ['Fresh Milk', 'Vitamin D3'],
    ingredientsAr: ['حليب طازج', 'فيتامين د3'],
    allergens: ['Milk'],
    allergensAr: ['حليب'],
    halalStatus: 'halal',
    healthScore: {
      score: 'A',
      value: 85,
      factors: [
        {
          name: 'Natural Ingredients',
          nameAr: 'مكونات طبيعية',
          impact: 'positive',
          weight: 0.3,
          description: 'Made with natural ingredients',
          descriptionAr: 'مصنوع من مكونات طبيعية',
        },
        {
          name: 'High Protein',
          nameAr: 'غني بالبروتين',
          impact: 'positive',
          weight: 0.4,
          description: 'Good source of protein',
          descriptionAr: 'مصدر جيد للبروتين',
        },
        {
          name: 'Low Sugar',
          nameAr: 'قليل السكر',
          impact: 'positive',
          weight: 0.3,
          description: 'Contains natural sugars only',
          descriptionAr: 'يحتوي على سكريات طبيعية فقط',
        },
      ],
    },
    imageUrl: 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Almarai+Milk',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    barcode: '2345678901234',
    name: 'Sunbake Whole Wheat Bread',
    nameAr: 'خبز التوست القمح الكامل',
    brand: 'Sunbake',
    brandAr: 'صن بيك',
    category: {
      id: 'bakery',
      name: 'Bakery',
      nameAr: 'المخبوزات',
    },
    nutritionalFacts: {
      servingSize: '2 slices (56g)',
      servingSizeAr: 'شريحتان (56غ)',
      calories: 160,
      totalFat: 2,
      saturatedFat: 0.5,
      transFat: 0,
      cholesterol: 0,
      sodium: 300,
      totalCarbohydrates: 30,
      dietaryFiber: 4,
      sugars: 4,
      protein: 6,
      vitaminA: 0,
      vitaminC: 0,
      calcium: 2,
      iron: 8,
    },
    ingredients: ['Whole Wheat Flour', 'Water', 'Yeast', 'Salt', 'Sugar'],
    ingredientsAr: ['دقيق القمح الكامل', 'ماء', 'خميرة', 'ملح', 'سكر'],
    allergens: ['Wheat', 'Gluten'],
    allergensAr: ['قمح', 'غلوتين'],
    halalStatus: 'halal',
    healthScore: {
      score: 'B',
      value: 75,
      factors: [
        {
          name: 'High Fiber',
          nameAr: 'غني بالألياف',
          impact: 'positive',
          weight: 0.4,
          description: 'Good source of dietary fiber',
          descriptionAr: 'مصدر جيد للألياف الغذائية',
        },
        {
          name: 'Whole Grain',
          nameAr: 'حبوب كاملة',
          impact: 'positive',
          weight: 0.3,
          description: 'Made with whole grains',
          descriptionAr: 'مصنوع من الحبوب الكاملة',
        },
        {
          name: 'Moderate Sodium',
          nameAr: 'صوديوم معتدل',
          impact: 'neutral',
          weight: 0.3,
          description: 'Moderate sodium content',
          descriptionAr: 'محتوى صوديوم معتدل',
        },
      ],
    },
    imageUrl: 'https://via.placeholder.com/300x300/FF9800/FFFFFF?text=Sunbake+Bread',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    barcode: '3456789012345',
    name: 'Kraft Cheddar Cheese',
    nameAr: 'جبنة كرافت الشيدر',
    brand: 'Kraft',
    brandAr: 'كرافت',
    category: {
      id: 'dairy',
      name: 'Dairy',
      nameAr: 'منتجات الألبان',
    },
    nutritionalFacts: {
      servingSize: '1 slice (28g)',
      servingSizeAr: 'شريحة واحدة (28غ)',
      calories: 110,
      totalFat: 9,
      saturatedFat: 6,
      transFat: 0,
      cholesterol: 30,
      sodium: 200,
      totalCarbohydrates: 1,
      dietaryFiber: 0,
      sugars: 0,
      protein: 7,
      vitaminA: 6,
      vitaminC: 0,
      calcium: 20,
      iron: 0,
    },
    ingredients: ['Cheddar Cheese', 'Milk', 'Salt', 'Enzymes'],
    ingredientsAr: ['جبنة شيدر', 'حليب', 'ملح', 'إنزيمات'],
    allergens: ['Milk'],
    allergensAr: ['حليب'],
    halalStatus: 'halal',
    healthScore: {
      score: 'C',
      value: 65,
      factors: [
        {
          name: 'High Protein',
          nameAr: 'غني بالبروتين',
          impact: 'positive',
          weight: 0.4,
          description: 'Good source of protein',
          descriptionAr: 'مصدر جيد للبروتين',
        },
        {
          name: 'High Fat',
          nameAr: 'غني بالدهون',
          impact: 'negative',
          weight: 0.3,
          description: 'High saturated fat content',
          descriptionAr: 'محتوى دهون مشبعة عالي',
        },
        {
          name: 'Moderate Sodium',
          nameAr: 'صوديوم معتدل',
          impact: 'neutral',
          weight: 0.3,
          description: 'Moderate sodium content',
          descriptionAr: 'محتوى صوديوم معتدل',
        },
      ],
    },
    imageUrl: 'https://via.placeholder.com/300x300/FFC107/FFFFFF?text=Kraft+Cheese',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    barcode: '4567890123456',
    name: 'Coca-Cola Classic',
    nameAr: 'كوكا كولا الكلاسيكية',
    brand: 'Coca-Cola',
    brandAr: 'كوكا كولا',
    category: {
      id: 'beverages',
      name: 'Beverages',
      nameAr: 'المشروبات',
    },
    nutritionalFacts: {
      servingSize: '1 can (355ml)',
      servingSizeAr: 'علبة واحدة (355مل)',
      calories: 140,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      cholesterol: 0,
      sodium: 45,
      totalCarbohydrates: 39,
      dietaryFiber: 0,
      sugars: 39,
      protein: 0,
      vitaminA: 0,
      vitaminC: 0,
      calcium: 0,
      iron: 0,
    },
    ingredients: ['Carbonated Water', 'Sugar', 'Caramel Color', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'],
    ingredientsAr: ['ماء مكربن', 'سكر', 'لون الكراميل', 'حمض الفوسفوريك', 'نكهات طبيعية', 'كافيين'],
    allergens: [],
    allergensAr: [],
    halalStatus: 'halal',
    healthScore: {
      score: 'E',
      value: 25,
      factors: [
        {
          name: 'Very High Sugar',
          nameAr: 'سكر عالي جداً',
          impact: 'negative',
          weight: 0.5,
          description: 'Very high sugar content',
          descriptionAr: 'محتوى سكر عالي جداً',
        },
        {
          name: 'No Nutritional Value',
          nameAr: 'بدون قيمة غذائية',
          impact: 'negative',
          weight: 0.3,
          description: 'No essential nutrients',
          descriptionAr: 'بدون مغذيات أساسية',
        },
        {
          name: 'Artificial Ingredients',
          nameAr: 'مكونات صناعية',
          impact: 'negative',
          weight: 0.2,
          description: 'Contains artificial ingredients',
          descriptionAr: 'يحتوي على مكونات صناعية',
        },
      ],
    },
    imageUrl: 'https://via.placeholder.com/300x300/F44336/FFFFFF?text=Coca-Cola',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: '5',
    barcode: '5678901234567',
    name: 'Fresh Bananas',
    nameAr: 'موز طازج',
    brand: 'Fresh Produce',
    brandAr: 'منتجات طازجة',
    category: {
      id: 'fruits',
      name: 'Fruits',
      nameAr: 'الفواكه',
    },
    nutritionalFacts: {
      servingSize: '1 medium banana (118g)',
      servingSizeAr: 'موزة متوسطة (118غ)',
      calories: 105,
      totalFat: 0.4,
      saturatedFat: 0.1,
      transFat: 0,
      cholesterol: 0,
      sodium: 1,
      totalCarbohydrates: 27,
      dietaryFiber: 3,
      sugars: 14,
      protein: 1.3,
      vitaminA: 1,
      vitaminC: 17,
      calcium: 1,
      iron: 1,
    },
    ingredients: ['Banana'],
    ingredientsAr: ['موز'],
    allergens: [],
    allergensAr: [],
    halalStatus: 'halal',
    healthScore: {
      score: 'A',
      value: 95,
      factors: [
        {
          name: 'Natural Fruit',
          nameAr: 'فاكهة طبيعية',
          impact: 'positive',
          weight: 0.4,
          description: '100% natural fruit',
          descriptionAr: 'فاكهة طبيعية 100%',
        },
        {
          name: 'High Fiber',
          nameAr: 'غني بالألياف',
          impact: 'positive',
          weight: 0.3,
          description: 'Good source of dietary fiber',
          descriptionAr: 'مصدر جيد للألياف الغذائية',
        },
        {
          name: 'High Vitamin C',
          nameAr: 'غني بفيتامين ج',
          impact: 'positive',
          weight: 0.3,
          description: 'Rich in vitamin C',
          descriptionAr: 'غني بفيتامين ج',
        },
      ],
    },
    imageUrl: 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Bananas',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

// Dummy Stores
export const dummyStores: Store[] = [
  {
    id: 'sultan_center',
    name: 'Sultan Center',
    nameAr: 'مركز السلطان',
    chain: 'Sultan Center',
    chainAr: 'مركز السلطان',
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
    logoUrl: 'https://via.placeholder.com/100x50/2E7D32/FFFFFF?text=Sultan',
    isActive: true,
  },
  {
    id: 'lulu_hypermarket',
    name: 'Lulu Hypermarket',
    nameAr: 'لولو هايبرماركت',
    chain: 'Lulu',
    chainAr: 'لولو',
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
    logoUrl: 'https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=Lulu',
    isActive: true,
  },
  {
    id: 'carrefour',
    name: 'Carrefour',
    nameAr: 'كارفور',
    chain: 'Carrefour',
    chainAr: 'كارفور',
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
    logoUrl: 'https://via.placeholder.com/100x50/2196F3/FFFFFF?text=Carrefour',
    isActive: true,
  },
  {
    id: 'coop_society',
    name: 'Cooperative Society',
    nameAr: 'الجمعية التعاونية',
    chain: 'Coop',
    chainAr: 'تعاونية',
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
    logoUrl: 'https://via.placeholder.com/100x50/FFD700/000000?text=Coop',
    isActive: true,
  },
];

// Dummy Price Submissions
export const dummyPriceSubmissions: PriceSubmission[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    storeId: 'sultan_center',
    price: 2.5,
    currency: 'KWD',
    verified: true,
    trustScore: 95,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    storeId: 'lulu_hypermarket',
    price: 2.3,
    currency: 'KWD',
    verified: true,
    trustScore: 88,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    storeId: 'carrefour',
    price: 1.8,
    currency: 'KWD',
    verified: false,
    trustScore: 72,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    productId: '3',
    userId: 'user1',
    storeId: 'sultan_center',
    price: 3.2,
    currency: 'KWD',
    verified: true,
    trustScore: 90,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    productId: '4',
    userId: 'user4',
    storeId: 'lulu_hypermarket',
    price: 0.5,
    currency: 'KWD',
    verified: true,
    trustScore: 85,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: '6',
    productId: '5',
    userId: 'user2',
    storeId: 'coop_society',
    price: 1.2,
    currency: 'KWD',
    verified: true,
    trustScore: 92,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

// Dummy User
export const dummyUser: User = {
  id: 'user1',
  email: 'ahmed@example.com',
  phone: '+96512345678',
  name: 'أحمد محمد',
  age: 28,
  weight: 75,
  height: 175,
  healthGoals: [
    {
      id: 'weight_loss',
      name: 'Weight Loss',
      nameAr: 'فقدان الوزن',
      description: 'Lose weight and maintain a healthy BMI',
      descriptionAr: 'فقدان الوزن والحفاظ على مؤشر كتلة الجسم الصحي',
    },
  ],
  dietaryPreferences: [
    {
      id: 'halal',
      name: 'Halal',
      nameAr: 'حلال',
      description: 'Only Halal certified products',
      descriptionAr: 'المنتجات الحلال المعتمدة فقط',
    },
  ],
  allergies: [
    {
      id: 'nuts',
      name: 'Nuts',
      nameAr: 'المكسرات',
      severity: 'severe',
    },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

// Health Tips
export const dummyHealthTips = [
  {
    id: '1',
    title: 'نصيحة صحية',
    titleAr: 'نصيحة صحية',
    content: 'اشرب 8 أكواب من الماء يومياً للحفاظ على ترطيب جسمك',
    contentAr: 'اشرب 8 أكواب من الماء يومياً للحفاظ على ترطيب جسمك',
    type: 'hydration',
    icon: 'local-drink',
  },
  {
    id: '2',
    title: 'نصيحة غذائية',
    titleAr: 'نصيحة غذائية',
    content: 'تناول 5 حصص من الفواكه والخضروات يومياً',
    contentAr: 'تناول 5 حصص من الفواكه والخضروات يومياً',
    type: 'nutrition',
    icon: 'eco',
  },
  {
    id: '3',
    title: 'نصيحة للصحة',
    titleAr: 'نصيحة للصحة',
    content: 'تجنب الأطعمة المصنعة واختر الأطعمة الطبيعية',
    contentAr: 'تجنب الأطعمة المصنعة واختر الأطعمة الطبيعية',
    type: 'health',
    icon: 'favorite',
  },
];

// Quick Actions
export const dummyQuickActions = [
  {
    id: 'scan',
    title: 'مسح منتج',
    titleAr: 'مسح منتج',
    icon: 'qr-code-scanner',
    color: '#2E7D32',
  },
  {
    id: 'recent',
    title: 'المنتجات الأخيرة',
    titleAr: 'المنتجات الأخيرة',
    icon: 'history',
    color: '#FF6B35',
  },
  {
    id: 'favorites',
    title: 'المفضلة',
    titleAr: 'المفضلة',
    icon: 'favorite',
    color: '#FFD700',
  },
  {
    id: 'price_alerts',
    title: 'تنبيهات الأسعار',
    titleAr: 'تنبيهات الأسعار',
    icon: 'notifications',
    color: '#2196F3',
  },
];

// User Statistics
export const dummyUserStats = {
  scannedProducts: 24,
  addedPrices: 8,
  favorites: 12,
  avgHealthScore: 'A',
  totalSavings: 15.5,
  favoriteCategory: 'Dairy',
  mostScannedBrand: 'Almarai',
};

// Recent Products (for home screen)
export const dummyRecentProducts = [
  {
    id: '1',
    name: 'حليب المراعي',
    nameAr: 'حليب المراعي',
    brand: 'Almarai',
    brandAr: 'المراعي',
    healthScore: 'A',
    price: 2.5,
    image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=Almarai',
    lastScanned: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'خبز التوست',
    nameAr: 'خبز التوست',
    brand: 'Sunbake',
    brandAr: 'صن بيك',
    healthScore: 'B',
    price: 1.2,
    image: 'https://via.placeholder.com/100x100/FF9800/FFFFFF?text=Sunbake',
    lastScanned: new Date('2024-01-14'),
  },
  {
    id: '3',
    name: 'جبنة كرافت',
    nameAr: 'جبنة كرافت',
    brand: 'Kraft',
    brandAr: 'كرافت',
    healthScore: 'C',
    price: 3.2,
    image: 'https://via.placeholder.com/100x100/FFC107/FFFFFF?text=Kraft',
    lastScanned: new Date('2024-01-13'),
  },
];

// Helper functions
export const getProductByBarcode = (barcode: string): Product | undefined => {
  return dummyProducts.find(product => product.barcode === barcode);
};

export const getProductById = (id: string): Product | undefined => {
  return dummyProducts.find(product => product.id === id);
};

export const getPricesForProduct = (productId: string): PriceSubmission[] => {
  return dummyPriceSubmissions.filter(price => price.productId === productId);
};

export const getStoreById = (id: string): Store | undefined => {
  return dummyStores.find(store => store.id === id);
};

export const getRecentProducts = (limit: number = 5) => {
  return dummyRecentProducts.slice(0, limit);
};

export const getHealthTips = (limit: number = 3) => {
  return dummyHealthTips.slice(0, limit);
};

export const getQuickActions = () => {
  return dummyQuickActions;
};

export const getUserStats = () => {
  return dummyUserStats;
};
