import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Card, Checkbox, TextInput, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, typography, layout } from '../styles/theme';
import { HEALTH_GOALS, DIETARY_PREFERENCES, ALLERGIES } from '../types';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    healthGoals: [] as string[],
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
  });

  const steps = [
    { title: 'مرحباً بك', subtitle: 'مرحباً بك في مسح الغداء الكويتي' },
    { title: 'المعلومات الشخصية', subtitle: 'أخبرنا عن نفسك' },
    { title: 'الأهداف الصحية', subtitle: 'ما هي أهدافك الصحية؟' },
    { title: 'التفضيلات الغذائية', subtitle: 'ما هي تفضيلاتك الغذائية؟' },
    { title: 'الحساسيات', subtitle: 'هل لديك أي حساسيات غذائية؟' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Validate required fields
    if (!formData.name || !formData.email) {
      Alert.alert('خطأ', 'يرجى ملء الاسم والبريد الإلكتروني');
      return;
    }

    // Save user data (in a real app, this would be saved to AsyncStorage or API)
    console.log('User data:', formData);
    
    // Navigate to main app
    navigation.replace('Main');
  };

  const toggleSelection = (type: 'healthGoals' | 'dietaryPreferences' | 'allergies', id: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter(item => item !== id)
        : [...prev[type], id]
    }));
  };

  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.welcomeTitle}>مرحباً بك في مسح الغداء الكويتي</Text>
      <Text style={styles.welcomeSubtitle}>
        تطبيق يساعدك على اتخاذ خيارات غذائية صحية وذكية
      </Text>
      <View style={styles.featuresList}>
        <Text style={styles.featureItem}>📱 مسح الباركود للمنتجات</Text>
        <Text style={styles.featureItem}>📊 تقييم صحي للمنتجات</Text>
        <Text style={styles.featureItem}>💰 مقارنة الأسعار</Text>
        <Text style={styles.featureItem}>🕌 معلومات الحلال</Text>
        <Text style={styles.featureItem}>⚕️ تخصيص حسب احتياجاتك الصحية</Text>
      </View>
    </View>
  );

  const renderPersonalInfoStep = () => (
    <View style={styles.stepContainer}>
      <TextInput
        label="الاسم الكامل *"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="البريد الإلكتروني *"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="رقم الهاتف"
        value={formData.phone}
        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
      />
      <View style={styles.rowInputs}>
        <TextInput
          label="العمر"
          value={formData.age}
          onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
          style={[styles.input, styles.halfInput]}
          mode="outlined"
          keyboardType="numeric"
        />
        <TextInput
          label="الوزن (كجم)"
          value={formData.weight}
          onChangeText={(text) => setFormData(prev => ({ ...prev, weight: text }))}
          style={[styles.input, styles.halfInput]}
          mode="outlined"
          keyboardType="numeric"
        />
      </View>
      <TextInput
        label="الطول (سم)"
        value={formData.height}
        onChangeText={(text) => setFormData(prev => ({ ...prev, height: text }))}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
    </View>
  );

  const renderHealthGoalsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>اختر أهدافك الصحية</Text>
      <Text style={styles.stepSubtitle}>يمكنك اختيار أكثر من هدف</Text>
      {HEALTH_GOALS.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={styles.optionCard}
          onPress={() => toggleSelection('healthGoals', goal.id)}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{goal.nameAr}</Text>
            <Text style={styles.optionDescription}>{goal.descriptionAr}</Text>
          </View>
          <Checkbox
            status={formData.healthGoals.includes(goal.id) ? 'checked' : 'unchecked'}
            onPress={() => toggleSelection('healthGoals', goal.id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDietaryPreferencesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>تفضيلاتك الغذائية</Text>
      <Text style={styles.stepSubtitle}>اختر ما يناسبك</Text>
      {DIETARY_PREFERENCES.map((preference) => (
        <TouchableOpacity
          key={preference.id}
          style={styles.optionCard}
          onPress={() => toggleSelection('dietaryPreferences', preference.id)}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{preference.nameAr}</Text>
            <Text style={styles.optionDescription}>{preference.descriptionAr}</Text>
          </View>
          <Checkbox
            status={formData.dietaryPreferences.includes(preference.id) ? 'checked' : 'unchecked'}
            onPress={() => toggleSelection('dietaryPreferences', preference.id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAllergiesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>الحساسيات الغذائية</Text>
      <Text style={styles.stepSubtitle}>اختر الحساسيات التي تعاني منها</Text>
      {ALLERGIES.map((allergy) => (
        <TouchableOpacity
          key={allergy.id}
          style={styles.optionCard}
          onPress={() => toggleSelection('allergies', allergy.id)}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{allergy.nameAr}</Text>
            <Text style={styles.optionDescription}>
              {allergy.severity === 'severe' ? 'شديدة' : 
               allergy.severity === 'moderate' ? 'متوسطة' : 'خفيفة'}
            </Text>
          </View>
          <Checkbox
            status={formData.allergies.includes(allergy.id) ? 'checked' : 'unchecked'}
            onPress={() => toggleSelection('allergies', allergy.id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderHealthGoalsStep();
      case 3:
        return renderDietaryPreferencesStep();
      case 4:
        return renderAllergiesStep();
      default:
        return renderWelcomeStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepCounter}>
          {currentStep + 1} من {steps.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentStep + 1) / steps.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
        <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
      </View>

      <ScrollView style={styles.content}>
        {renderCurrentStep()}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <Button
              mode="outlined"
              onPress={handlePrevious}
              style={styles.button}
            >
              السابق
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleNext}
            style={[styles.button, styles.primaryButton]}
          >
            {currentStep === steps.length - 1 ? 'إنهاء' : 'التالي'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  stepCounter: {
    ...typography.caption,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 2,
  },
  stepTitle: {
    ...typography.h2,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  stepSubtitle: {
    ...typography.body1,
    color: theme.colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  stepContainer: {
    flex: 1,
  },
  welcomeTitle: {
    ...typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  welcomeSubtitle: {
    ...typography.body1,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  featuresList: {
    marginTop: theme.spacing.lg,
  },
  featureItem: {
    ...typography.body1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  optionCard: {
    ...layout.card,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    ...typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  optionDescription: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default OnboardingScreen;
