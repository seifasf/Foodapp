import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Avatar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product, NutritionalFacts, HealthScore, HalalStatus } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getProductById, getPricesForProduct } from '../data/dummyData';

type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;
type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

const { width } = Dimensions.get('window');

const ProductScreen: React.FC = () => {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const route = useRoute<ProductScreenRouteProp>();
  const { productId, barcode } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get product from dummy data
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // If not found, create a generic product
        const genericProduct: Product = {
          id: productId,
          barcode: barcode || '0000000000000',
          name: 'Unknown Product',
          nameAr: 'منتج غير معروف',
          brand: 'Unknown',
          brandAr: 'غير معروف',
          category: {
            id: 'unknown',
            name: 'Unknown',
            nameAr: 'غير معروف',
          },
          nutritionalFacts: {
            servingSize: '1 serving',
            servingSizeAr: 'حصة واحدة',
            calories: 0,
            totalFat: 0,
            saturatedFat: 0,
            transFat: 0,
            cholesterol: 0,
            sodium: 0,
            totalCarbohydrates: 0,
            dietaryFiber: 0,
            sugars: 0,
            protein: 0,
          },
          ingredients: ['Unknown'],
          ingredientsAr: ['غير معروف'],
          allergens: [],
          allergensAr: [],
          halalStatus: 'unknown',
          healthScore: {
            score: 'E',
            value: 0,
            factors: [],
          },
          imageUrl: 'https://via.placeholder.com/300x300/757575/FFFFFF?text=Unknown',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setProduct(genericProduct);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('خطأ', 'فشل في تحميل معلومات المنتج');
    } finally {
      setLoading(false);
    }
  };

  const getHealthScoreColor = (score: string) => {
    switch (score) {
      case 'A': return theme.colors.healthScoreA;
      case 'B': return theme.colors.healthScoreB;
      case 'C': return theme.colors.healthScoreC;
      case 'D': return theme.colors.healthScoreD;
      case 'E': return theme.colors.healthScoreE;
      default: return theme.colors.gray;
    }
  };

  const getHalalStatusColor = (status: HalalStatus) => {
    switch (status) {
      case 'halal': return theme.colors.halal;
      case 'haram': return theme.colors.haram;
      case 'unknown': return theme.colors.unknown;
      case 'doubtful': return theme.colors.warning;
      default: return theme.colors.gray;
    }
  };

  const getHalalStatusText = (status: HalalStatus) => {
    switch (status) {
      case 'halal': return 'حلال';
      case 'haram': return 'حرام';
      case 'unknown': return 'غير معروف';
      case 'doubtful': return 'مشكوك فيه';
      default: return 'غير محدد';
    }
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // In a real app, this would save to user's favorites
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Avatar.Image
        size={120}
        source={{ uri: product?.imageUrl }}
        style={styles.productImage}
      />
      <View style={styles.headerInfo}>
        <Text style={styles.productName}>{product?.nameAr}</Text>
        <Text style={styles.productBrand}>{product?.brandAr}</Text>
        <View style={styles.headerChips}>
          <Chip
            style={[
              styles.healthScoreChip,
              { backgroundColor: getHealthScoreColor(product?.healthScore.score || 'C') }
            ]}
            textStyle={styles.healthScoreText}
          >
            {product?.healthScore.score} ({product?.healthScore.value}/100)
          </Chip>
          <Chip
            style={[
              styles.halalChip,
              { backgroundColor: getHalalStatusColor(product?.halalStatus || 'unknown') }
            ]}
            textStyle={styles.halalText}
          >
            {getHalalStatusText(product?.halalStatus || 'unknown')}
          </Chip>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon
          name={favorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={favorite ? theme.colors.accent : theme.colors.gray}
        />
      </TouchableOpacity>
    </View>
  );

  const renderNutritionalFacts = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>المعلومات الغذائية</Title>
        <Text style={styles.servingSize}>
          حجم الحصة: {product?.nutritionalFacts.servingSizeAr}
        </Text>
        
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>السعرات الحرارية</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.calories}</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الدهون الكلية</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.totalFat}غ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الدهون المشبعة</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.saturatedFat}غ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الكوليسترول</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.cholesterol}ملغ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الصوديوم</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.sodium}ملغ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الكربوهيدرات</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.totalCarbohydrates}غ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>الألياف</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.dietaryFiber}غ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>السكريات</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.sugars}غ</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>البروتين</Text>
            <Text style={styles.nutritionValue}>{product?.nutritionalFacts.protein}غ</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderIngredients = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>المكونات</Title>
        <View style={styles.ingredientsList}>
          {product?.ingredientsAr.map((ingredient, index) => (
            <Chip
              key={index}
              style={styles.ingredientChip}
              textStyle={styles.ingredientText}
            >
              {ingredient}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  const renderAllergens = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>مسببات الحساسية</Title>
        <View style={styles.allergensList}>
          {product?.allergensAr.map((allergen, index) => (
            <Chip
              key={index}
              style={[styles.allergenChip, { backgroundColor: theme.colors.error }]}
              textStyle={styles.allergenText}
            >
              {allergen}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  const renderHealthScoreDetails = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>تفاصيل التقييم الصحي</Title>
        <View style={styles.healthScoreContainer}>
          <View style={styles.healthScoreCircle}>
            <Text style={styles.healthScoreNumber}>{product?.healthScore.value}</Text>
            <Text style={styles.healthScoreLabel}>من 100</Text>
          </View>
          <View style={styles.healthScoreFactors}>
            {product?.healthScore.factors.map((factor, index) => (
              <View key={index} style={styles.factorItem}>
                <Icon
                  name={factor.impact === 'positive' ? 'check-circle' : 'cancel'}
                  size={16}
                  color={factor.impact === 'positive' ? theme.colors.success : theme.colors.error}
                />
                <Text style={styles.factorText}>{factor.nameAr}</Text>
              </View>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderPricingSection = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>الأسعار</Title>
        <View style={styles.pricingActions}>
          <Button
            mode="contained"
            onPress={() => {
              // Navigate to pricing screen
              Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
            }}
            style={styles.pricingButton}
          >
            عرض الأسعار
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              // Add price
              Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
            }}
            style={styles.addPriceButton}
          >
            إضافة سعر
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Icon name="refresh" size={48} color={theme.colors.primary} />
          <Text style={styles.loadingText}>جاري تحميل معلومات المنتج...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>لم يتم العثور على المنتج</Text>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.retryButton}
          >
            العودة
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {renderHeader()}
        {renderNutritionalFacts()}
        {renderHealthScoreDetails()}
        {renderIngredients()}
        {renderAllergens()}
        {renderPricingSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  loadingText: {
    ...typography.body1,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    ...typography.h3,
    color: theme.colors.error,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  retryButton: {
    marginTop: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'flex-start',
  },
  productImage: {
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  productName: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  productBrand: {
    ...typography.body1,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  headerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  healthScoreChip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  healthScoreText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  halalChip: {
    marginBottom: theme.spacing.xs,
  },
  halalText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: theme.spacing.sm,
  },
  section: {
    margin: theme.spacing.md,
    marginTop: 0,
  },
  sectionTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  servingSize: {
    ...typography.body2,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
    fontStyle: 'italic',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  nutritionLabel: {
    ...typography.body2,
    color: theme.colors.text,
    flex: 1,
  },
  nutritionValue: {
    ...typography.body2,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientChip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.lightGray,
  },
  ingredientText: {
    color: theme.colors.text,
  },
  allergensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenChip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  allergenText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthScoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  healthScoreNumber: {
    ...typography.h2,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  healthScoreLabel: {
    ...typography.caption,
    color: theme.colors.white,
  },
  healthScoreFactors: {
    flex: 1,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  factorText: {
    ...typography.body2,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  pricingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pricingButton: {
    flex: 0.48,
  },
  addPriceButton: {
    flex: 0.48,
  },
});

export default ProductScreen;
