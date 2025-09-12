// Restaurant and Food Delivery Types
export interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  cuisine: string;
  cuisineAr: string;
  rating: number;
  deliveryTime: string;
  deliveryTimeAr: string;
  deliveryFee: number;
  minimumOrder: number;
  logoUrl: string;
  imageUrl: string;
  isHalal: boolean;
  isActive: boolean;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    addressAr: string;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  imageUrl: string;
  isHalal: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  allergens: string[];
  allergensAr: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
  };
  priceComparisons: PriceComparison[];
}

export interface PriceComparison {
  appId: string;
  price: number;
  currency: 'KWD';
  deliveryFee: number;
  serviceFee: number;
  totalPrice: number;
  isAvailable: boolean;
  lastUpdated: Date;
}

export interface FoodApp {
  id: string;
  name: string;
  nameAr: string;
  logoUrl: string;
  isActive: boolean;
}

// User Types
export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  healthGoals: HealthGoal[];
  dietaryPreferences: DietaryPreference[];
  allergies: Allergy[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthGoal {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
}

export interface DietaryPreference {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
}

export interface Allergy {
  id: string;
  name: string;
  nameAr: string;
  severity: 'mild' | 'moderate' | 'severe';
}

// Product Types
export interface Product {
  id: string;
  barcode: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  category: ProductCategory;
  nutritionalFacts: NutritionalFacts;
  ingredients: string[];
  ingredientsAr: string[];
  allergens: string[];
  allergensAr: string[];
  halalStatus: HalalStatus;
  healthScore: HealthScore;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionalFacts {
  servingSize: string;
  servingSizeAr: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  vitaminA?: number;
  vitaminC?: number;
  calcium?: number;
  iron?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  nameAr: string;
  parentId?: string;
}

export type HalalStatus = 'halal' | 'haram' | 'unknown' | 'doubtful';

export interface HealthScore {
  score: 'A' | 'B' | 'C' | 'D' | 'E';
  value: number; // 0-100
  factors: HealthScoreFactor[];
}

export interface HealthScoreFactor {
  name: string;
  nameAr: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
  descriptionAr: string;
}

// Pricing Types
export interface PriceSubmission {
  id: string;
  productId: string;
  userId: string;
  storeId: string;
  price: number; // in KWD
  currency: 'KWD';
  imageUrl?: string;
  verified: boolean;
  trustScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  name: string;
  nameAr: string;
  chain: string;
  chainAr: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    addressAr: string;
  };
  logoUrl?: string;
  isActive: boolean;
}

// Scanner Types
export interface ScanResult {
  barcode: string;
  product?: Product;
  found: boolean;
  timestamp: Date;
}

// UI Types
export interface Language {
  code: 'en' | 'ar';
  name: string;
  nameAr: string;
  isRTL: boolean;
}

export interface AppSettings {
  language: Language;
  notifications: {
    priceAlerts: boolean;
    newProducts: boolean;
    healthTips: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
  };
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Product: { productId: string; barcode?: string };
  Restaurant: { restaurantId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Scanner: undefined;
  Pricing: undefined;
  Profile: undefined;
};

// Form Types
export interface OnboardingForm {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  weight?: number;
  height?: number;
  healthGoals: string[];
  dietaryPreferences: string[];
  allergies: string[];
}

export interface PriceSubmissionForm {
  productId: string;
  storeId: string;
  price: string;
  image?: string;
}

// Constants
export const HEALTH_GOALS: HealthGoal[] = [
  {
    id: 'weight_loss',
    name: 'Weight Loss',
    nameAr: 'فقدان الوزن',
    description: 'Lose weight and maintain a healthy BMI',
    descriptionAr: 'فقدان الوزن والحفاظ على مؤشر كتلة الجسم الصحي',
  },
  {
    id: 'muscle_gain',
    name: 'Muscle Gain',
    nameAr: 'زيادة الكتلة العضلية',
    description: 'Build muscle mass and strength',
    descriptionAr: 'بناء الكتلة العضلية والقوة',
  },
  {
    id: 'maintenance',
    name: 'Weight Maintenance',
    nameAr: 'الحفاظ على الوزن',
    description: 'Maintain current weight and health',
    descriptionAr: 'الحفاظ على الوزن الحالي والصحة',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Management',
    nameAr: 'إدارة السكري',
    description: 'Manage blood sugar levels',
    descriptionAr: 'إدارة مستويات السكر في الدم',
  },
];

export const DIETARY_PREFERENCES: DietaryPreference[] = [
  {
    id: 'halal',
    name: 'Halal',
    nameAr: 'حلال',
    description: 'Only Halal certified products',
    descriptionAr: 'المنتجات الحلال المعتمدة فقط',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    nameAr: 'نباتي',
    description: 'No meat or fish',
    descriptionAr: 'بدون لحوم أو أسماك',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    nameAr: 'نباتي صرف',
    description: 'No animal products',
    descriptionAr: 'بدون منتجات حيوانية',
  },
  {
    id: 'gluten_free',
    name: 'Gluten-Free',
    nameAr: 'خالي من الغلوتين',
    description: 'No gluten containing ingredients',
    descriptionAr: 'بدون مكونات تحتوي على الغلوتين',
  },
  {
    id: 'lactose_free',
    name: 'Lactose-Free',
    nameAr: 'خالي من اللاكتوز',
    description: 'No lactose containing ingredients',
    descriptionAr: 'بدون مكونات تحتوي على اللاكتوز',
  },
  {
    id: 'low_sodium',
    name: 'Low Sodium',
    nameAr: 'قليل الصوديوم',
    description: 'Reduced sodium content',
    descriptionAr: 'محتوى صوديوم منخفض',
  },
  {
    id: 'low_sugar',
    name: 'Low Sugar',
    nameAr: 'قليل السكر',
    description: 'Reduced sugar content',
    descriptionAr: 'محتوى سكر منخفض',
  },
];

export const ALLERGIES: Allergy[] = [
  {
    id: 'nuts',
    name: 'Nuts',
    nameAr: 'المكسرات',
    severity: 'severe',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    nameAr: 'منتجات الألبان',
    severity: 'moderate',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    nameAr: 'البيض',
    severity: 'moderate',
  },
  {
    id: 'soy',
    name: 'Soy',
    nameAr: 'الصويا',
    severity: 'mild',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    nameAr: 'القمح',
    severity: 'severe',
  },
  {
    id: 'fish',
    name: 'Fish',
    nameAr: 'الأسماك',
    severity: 'severe',
  },
  {
    id: 'shellfish',
    name: 'Shellfish',
    nameAr: 'المحار',
    severity: 'severe',
  },
  {
    id: 'sesame',
    name: 'Sesame',
    nameAr: 'السمسم',
    severity: 'moderate',
  },
];

export const STORES: Store[] = [
  {
    id: 'sultan_center',
    name: 'Sultan Center',
    nameAr: 'مركز السلطان',
    chain: 'Sultan Center',
    chainAr: 'مركز السلطان',
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City',
      addressAr: 'مدينة الكويت',
    },
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
      address: 'Kuwait City',
      addressAr: 'مدينة الكويت',
    },
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
      address: 'Kuwait City',
      addressAr: 'مدينة الكويت',
    },
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
      address: 'Kuwait City',
      addressAr: 'مدينة الكويت',
    },
    isActive: true,
  },
];
