import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MenuItem } from '../types';
import { theme, typography } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../contexts/CartContext';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'إزالة العنصر',
      'هل أنت متأكد من إزالة هذا العنصر من السلة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'إزالة', onPress: () => removeItem(itemId) },
      ]
    );
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'مسح السلة',
      'هل أنت متأكد من مسح جميع العناصر من السلة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'مسح', onPress: clearCart },
      ]
    );
  };

  const handleProceedToComparison = () => {
    if (state.items.length === 0) {
      Alert.alert('سلة فارغة', 'يرجى إضافة عناصر إلى السلة أولاً');
      return;
    }
    // Navigate to price comparison screen
    navigation.navigate('PriceComparison', { cartId: 'current' });
  };

  const renderCartItem = (item: any) => {
    // This would normally fetch the actual menu item data
    const menuItem: MenuItem = {
      id: item.menuItemId,
      name: 'Sample Menu Item',
      nameAr: 'عنصر قائمة تجريبي',
      description: 'Sample description',
      descriptionAr: 'وصف تجريبي',
      category: 'Main',
      categoryAr: 'الرئيسية',
      imageUrl: 'https://via.placeholder.com/100x100',
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      allergens: [],
      allergensAr: [],
      nutritionalInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sodium: 0,
      },
      priceComparisons: [],
    };

    return (
      <Card key={item.id} style={styles.cartItem}>
        <Card.Content>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{menuItem.nameAr}</Text>
              <Text style={styles.itemDescription}>{menuItem.descriptionAr}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <Icon name="close" size={20} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.itemFooter}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Icon name="remove" size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Icon name="add" size={16} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>
              {item.quantity * 0} د.ك {/* Placeholder price */}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="shopping-cart" size={64} color={theme.colors.gray} />
      <Text style={styles.emptyTitle}>سلة التسوق فارغة</Text>
      <Text style={styles.emptySubtitle}>
        ابدأ بإضافة عناصر من المطاعم
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.emptyButton}
      >
        تصفح المطاعم
      </Button>
    </View>
  );

  const renderCartSummary = () => (
    <Card style={styles.summaryCard}>
      <Card.Content>
        <Title style={styles.summaryTitle}>ملخص الطلب</Title>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>عدد العناصر:</Text>
          <Text style={styles.summaryValue}>{state.totalItems}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>المجموع الفرعي:</Text>
          <Text style={styles.summaryValue}>{state.totalPrice.toFixed(2)} د.ك</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>المجموع الكلي:</Text>
          <Text style={styles.totalValue}>{state.totalPrice.toFixed(2)} د.ك</Text>
        </View>
        
        <TextInput
          label="تعليمات خاصة (اختياري)"
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
          style={styles.instructionsInput}
          mode="outlined"
          multiline
          numberOfLines={3}
        />
        
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={handleClearCart}
            style={styles.clearButton}
            disabled={state.items.length === 0}
          >
            مسح السلة
          </Button>
          <Button
            mode="contained"
            onPress={handleProceedToComparison}
            style={styles.proceedButton}
            disabled={state.items.length === 0}
          >
            مقارنة الأسعار
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (state.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>سلة التسوق</Text>
          <View style={styles.placeholder} />
        </View>
        {renderEmptyState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>سلة التسوق</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Icon name="clear" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {state.items.map(renderCartItem)}
        {renderCartSummary()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
    color: theme.colors.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  cartItem: {
    marginBottom: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  itemDescription: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    ...typography.body1,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  itemPrice: {
    ...typography.h4,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  summaryCard: {
    marginTop: theme.spacing.lg,
  },
  summaryTitle: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    ...typography.body1,
    color: theme.colors.text,
  },
  summaryValue: {
    ...typography.body1,
    color: theme.colors.text,
    fontWeight: '500',
  },
  divider: {
    marginVertical: theme.spacing.md,
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
  instructionsInput: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    flex: 0.48,
  },
  proceedButton: {
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

export default CartScreen;
