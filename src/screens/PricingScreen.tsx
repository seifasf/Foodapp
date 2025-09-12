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
import { Card, Title, Paragraph, Button, Chip, TextInput, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, PriceSubmission, Store, Product } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { dummyPriceSubmissions, dummyStores, getStoreById } from '../data/dummyData';

type PricingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const PricingScreen: React.FC = () => {
  const navigation = useNavigation<PricingScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [priceSubmissions, setPriceSubmissions] = useState<PriceSubmission[]>([]);
  const [showAddPriceModal, setShowAddPriceModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [price, setPrice] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'date' | 'store'>('price');

  useEffect(() => {
    loadPriceSubmissions();
  }, []);

  const loadPriceSubmissions = async () => {
    try {
      // Use dummy data
      setPriceSubmissions(dummyPriceSubmissions);
    } catch (error) {
      console.error('Error loading price submissions:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadPriceSubmissions().finally(() => setRefreshing(false));
  }, []);

  const handleAddPrice = () => {
    setShowAddPriceModal(true);
  };

  const handleSubmitPrice = () => {
    if (!selectedProduct || !selectedStore || !price) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    // In a real app, this would submit to API
    Alert.alert('تم', 'تم إضافة السعر بنجاح');
    setShowAddPriceModal(false);
    setSelectedProduct(null);
    setSelectedStore(null);
    setPrice('');
  };

  const getStoreName = (storeId: string) => {
    const store = getStoreById(storeId);
    return store ? store.nameAr : storeId;
  };

  const getProductName = (productId: string) => {
    // This would normally come from product data
    const products: { [key: string]: string } = {
      '1': 'حليب المراعي كامل الدسم',
      '2': 'خبز التوست صن بيك',
      '3': 'جبنة كرافت',
      '4': 'كوكا كولا الكلاسيكية',
      '5': 'موز طازج',
    };
    return products[productId] || 'منتج غير معروف';
  };

  const sortSubmissions = (submissions: PriceSubmission[]) => {
    return [...submissions].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'date':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'store':
          return getStoreName(a.storeId).localeCompare(getStoreName(b.storeId));
        default:
          return 0;
      }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>مقارنة الأسعار</Text>
        <Text style={styles.headerSubtitle}>اعثر على أفضل الأسعار للمنتجات</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPrice}
      >
        <Icon name="add" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>ترتيب حسب:</Text>
      <View style={styles.sortButtons}>
        {[
          { key: 'price', label: 'السعر' },
          { key: 'date', label: 'التاريخ' },
          { key: 'store', label: 'المتجر' },
        ].map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortButton,
              sortBy === option.key && styles.sortButtonActive
            ]}
            onPress={() => setSortBy(option.key as any)}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === option.key && styles.sortButtonTextActive
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPriceSubmission = (submission: PriceSubmission) => (
    <Card key={submission.id} style={styles.priceCard}>
      <Card.Content>
        <View style={styles.priceHeader}>
          <View style={styles.priceInfo}>
            <Text style={styles.productName}>{getProductName(submission.productId)}</Text>
            <Text style={styles.storeName}>{getStoreName(submission.storeId)}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{submission.price} د.ك</Text>
            <View style={styles.priceMeta}>
              <Chip
                style={[
                  styles.verifiedChip,
                  { backgroundColor: submission.verified ? theme.colors.success : theme.colors.warning }
                ]}
                textStyle={styles.verifiedText}
              >
                {submission.verified ? 'مؤكد' : 'غير مؤكد'}
              </Chip>
              <Text style={styles.trustScore}>ثقة: {submission.trustScore}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceFooter}>
          <Text style={styles.dateText}>
            {submission.createdAt.toLocaleDateString('ar-KW')}
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً')}
          >
            <Icon name="flag" size={16} color={theme.colors.error} />
            <Text style={styles.actionText}>إبلاغ</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const renderAddPriceModal = () => (
    <Portal>
      <Modal
        visible={showAddPriceModal}
        onDismiss={() => setShowAddPriceModal(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Title style={styles.modalTitle}>إضافة سعر جديد</Title>
          
          <TextInput
            label="اسم المنتج"
            value={selectedProduct?.nameAr || ''}
            style={styles.input}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="barcode-scan" />}
          />
          
          <TextInput
            label="المتجر"
            value={selectedStore?.nameAr || ''}
            style={styles.input}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="store" />}
          />
          
          <TextInput
            label="السعر (د.ك)"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            placeholder="0.00"
          />
          
          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setShowAddPriceModal(false)}
              style={styles.modalButton}
            >
              إلغاء
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmitPrice}
              style={styles.modalButton}
            >
              إضافة
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="trending-up" size={64} color={theme.colors.gray} />
      <Text style={styles.emptyTitle}>لا توجد أسعار متاحة</Text>
      <Text style={styles.emptySubtitle}>
        كن أول من يضيف سعراً للمنتجات
      </Text>
      <Button
        mode="contained"
        onPress={handleAddPrice}
        style={styles.emptyButton}
      >
        إضافة سعر
      </Button>
    </View>
  );

  const sortedSubmissions = sortSubmissions(priceSubmissions);

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSortOptions()}
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sortedSubmissions.length > 0 ? (
          sortedSubmissions.map(renderPriceSubmission)
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
      
      {renderAddPriceModal()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    ...typography.h3,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    ...typography.body1,
    color: theme.colors.white,
    opacity: 0.9,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  sortLabel: {
    ...typography.body1,
    color: theme.colors.text,
    marginRight: theme.spacing.md,
  },
  sortButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  sortButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.lightGray,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  sortButtonText: {
    ...typography.body2,
    color: theme.colors.text,
  },
  sortButtonTextActive: {
    color: theme.colors.white,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  priceCard: {
    marginBottom: theme.spacing.md,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  priceInfo: {
    flex: 1,
  },
  productName: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  storeName: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceValue: {
    ...typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  priceMeta: {
    alignItems: 'flex-end',
  },
  verifiedChip: {
    height: 24,
    marginBottom: theme.spacing.xs,
  },
  verifiedText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  trustScore: {
    ...typography.caption,
    color: theme.colors.gray,
  },
  priceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    ...typography.caption,
    color: theme.colors.gray,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...typography.caption,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
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
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    borderRadius: theme.roundness,
    padding: theme.spacing.lg,
  },
  modalContent: {
    flex: 1,
  },
  modalTitle: {
    ...typography.h3,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  modalButton: {
    flex: 0.48,
  },
});

export default PricingScreen;
