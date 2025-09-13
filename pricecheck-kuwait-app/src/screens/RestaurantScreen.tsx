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
import { RootStackParamList, Restaurant, MenuItem, PriceComparison, FoodApp } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  getRestaurantById, 
  getMcDonaldsMenu, 
  getFoodAppById, 
  getBestPrice, 
  getPriceComparisonStats 
} from '../data/restaurantData';

type RestaurantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Restaurant'>;
type RestaurantScreenRouteProp = RouteProp<RootStackParamList, 'Restaurant'>;

const { width } = Dimensions.get('window');

const RestaurantScreen: React.FC = () => {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  const route = useRoute<RestaurantScreenRouteProp>();
  const { restaurantId } = route.params;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadRestaurantData();
  }, [restaurantId]);

  const loadRestaurantData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundRestaurant = getRestaurantById(restaurantId);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        // For now, we'll use McDonald's menu as example
        setMenuItems(getMcDonaldsMenu());
      } else {
        Alert.alert('خطأ', 'لم يتم العثور على المطعم');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
      Alert.alert('خطأ', 'فشل في تحميل معلومات المطعم');
    } finally {
      setLoading(false);
    }
  };

  const getCategories = () => {
    const categories = ['all', ...new Set(menuItems.map(item => item.category))];
    return categories;
  };

  const getFilteredMenuItems = () => {
    if (selectedCategory === 'all') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  };

  const getAppName = (appId: string): string => {
    const app = getFoodAppById(appId);
    return app ? app.nameAr : appId;
  };

  const getAppLogo = (appId: string): string => {
    const app = getFoodAppById(appId);
    return app ? app.logoUrl : '';
  };

  const renderRestaurantHeader = () => (
    <View style={styles.header}>
      <Avatar.Image
        size={100}
        source={{ uri: restaurant?.logoUrl }}
        style={styles.restaurantLogo}
      />
      <View style={styles.headerInfo}>
        <Text style={styles.restaurantName}>{restaurant?.nameAr}</Text>
        <Text style={styles.cuisine}>{restaurant?.cuisineAr}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={theme.colors.warning} />
          <Text style={styles.rating}>{restaurant?.rating}</Text>
          <Text style={styles.deliveryTime}>{restaurant?.deliveryTimeAr}</Text>
        </View>
        <View style={styles.badges}>
          {restaurant?.isHalal && (
            <Chip style={styles.halalChip} textStyle={styles.halalText}>
              حلال
            </Chip>
          )}
          <Chip style={styles.deliveryChip} textStyle={styles.deliveryText}>
            رسوم التوصيل: {restaurant?.deliveryFee} د.ك
          </Chip>
        </View>
      </View>
    </View>
  );

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
    >
      {getCategories().map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.categoryTextActive
          ]}>
            {category === 'all' ? 'الكل' : 
             category === 'Burgers' ? 'البرجر' :
             category === 'Chicken' ? 'الدجاج' :
             category === 'Sides' ? 'الأطباق الجانبية' :
             category === 'Desserts' ? 'الحلويات' :
             category === 'Beverages' ? 'المشروبات' : category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMenuItem = (item: MenuItem) => {
    const bestPrice = getBestPrice(item.priceComparisons);
    const stats = getPriceComparisonStats(item.priceComparisons);
    const availableApps = item.priceComparisons.filter(p => p.isAvailable);

    return (
      <Card key={item.id} style={styles.menuItemCard}>
        <Card.Content>
          <View style={styles.menuItemHeader}>
            <Avatar.Image
              size={80}
              source={{ uri: item.imageUrl }}
              style={styles.menuItemImage}
            />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.nameAr}</Text>
              <Text style={styles.menuItemDescription} numberOfLines={2}>
                {item.descriptionAr}
              </Text>
              <View style={styles.menuItemBadges}>
                {item.isHalal && (
                  <Chip style={styles.halalChip} textStyle={styles.halalText}>
                    حلال
                  </Chip>
                )}
                {item.isVegetarian && (
                  <Chip style={styles.vegetarianChip} textStyle={styles.vegetarianText}>
                    نباتي
                  </Chip>
                )}
              </View>
            </View>
          </View>

          <View style={styles.priceComparisonSection}>
            <View style={styles.priceHeader}>
              <Text style={styles.priceTitle}>مقارنة الأسعار</Text>
              {stats && (
                <Text style={styles.priceStats}>
                  توفير يصل إلى {stats.savings} د.ك
                </Text>
              )}
            </View>

            <View style={styles.priceGrid}>
              {availableApps.map((price) => (
                <TouchableOpacity
                  key={price.appId}
                  style={[
                    styles.priceCard,
                    bestPrice?.appId === price.appId && styles.bestPriceCard
                  ]}
                  onPress={() => {
                    Alert.alert(
                      'فتح التطبيق',
                      `سيتم فتح ${getAppName(price.appId)}`,
                      [{ text: 'موافق' }]
                    );
                  }}
                >
                  <Avatar.Image
                    size={30}
                    source={{ uri: getAppLogo(price.appId) }}
                    style={styles.appLogo}
                  />
                  <Text style={styles.appName}>{getAppName(price.appId)}</Text>
                  <Text style={[
                    styles.totalPrice,
                    bestPrice?.appId === price.appId && styles.bestPriceText
                  ]}>
                    {price.totalPrice} د.ك
                  </Text>
                  <Text style={styles.priceBreakdown}>
                    {price.price} + {price.deliveryFee} + {price.serviceFee}
                  </Text>
                  {bestPrice?.appId === price.appId && (
                    <View style={styles.bestPriceBadge}>
                      <Text style={styles.bestPriceBadgeText}>أفضل سعر</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.nutritionalInfo}>
            <Text style={styles.nutritionalTitle}>المعلومات الغذائية</Text>
            <View style={styles.nutritionalGrid}>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalLabel}>السعرات</Text>
                <Text style={styles.nutritionalValue}>{item.nutritionalInfo.calories}</Text>
              </View>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalLabel}>البروتين</Text>
                <Text style={styles.nutritionalValue}>{item.nutritionalInfo.protein}غ</Text>
              </View>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalLabel}>الكربوهيدرات</Text>
                <Text style={styles.nutritionalValue}>{item.nutritionalInfo.carbs}غ</Text>
              </View>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalLabel}>الدهون</Text>
                <Text style={styles.nutritionalValue}>{item.nutritionalInfo.fat}غ</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Icon name="restaurant" size={48} color={theme.colors.primary} />
          <Text style={styles.loadingText}>جاري تحميل معلومات المطعم...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>لم يتم العثور على المطعم</Text>
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
        {renderRestaurantHeader()}
        {renderCategoryFilter()}
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>قائمة الطعام</Text>
          {getFilteredMenuItems().map(renderMenuItem)}
        </View>
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
  restaurantLogo: {
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  restaurantName: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cuisine: {
    ...typography.body1,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  rating: {
    ...typography.body2,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },
  deliveryTime: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  halalChip: {
    backgroundColor: theme.colors.halal,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  halalText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deliveryChip: {
    backgroundColor: theme.colors.lightGray,
    marginBottom: theme.spacing.xs,
  },
  deliveryText: {
    color: theme.colors.text,
    fontSize: 12,
  },
  categoryFilter: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.lightGray,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    ...typography.body2,
    color: theme.colors.text,
  },
  categoryTextActive: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  menuSection: {
    padding: theme.spacing.lg,
  },
  menuTitle: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  menuItemCard: {
    marginBottom: theme.spacing.md,
  },
  menuItemHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  menuItemImage: {
    marginRight: theme.spacing.md,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  menuItemDescription: {
    ...typography.body2,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  menuItemBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vegetarianChip: {
    backgroundColor: theme.colors.success,
    marginRight: theme.spacing.sm,
  },
  vegetarianText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceComparisonSection: {
    marginBottom: theme.spacing.md,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  priceTitle: {
    ...typography.h4,
    color: theme.colors.text,
  },
  priceStats: {
    ...typography.body2,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priceCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    position: 'relative',
  },
  bestPriceCard: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success + '10',
  },
  appLogo: {
    marginBottom: theme.spacing.xs,
  },
  appName: {
    ...typography.caption,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  totalPrice: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  bestPriceText: {
    color: theme.colors.success,
  },
  priceBreakdown: {
    ...typography.caption,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  bestPriceBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: theme.colors.success,
  },
  bestPriceBadgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  nutritionalInfo: {
    marginTop: theme.spacing.md,
  },
  nutritionalTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  nutritionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionalItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  nutritionalLabel: {
    ...typography.body2,
    color: theme.colors.text,
  },
  nutritionalValue: {
    ...typography.body2,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
