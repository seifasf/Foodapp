import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  dummyRecentProducts, 
  dummyHealthTips, 
  dummyQuickActions, 
  dummyUserStats 
} from '../data/dummyData';
import { 
  getAllRestaurants, 
  getMcDonaldsMenu, 
  getPriceComparisonStats 
} from '../data/restaurantData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('المستخدم');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const quickActions = [
    {
      id: 'restaurants',
      title: 'المطاعم',
      titleAr: 'المطاعم',
      icon: 'restaurant',
      color: theme.colors.primary,
      onPress: () => {
        Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
      },
    },
    {
      id: 'price_comparison',
      title: 'مقارنة الأسعار',
      titleAr: 'مقارنة الأسعار',
      icon: 'compare',
      color: theme.colors.secondary,
      onPress: () => {
        navigation.navigate('PriceComparison');
      },
    },
    {
      id: 'submit_price',
      title: 'إرسال سعر',
      titleAr: 'إرسال سعر',
      icon: 'add-circle',
      color: theme.colors.accent,
      onPress: () => {
        navigation.navigate('EnhancedPriceSubmission');
      },
    },
    {
      id: 'leaderboard',
      title: 'قائمة المتصدرين',
      titleAr: 'قائمة المتصدرين',
      icon: 'leaderboard',
      color: theme.colors.info,
      onPress: () => {
        navigation.navigate('Leaderboard');
      },
    },
    {
      id: 'mcdonalds',
      title: 'ماكدونالدز',
      titleAr: 'ماكدونالدز',
      icon: 'fastfood',
      color: theme.colors.warning,
      onPress: () => {
        navigation.navigate('Restaurant', { restaurantId: 'mcdonalds' });
      },
    },
    {
      id: 'user_profile',
      title: 'الملف الشخصي',
      titleAr: 'الملف الشخصي',
      icon: 'person',
      color: theme.colors.success,
      onPress: () => {
        navigation.navigate('UserProfile');
      },
    },
  ];

  const restaurants = getAllRestaurants();
  const mcdonaldsMenu = getMcDonaldsMenu();
  const healthTips = dummyHealthTips;

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

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionCard}
            onPress={action.onPress}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
              <Icon name={action.icon} size={24} color={theme.colors.white} />
            </View>
            <Text style={styles.quickActionTitle}>{action.titleAr}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRestaurants = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>المطاعم الشائعة</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>عرض الكل</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => navigation.navigate('Restaurant', { restaurantId: restaurant.id })}
          >
            <Avatar.Image
              size={60}
              source={{ uri: restaurant.logoUrl }}
              style={styles.restaurantImage}
            />
            <Text style={styles.restaurantName} numberOfLines={2}>
              {restaurant.nameAr}
            </Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisineAr}</Text>
            <View style={styles.restaurantFooter}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={12} color={theme.colors.warning} />
                <Text style={styles.rating}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.deliveryTime}>{restaurant.deliveryTimeAr}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPriceComparison = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>مقارنة الأسعار - ماكدونالدز</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mcdonaldsMenu.slice(0, 3).map((item) => {
          const stats = getPriceComparisonStats(item.priceComparisons);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.priceCard}
              onPress={() => navigation.navigate('Restaurant', { restaurantId: 'mcdonalds' })}
            >
              <Avatar.Image
                size={60}
                source={{ uri: item.imageUrl }}
                style={styles.priceCardImage}
              />
              <Text style={styles.priceCardName} numberOfLines={2}>
                {item.nameAr}
              </Text>
              {stats && (
                <View style={styles.priceStats}>
                  <Text style={styles.priceRange}>
                    {stats.min} - {stats.max} د.ك
                  </Text>
                  <Text style={styles.savingsText}>
                    توفير يصل إلى {stats.savings} د.ك
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderHealthTips = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>نصائح صحية</Text>
      {healthTips.map((tip) => (
        <Card key={tip.id} style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Icon
                name={tip.type === 'hydration' ? 'local-drink' : 'eco'}
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.tipTitle}>{tip.titleAr}</Text>
            </View>
            <Text style={styles.tipContent}>{tip.contentAr}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>إحصائياتك</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="qr-code-scanner" size={24} color={theme.colors.primary} />
              <Text style={styles.statNumber}>{dummyUserStats.scannedProducts}</Text>
              <Text style={styles.statLabel}>منتج مسح</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="trending-up" size={24} color={theme.colors.secondary} />
              <Text style={styles.statNumber}>{dummyUserStats.addedPrices}</Text>
              <Text style={styles.statLabel}>سعر أضيف</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="favorite" size={24} color={theme.colors.accent} />
              <Text style={styles.statNumber}>{dummyUserStats.favorites}</Text>
              <Text style={styles.statLabel}>مفضل</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Icon name="star" size={24} color={theme.colors.warning} />
              <Text style={styles.statNumber}>{dummyUserStats.avgHealthScore}</Text>
              <Text style={styles.statLabel}>متوسط الصحة</Text>
            </Card.Content>
          </Card>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>مرحباً، {userName}</Text>
            <Text style={styles.subGreeting}>ما الذي تريد مسحه اليوم؟</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Avatar.Icon
              size={40}
              icon="person"
              style={{ backgroundColor: theme.colors.primary }}
            />
          </TouchableOpacity>
        </View>

        {renderQuickActions()}
        {renderStats()}
        {renderRestaurants()}
        {renderPriceComparison()}
        {renderHealthTips()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  greeting: {
    ...typography.h3,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  subGreeting: {
    ...typography.body1,
    color: theme.colors.white,
    opacity: 0.9,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  seeAllText: {
    ...typography.body2,
    color: theme.colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  quickActionTitle: {
    ...typography.body2,
    color: theme.colors.text,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  statContent: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  statNumber: {
    ...typography.h2,
    color: theme.colors.primary,
    marginVertical: theme.spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  restaurantCard: {
    width: 140,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  restaurantImage: {
    marginBottom: theme.spacing.sm,
  },
  restaurantName: {
    ...typography.body2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  restaurantCuisine: {
    ...typography.caption,
    color: theme.colors.gray,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...typography.caption,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  deliveryTime: {
    ...typography.caption,
    color: theme.colors.gray,
  },
  priceCard: {
    width: 140,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  priceCardImage: {
    marginBottom: theme.spacing.sm,
  },
  priceCardName: {
    ...typography.body2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  priceStats: {
    alignItems: 'center',
  },
  priceRange: {
    ...typography.body2,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  savingsText: {
    ...typography.caption,
    color: theme.colors.success,
    textAlign: 'center',
  },
  tipCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  tipTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  tipContent: {
    ...typography.body2,
    color: theme.colors.text,
    lineHeight: 20,
  },
});

export default HomeScreen;
