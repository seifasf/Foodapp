import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, RadioButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DELIVERY_APPS } from '../types';
import { theme, typography } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PriceSubmissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PriceSubmission'>;
type PriceSubmissionScreenRouteProp = RouteProp<RootStackParamList, 'PriceSubmission'>;

const PriceSubmissionScreen: React.FC = () => {
  const navigation = useNavigation<PriceSubmissionScreenNavigationProp>();
  const route = useRoute<PriceSubmissionScreenRouteProp>();
  const { menuItemId, restaurantId } = route.params;

  const [selectedApp, setSelectedApp] = useState<string>('');
  const [price, setPrice] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [serviceFee, setServiceFee] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedApp) {
      Alert.alert('خطأ', 'يرجى اختيار تطبيق التوصيل');
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال سعر صحيح');
      return;
    }

    try {
      setSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'تم بنجاح',
        'تم إرسال السعر بنجاح. شكراً لمساهمتك!',
        [
          {
            text: 'حسناً',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('خطأ', 'فشل في إرسال السعر. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderAppSelector = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>اختر تطبيق التوصيل</Title>
        <Paragraph style={styles.cardSubtitle}>
          اختر التطبيق الذي اشتريت منه هذا العنصر
        </Paragraph>
        
        {DELIVERY_APPS.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={[
              styles.appOption,
              selectedApp === app.id && styles.selectedAppOption
            ]}
            onPress={() => setSelectedApp(app.id)}
          >
            <View style={styles.appInfo}>
              <View style={styles.appLogo}>
                <Text style={styles.appLogoText}>
                  {app.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.appDetails}>
                <Text style={styles.appName}>{app.nameAr}</Text>
                <Text style={styles.appSubtitle}>{app.name}</Text>
              </View>
            </View>
            <RadioButton
              value={app.id}
              status={selectedApp === app.id ? 'checked' : 'unchecked'}
              onPress={() => setSelectedApp(app.id)}
            />
          </TouchableOpacity>
        ))}
      </Card.Content>
    </Card>
  );

  const renderPriceForm = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>أدخل تفاصيل السعر</Title>
        <Paragraph style={styles.cardSubtitle}>
          أدخل السعر الذي دفعته بالدينار الكويتي
        </Paragraph>
        
        <TextInput
          label="سعر الطعام (د.ك)"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          right={<TextInput.Icon icon="currency-usd" />}
        />
        
        <TextInput
          label="رسوم التوصيل (د.ك)"
          value={deliveryFee}
          onChangeText={setDeliveryFee}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          right={<TextInput.Icon icon="truck-delivery" />}
        />
        
        <TextInput
          label="رسوم الخدمة (د.ك)"
          value={serviceFee}
          onChangeText={setServiceFee}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0.00"
          right={<TextInput.Icon icon="percent" />}
        />
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>المجموع الكلي:</Text>
          <Text style={styles.totalValue}>
            {(Number(price) + Number(deliveryFee || 0) + Number(serviceFee || 0)).toFixed(2)} د.ك
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderSubmissionInfo = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>معلومات الإرسال</Title>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>العنصر:</Text>
          <Text style={styles.infoValue}>عنصر قائمة تجريبي</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>المطعم:</Text>
          <Text style={styles.infoValue}>مطعم تجريبي</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>التاريخ:</Text>
          <Text style={styles.infoValue}>{new Date().toLocaleDateString('ar-KW')}</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.noteContainer}>
          <Icon name="info" size={16} color={theme.colors.info} />
          <Text style={styles.noteText}>
            سيتم مراجعة السعر قبل نشره للتأكد من دقته
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إرسال سعر</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {renderAppSelector()}
        {renderPriceForm()}
        {renderSubmissionInfo()}
        
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            disabled={submitting}
          >
            إلغاء
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={submitting}
            disabled={submitting || !selectedApp || !price}
          >
            إرسال السعر
          </Button>
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
  card: {
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  cardTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardSubtitle: {
    ...typography.body2,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
  },
  appOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    marginBottom: theme.spacing.sm,
  },
  selectedAppOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.lightGray,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  appLogoText: {
    ...typography.body1,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    ...typography.body1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  appSubtitle: {
    ...typography.caption,
    color: theme.colors.gray,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.roundness,
    marginTop: theme.spacing.sm,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  infoValue: {
    ...typography.body2,
    color: theme.colors.text,
    fontWeight: '500',
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    ...typography.caption,
    color: theme.colors.gray,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  cancelButton: {
    flex: 0.48,
  },
  submitButton: {
    flex: 0.48,
  },
});

export default PriceSubmissionScreen;
