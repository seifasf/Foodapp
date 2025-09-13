import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, PriceComparisonResult, DELIVERY_APPS } from '../types';
import { theme, typography } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../contexts/CartContext';

type PriceComparisonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PriceComparison'>;
type PriceComparisonScreenRouteProp = RouteProp<RootStackParamList, 'PriceComparison'>;

const PriceComparisonScreen: React.FC = () => {
  const navigation = useNavigation<PriceComparisonScreenNavigationProp>();
  const route = useRoute<PriceComparisonScreenRouteProp>();
  const { state: cartState } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  const [priceComparisons, setPriceComparisons] = useState<PriceComparisonResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriceComparisons();
  }, []);

  const loadPriceComparisons = async () => {
    try {
      setLoading(true);
      // Simulate API call - in real app, this would fetch actual price data
      const mockComparisons: PriceComparisonResult[] = [
        {
          appId: 'talabat',
          appName: 'Talabat',
          appNameAr: 'طلبات',
          totalPrice: 12.50,
          deliveryFee: 1.50,
          serviceFee: 0.75,
          estimatedTotal: 14.75,
          isAvailable: true,
          lastUpdated: new Date(),
          savings: 2.25,
          discount: 13,
        },
        {
          appId: 'jahez',
          appName: 'Jahez',
          appNameAr: 'جاهز',
          totalPrice: 13.00,
          deliveryFee: 1.00,
          serviceFee: 0.65,
          estimatedTotal: 14.65,
          isAvailable: true,
          lastUpdated: new Date(),
          savings: 2.35,
          discount: 14,
        },
        {
          appId: 'deliveroo',
          appName: 'Deliveroo',
          appNameAr: 'دليفرو',
          totalPrice: 14.25,
          deliveryFee: 2.00,
          serviceFee: 1.00,
          estimatedTotal: 17.25,
          isAvailable: true,
          lastUpdated: new Date(),
          savings: 0,
          discount: 0,
        },
        {
          appId: 'carriage',
          appName: 'Carriage',
          appNameAr: 'كريج',
          totalPrice: 15.00,
          deliveryFee: 1.25,
          serviceFee: 0.50,
          estimatedTotal: 16.75,
          isAvailable: false,
          lastUpdated: new Date(),
          savings: 0,
          discount: 0,
        },
        {
          appId: 'zomato',
          appName: 'Zomato',
          appNameAr: 'زوماتو',
          totalPrice: 13.75,
          deliveryFee: 1.75,
          serviceFee: 0.85,
          estimatedTotal: 16.35,
          isAvailable: true,
          lastUpdated: new Date(),
          savings: 0.75,
          discount: 4,
        },
      ];

      // Sort by total price (lowest first)
      const sortedComparisons = mockComparisons
        .filter(comp => comp.isAvailable)
        .sort((a, b) => a.estimatedTotal - b.estimatedTotal);

      setPriceComparisons(sortedComparisons);
    } catch (error) {
      console.error('Error loading price comparisons:', error);
      Alert.alert('خطأ', 'فشل في تحميل مقارنة الأسعار');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadPriceComparisons().finally(() => setRefreshing(false));
  }, []);

  const handleOrderNow = (appId: string) => {
    Alert.alert(
      'طلب الآن',
      `سيتم توجيهك إلى تطبيق ${DELIVERY_APPS.find(app => app.id === appId)?.nameAr}`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'متابعة', onPress: () => {
          // In real app, this would open the delivery app
          Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
        }},
      ]
    );
  };

  const handleSubmitPrice = (appId: string) => {
    navigation.navigate('PriceSubmission', { 
      menuItemId: 'sample', 
      restaurantId: cartState.restaurantId || 'sample' 
    });
  };

  const renderPriceComparison = (comparison: PriceComparisonResult, index: number) => {
    const isBestPrice = index === 0;
    const app = DELIVERY_APPS.find(app => app.id === comparison.appId);

    return (
      <Card 
        key={comparison.appId} 
        style={[
          styles.comparisonCard,
          isBestPrice && styles.bestPriceCard
        ]}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.appInfo}>
              <View style={styles.appLogo}>
                <Text style={styles.appLogoText}>
                  {app?.name.charAt(0) || '?'}
                </Text>
              </View>
              <View style={styles.appDetails}>
                <Text style={styles.appName}>{comparison.appNameAr}</Text>
                <Text style={styles.appSubtitle}>{comparison.appName}</Text>
              </View>
            </View>
            {isBestPrice && (
              <Chip style={styles.bestPriceChip} textStyle={styles.bestPriceText}>
                أفضل سعر
              </Chip>
            )}
          </View>

          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>سعر الطعام:</Text>
              <Text style={styles.priceValue}>{comparison.totalPrice.toFixed(2)} د.ك</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>رسوم التوصيل:</Text>
              <Text style={styles.priceValue}>{comparison.deliveryFee.toFixed(2)} د.ك</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>رسوم الخدمة:</Text>
              <Text style={styles.priceValue}>{comparison.serviceFee.toFixed(2)} د.ك</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>المجموع الكلي:</Text>
              <Text style={styles.totalValue}>{comparison.estimatedTotal.toFixed(2)} د.ك</Text>
            </View>
          </View>

          {comparison.savings && comparison.savings > 0 && (
            <View style={styles.savingsContainer}>
              <Icon name="savings" size={16} color={theme.colors.success} />
              <Text style={styles.savingsText}>
                توفير {comparison.savings.toFixed(2)} د.ك ({comparison.discount}%)
              </Text>
            </View>
          )}

          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>
              آخر تحديث: {comparison.lastUpdated.toLocaleDateString('ar-KW')}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => handleSubmitPrice(comparison.appId)}
              style={styles.submitPriceButton}
              icon="edit"
            >
              تحديث السعر
            </Button>
            <Button
              mode="contained"
              onPress={() => handleOrderNow(comparison.appId)}
              style={styles.orderButton}
              icon="shopping-cart"
            >
              طلب الآن
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="trending-up" size={64} color={theme.colors.gray} />
      <Text style={styles.emptyTitle}>لا توجد مقارنات متاحة</Text>
      <Text style={styles.emptySubtitle}>
        لا توجد أسعار متاحة للمقارنة حالياً
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.emptyButton}
      >
        العودة للسلة
      </Button>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color={theme.colors.white} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>مقارنة الأسعار</Text>
        <Text style={styles.headerSubtitle}>
          {cartState.totalItems} عنصر • {cartState.restaurantId ? 'مطعم واحد' : 'متعدد المطاعم'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={onRefresh}
      >
        <Icon name="refresh" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>جاري تحميل مقارنة الأسعار...</Text>
          </View>
        ) : priceComparisons.length > 0 ? (
          <>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>ملخص المقارنة</Text>
              <Text style={styles.summaryText}>
                تم العثور على {priceComparisons.length} تطبيق توصيل متاح
              </Text>
              <Text style={styles.summaryText}>
                أفضل سعر: {priceComparisons[0]?.estimatedTotal.toFixed(2)} د.ك
              </Text>
            </View>
            
            {priceComparisons.map(renderPriceComparison)}
          </>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h3,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    ...typography.body2,
    color: theme.colors.white,
    opacity: 0.9,
  },
  refreshButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    ...typography.body1,
    color: theme.colors.gray,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  summaryTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  summaryText: {
    ...typography.body2,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  comparisonCard: {
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  bestPriceCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  appLogoText: {
    ...typography.h4,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  appSubtitle: {
    ...typography.caption,
    color: theme.colors.gray,
  },
  bestPriceChip: {
    backgroundColor: theme.colors.success,
  },
  bestPriceText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceBreakdown: {
    marginBottom: theme.spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  priceLabel: {
    ...typography.body2,
    color: theme.colors.text,
  },
  priceValue: {
    ...typography.body2,
    color: theme.colors.text,
    fontWeight: '500',
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.h4,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  totalValue: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  savingsText: {
    ...typography.body2,
    color: theme.colors.success,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  lastUpdated: {
    marginBottom: theme.spacing.md,
  },
  lastUpdatedText: {
    ...typography.caption,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitPriceButton: {
    flex: 0.48,
  },
  orderButton: {
    flex: 0.48,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    ...typography.body1,
    color: theme.colors.gray,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    marginTop: theme.spacing.md,
  },
});

export default PriceComparisonScreen;
