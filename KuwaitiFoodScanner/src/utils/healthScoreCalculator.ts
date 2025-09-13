import { NutritionalFacts, HealthScore, HealthScoreFactor } from '../types';

export const calculateHealthScore = (nutritionalFacts: NutritionalFacts): HealthScore => {
  const factors: HealthScoreFactor[] = [];
  let totalScore = 0;
  let totalWeight = 0;

  // Sugar content analysis
  const sugarScore = calculateSugarScore(nutritionalFacts.sugars, nutritionalFacts.totalCarbohydrates);
  factors.push({
    id: 'sugar',
    name: 'Sugar Content',
    nameAr: 'محتوى السكر',
    impact: sugarScore.impact,
    weight: 0.25,
    description: sugarScore.description,
    descriptionAr: sugarScore.descriptionAr,
  });
  totalScore += sugarScore.score * 0.25;
  totalWeight += 0.25;

  // Sodium content analysis
  const sodiumScore = calculateSodiumScore(nutritionalFacts.sodium);
  factors.push({
    id: 'sodium',
    name: 'Sodium Content',
    nameAr: 'محتوى الصوديوم',
    impact: sodiumScore.impact,
    weight: 0.2,
    description: sodiumScore.description,
    descriptionAr: sodiumScore.descriptionAr,
  });
  totalScore += sodiumScore.score * 0.2;
  totalWeight += 0.2;

  // Fat content analysis
  const fatScore = calculateFatScore(nutritionalFacts.totalFat, nutritionalFacts.saturatedFat);
  factors.push({
    id: 'fat',
    name: 'Fat Content',
    nameAr: 'محتوى الدهون',
    impact: fatScore.impact,
    weight: 0.2,
    description: fatScore.description,
    descriptionAr: fatScore.descriptionAr,
  });
  totalScore += fatScore.score * 0.2;
  totalWeight += 0.2;

  // Protein content analysis
  const proteinScore = calculateProteinScore(nutritionalFacts.protein);
  factors.push({
    id: 'protein',
    name: 'Protein Content',
    nameAr: 'محتوى البروتين',
    impact: proteinScore.impact,
    weight: 0.15,
    description: proteinScore.description,
    descriptionAr: proteinScore.descriptionAr,
  });
  totalScore += proteinScore.score * 0.15;
  totalWeight += 0.15;

  // Fiber content analysis
  const fiberScore = calculateFiberScore(nutritionalFacts.dietaryFiber, nutritionalFacts.totalCarbohydrates);
  factors.push({
    id: 'fiber',
    name: 'Fiber Content',
    nameAr: 'محتوى الألياف',
    impact: fiberScore.impact,
    weight: 0.1,
    description: fiberScore.description,
    descriptionAr: fiberScore.descriptionAr,
  });
  totalScore += fiberScore.score * 0.1;
  totalWeight += 0.1;

  // Vitamin content analysis
  const vitaminScore = calculateVitaminScore(nutritionalFacts.vitaminA, nutritionalFacts.vitaminC);
  factors.push({
    id: 'vitamins',
    name: 'Vitamin Content',
    nameAr: 'محتوى الفيتامينات',
    impact: vitaminScore.impact,
    weight: 0.1,
    description: vitaminScore.description,
    descriptionAr: vitaminScore.descriptionAr,
  });
  totalScore += vitaminScore.score * 0.1;
  totalWeight += 0.1;

  const finalScore = Math.round(totalScore / totalWeight);
  const score = getScoreLetter(finalScore);

  return {
    score,
    value: finalScore,
    factors,
  };
};

const calculateSugarScore = (sugars: number, totalCarbs: number) => {
  const sugarPercentage = (sugars / totalCarbs) * 100;
  
  if (sugarPercentage < 10) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'Low sugar content',
      descriptionAr: 'محتوى سكر منخفض',
    };
  } else if (sugarPercentage < 20) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Moderate sugar content',
      descriptionAr: 'محتوى سكر معتدل',
    };
  } else if (sugarPercentage < 30) {
    return {
      score: 50,
      impact: 'negative' as const,
      description: 'High sugar content',
      descriptionAr: 'محتوى سكر عالي',
    };
  } else {
    return {
      score: 20,
      impact: 'negative' as const,
      description: 'Very high sugar content',
      descriptionAr: 'محتوى سكر عالي جداً',
    };
  }
};

const calculateSodiumScore = (sodium: number) => {
  if (sodium < 140) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'Low sodium content',
      descriptionAr: 'محتوى صوديوم منخفض',
    };
  } else if (sodium < 400) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Moderate sodium content',
      descriptionAr: 'محتوى صوديوم معتدل',
    };
  } else if (sodium < 600) {
    return {
      score: 50,
      impact: 'negative' as const,
      description: 'High sodium content',
      descriptionAr: 'محتوى صوديوم عالي',
    };
  } else {
    return {
      score: 20,
      impact: 'negative' as const,
      description: 'Very high sodium content',
      descriptionAr: 'محتوى صوديوم عالي جداً',
    };
  }
};

const calculateFatScore = (totalFat: number, saturatedFat: number) => {
  const saturatedFatPercentage = (saturatedFat / totalFat) * 100;
  
  if (totalFat < 3 && saturatedFatPercentage < 30) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'Low and healthy fat content',
      descriptionAr: 'محتوى دهون منخفض وصحي',
    };
  } else if (totalFat < 10 && saturatedFatPercentage < 40) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Moderate fat content',
      descriptionAr: 'محتوى دهون معتدل',
    };
  } else if (totalFat < 20 && saturatedFatPercentage < 50) {
    return {
      score: 50,
      impact: 'negative' as const,
      description: 'High fat content',
      descriptionAr: 'محتوى دهون عالي',
    };
  } else {
    return {
      score: 20,
      impact: 'negative' as const,
      description: 'Very high fat content',
      descriptionAr: 'محتوى دهون عالي جداً',
    };
  }
};

const calculateProteinScore = (protein: number) => {
  if (protein > 15) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'High protein content',
      descriptionAr: 'محتوى بروتين عالي',
    };
  } else if (protein > 10) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Good protein content',
      descriptionAr: 'محتوى بروتين جيد',
    };
  } else if (protein > 5) {
    return {
      score: 50,
      impact: 'neutral' as const,
      description: 'Moderate protein content',
      descriptionAr: 'محتوى بروتين معتدل',
    };
  } else {
    return {
      score: 30,
      impact: 'negative' as const,
      description: 'Low protein content',
      descriptionAr: 'محتوى بروتين منخفض',
    };
  }
};

const calculateFiberScore = (fiber: number, totalCarbs: number) => {
  const fiberPercentage = (fiber / totalCarbs) * 100;
  
  if (fiberPercentage > 20) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'High fiber content',
      descriptionAr: 'محتوى ألياف عالي',
    };
  } else if (fiberPercentage > 10) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Good fiber content',
      descriptionAr: 'محتوى ألياف جيد',
    };
  } else if (fiberPercentage > 5) {
    return {
      score: 50,
      impact: 'neutral' as const,
      description: 'Moderate fiber content',
      descriptionAr: 'محتوى ألياف معتدل',
    };
  } else {
    return {
      score: 30,
      impact: 'negative' as const,
      description: 'Low fiber content',
      descriptionAr: 'محتوى ألياف منخفض',
    };
  }
};

const calculateVitaminScore = (vitaminA?: number, vitaminC?: number) => {
  const vitaminScore = ((vitaminA || 0) + (vitaminC || 0)) / 2;
  
  if (vitaminScore > 15) {
    return {
      score: 90,
      impact: 'positive' as const,
      description: 'High vitamin content',
      descriptionAr: 'محتوى فيتامينات عالي',
    };
  } else if (vitaminScore > 10) {
    return {
      score: 70,
      impact: 'positive' as const,
      description: 'Good vitamin content',
      descriptionAr: 'محتوى فيتامينات جيد',
    };
  } else if (vitaminScore > 5) {
    return {
      score: 50,
      impact: 'neutral' as const,
      description: 'Moderate vitamin content',
      descriptionAr: 'محتوى فيتامينات معتدل',
    };
  } else {
    return {
      score: 30,
      impact: 'negative' as const,
      description: 'Low vitamin content',
      descriptionAr: 'محتوى فيتامينات منخفض',
    };
  }
};

const getScoreLetter = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'E';
};

export const getHealthScoreColor = (score: string) => {
  switch (score) {
    case 'A': return '#4CAF50';
    case 'B': return '#8BC34A';
    case 'C': return '#FFC107';
    case 'D': return '#FF9800';
    case 'E': return '#F44336';
    default: return '#757575';
  }
};

export const getHealthScoreDescription = (score: string) => {
  switch (score) {
    case 'A': return { en: 'Excellent', ar: 'ممتاز' };
    case 'B': return { en: 'Good', ar: 'جيد' };
    case 'C': return { en: 'Fair', ar: 'مقبول' };
    case 'D': return { en: 'Poor', ar: 'ضعيف' };
    case 'E': return { en: 'Very Poor', ar: 'ضعيف جداً' };
    default: return { en: 'Unknown', ar: 'غير معروف' };
  }
};
