import { Restaurant, MenuItem, PriceComparison, FoodApp } from '../types';

// Food Delivery Apps in Kuwait
export const foodApps: FoodApp[] = [
  {
    id: 'talabat',
    name: 'Talabat',
    nameAr: 'طلبات',
    logoUrl: 'https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=Talabat',
    isActive: true,
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    nameAr: 'دليفرو',
    logoUrl: 'https://via.placeholder.com/100x50/00CCBC/FFFFFF?text=Deliveroo',
    isActive: true,
  },
  {
    id: 'carriage',
    name: 'Carriage',
    nameAr: 'كريج',
    logoUrl: 'https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=Carriage',
    isActive: true,
  },
  {
    id: 'zomato',
    name: 'Zomato',
    nameAr: 'زوماتو',
    logoUrl: 'https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=Zomato',
    isActive: true,
  },
  {
    id: 'uber_eats',
    name: 'Uber Eats',
    nameAr: 'أوبر إيتس',
    logoUrl: 'https://via.placeholder.com/100x50/000000/FFFFFF?text=Uber+Eats',
    isActive: true,
  },
];

// McDonald's Restaurant Data
export const mcdonaldsRestaurant: Restaurant = {
  id: 'mcdonalds',
  name: 'McDonald\'s',
  nameAr: 'ماكدونالدز',
  cuisine: 'Fast Food',
  cuisineAr: 'وجبات سريعة',
  rating: 4.2,
  deliveryTime: '25-35 min',
  deliveryTimeAr: '25-35 دقيقة',
  deliveryFee: 2.5,
  minimumOrder: 5.0,
  logoUrl: 'https://via.placeholder.com/150x150/FFC72C/000000?text=McDonald\'s',
  imageUrl: 'https://via.placeholder.com/300x200/FFC72C/000000?text=McDonald\'s+Store',
  isHalal: true,
  isActive: true,
  location: {
    latitude: 29.3759,
    longitude: 47.9774,
    address: 'Kuwait City, Kuwait',
    addressAr: 'مدينة الكويت، الكويت',
  },
};

// McDonald's Menu Items
export const mcdonaldsMenuItems: MenuItem[] = [
  {
    id: 'big_mac',
    name: 'Big Mac',
    nameAr: 'بيج ماك',
    description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    descriptionAr: 'قطعتان من لحم البقر، الصلصة الخاصة، الخس، الجبن، المخللات، البصل على خبز السمسم',
    category: 'Burgers',
    categoryAr: 'البرجر',
    imageUrl: 'https://via.placeholder.com/200x150/FF6B35/FFFFFF?text=Big+Mac',
    isHalal: true,
    isVegetarian: false,
    isVegan: false,
    allergens: ['Wheat', 'Milk', 'Sesame'],
    allergensAr: ['قمح', 'حليب', 'سمسم'],
    nutritionalInfo: {
      calories: 550,
      protein: 25,
      carbs: 45,
      fat: 33,
      sodium: 1010,
    },
    priceComparisons: [
      {
        appId: 'talabat',
        price: 3.5,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 6.5,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'deliveroo',
        price: 3.2,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 5.5,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'carriage',
        price: 3.8,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.4,
        totalPrice: 6.7,
        isAvailable: true,
        lastUpdated: new Date('2024-01-14'),
      },
      {
        appId: 'zomato',
        price: 3.3,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 5.6,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'uber_eats',
        price: 3.6,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 6.6,
        isAvailable: false,
        lastUpdated: new Date('2024-01-13'),
      },
    ],
  },
  {
    id: 'mcnuggets_6pc',
    name: 'Chicken McNuggets (6 pieces)',
    nameAr: 'قطع الدجاج (6 قطع)',
    description: 'Tender, juicy chicken breast meat in a crispy coating',
    descriptionAr: 'لحم صدر دجاج طري وعصير في طبقة مقرمشة',
    category: 'Chicken',
    categoryAr: 'الدجاج',
    imageUrl: 'https://via.placeholder.com/200x150/FFD700/000000?text=McNuggets',
    isHalal: true,
    isVegetarian: false,
    isVegan: false,
    allergens: ['Wheat', 'Soy'],
    allergensAr: ['قمح', 'صويا'],
    nutritionalInfo: {
      calories: 250,
      protein: 15,
      carbs: 15,
      fat: 15,
      sodium: 450,
    },
    priceComparisons: [
      {
        appId: 'talabat',
        price: 2.8,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 5.8,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'deliveroo',
        price: 2.5,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 4.8,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'carriage',
        price: 3.0,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.4,
        totalPrice: 5.9,
        isAvailable: true,
        lastUpdated: new Date('2024-01-14'),
      },
      {
        appId: 'zomato',
        price: 2.6,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 4.9,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'uber_eats',
        price: 2.9,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 5.9,
        isAvailable: true,
        lastUpdated: new Date('2024-01-13'),
      },
    ],
  },
  {
    id: 'french_fries_large',
    name: 'French Fries (Large)',
    nameAr: 'البطاطس المقلية (كبير)',
    description: 'Crispy golden fries made from premium potatoes',
    descriptionAr: 'بطاطس مقلية ذهبية مقرمشة مصنوعة من البطاطس الممتازة',
    category: 'Sides',
    categoryAr: 'الأطباق الجانبية',
    imageUrl: 'https://via.placeholder.com/200x150/FFD700/000000?text=Fries',
    isHalal: true,
    isVegetarian: true,
    isVegan: false,
    allergens: [],
    allergensAr: [],
    nutritionalInfo: {
      calories: 320,
      protein: 4,
      carbs: 43,
      fat: 15,
      sodium: 260,
    },
    priceComparisons: [
      {
        appId: 'talabat',
        price: 1.5,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 4.5,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'deliveroo',
        price: 1.2,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 3.5,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'carriage',
        price: 1.6,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.4,
        totalPrice: 4.5,
        isAvailable: true,
        lastUpdated: new Date('2024-01-14'),
      },
      {
        appId: 'zomato',
        price: 1.3,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 3.6,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'uber_eats',
        price: 1.4,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 4.4,
        isAvailable: true,
        lastUpdated: new Date('2024-01-13'),
      },
    ],
  },
  {
    id: 'mcflurry_oreo',
    name: 'McFlurry with Oreo',
    nameAr: 'ماكفلوري مع أوريو',
    description: 'Creamy vanilla soft serve with crushed Oreo cookies',
    descriptionAr: 'آيس كريم الفانيليا الكريمي مع قطع بسكويت أوريو المطحون',
    category: 'Desserts',
    categoryAr: 'الحلويات',
    imageUrl: 'https://via.placeholder.com/200x150/FFFFFF/000000?text=McFlurry',
    isHalal: true,
    isVegetarian: true,
    isVegan: false,
    allergens: ['Milk', 'Wheat'],
    allergensAr: ['حليب', 'قمح'],
    nutritionalInfo: {
      calories: 510,
      protein: 8,
      carbs: 68,
      fat: 22,
      sodium: 200,
    },
    priceComparisons: [
      {
        appId: 'talabat',
        price: 2.2,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 5.2,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'deliveroo',
        price: 1.9,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 4.2,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'carriage',
        price: 2.4,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.4,
        totalPrice: 5.3,
        isAvailable: true,
        lastUpdated: new Date('2024-01-14'),
      },
      {
        appId: 'zomato',
        price: 2.0,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 4.3,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'uber_eats',
        price: 2.1,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 5.1,
        isAvailable: true,
        lastUpdated: new Date('2024-01-13'),
      },
    ],
  },
  {
    id: 'coca_cola_medium',
    name: 'Coca-Cola (Medium)',
    nameAr: 'كوكا كولا (متوسط)',
    description: 'Refreshing Coca-Cola soft drink',
    descriptionAr: 'مشروب كوكا كولا المنعش',
    category: 'Beverages',
    categoryAr: 'المشروبات',
    imageUrl: 'https://via.placeholder.com/200x150/F44336/FFFFFF?text=Coca-Cola',
    isHalal: true,
    isVegetarian: true,
    isVegan: true,
    allergens: [],
    allergensAr: [],
    nutritionalInfo: {
      calories: 150,
      protein: 0,
      carbs: 39,
      fat: 0,
      sodium: 15,
    },
    priceComparisons: [
      {
        appId: 'talabat',
        price: 1.0,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 4.0,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'deliveroo',
        price: 0.8,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 3.1,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'carriage',
        price: 1.1,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.4,
        totalPrice: 4.0,
        isAvailable: true,
        lastUpdated: new Date('2024-01-14'),
      },
      {
        appId: 'zomato',
        price: 0.9,
        currency: 'KWD',
        deliveryFee: 2.0,
        serviceFee: 0.3,
        totalPrice: 3.2,
        isAvailable: true,
        lastUpdated: new Date('2024-01-15'),
      },
      {
        appId: 'uber_eats',
        price: 1.0,
        currency: 'KWD',
        deliveryFee: 2.5,
        serviceFee: 0.5,
        totalPrice: 4.0,
        isAvailable: true,
        lastUpdated: new Date('2024-01-13'),
      },
    ],
  },
];

// Additional restaurants for comparison
export const otherRestaurants: Restaurant[] = [
  {
    id: 'kfc',
    name: 'KFC',
    nameAr: 'كنتاكي',
    cuisine: 'Fast Food',
    cuisineAr: 'وجبات سريعة',
    rating: 4.0,
    deliveryTime: '30-40 min',
    deliveryTimeAr: '30-40 دقيقة',
    deliveryFee: 2.0,
    minimumOrder: 4.0,
    logoUrl: 'https://via.placeholder.com/150x150/FF0000/FFFFFF?text=KFC',
    imageUrl: 'https://via.placeholder.com/300x200/FF0000/FFFFFF?text=KFC+Store',
    isHalal: true,
    isActive: true,
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
  },
  {
    id: 'pizza_hut',
    name: 'Pizza Hut',
    nameAr: 'بيتزا هت',
    cuisine: 'Pizza',
    cuisineAr: 'بيتزا',
    rating: 4.1,
    deliveryTime: '35-45 min',
    deliveryTimeAr: '35-45 دقيقة',
    deliveryFee: 3.0,
    minimumOrder: 6.0,
    logoUrl: 'https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=Pizza+Hut',
    imageUrl: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Pizza+Hut+Store',
    isHalal: true,
    isActive: true,
    location: {
      latitude: 29.3759,
      longitude: 47.9774,
      address: 'Kuwait City, Kuwait',
      addressAr: 'مدينة الكويت، الكويت',
    },
  },
];

// Helper functions
export const getRestaurantById = (id: string): Restaurant | undefined => {
  const allRestaurants = [mcdonaldsRestaurant, ...otherRestaurants];
  return allRestaurants.find(restaurant => restaurant.id === id);
};

export const getMenuItemById = (restaurantId: string, itemId: string): MenuItem | undefined => {
  if (restaurantId === 'mcdonalds') {
    return mcdonaldsMenuItems.find(item => item.id === itemId);
  }
  return undefined;
};

export const getFoodAppById = (id: string): FoodApp | undefined => {
  return foodApps.find(app => app.id === id);
};

export const getBestPrice = (priceComparisons: PriceComparison[]): PriceComparison | undefined => {
  const availablePrices = priceComparisons.filter(p => p.isAvailable);
  if (availablePrices.length === 0) return undefined;
  
  return availablePrices.reduce((best, current) => 
    current.totalPrice < best.totalPrice ? current : best
  );
};

export const getPriceComparisonStats = (priceComparisons: PriceComparison[]) => {
  const availablePrices = priceComparisons.filter(p => p.isAvailable);
  if (availablePrices.length === 0) return null;
  
  const prices = availablePrices.map(p => p.totalPrice);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const savings = max - min;
  
  return {
    min,
    max,
    avg: Math.round(avg * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    count: availablePrices.length,
  };
};

export const getAllRestaurants = (): Restaurant[] => {
  return [mcdonaldsRestaurant, ...otherRestaurants];
};

export const getMcDonaldsMenu = (): MenuItem[] => {
  return mcdonaldsMenuItems;
};
