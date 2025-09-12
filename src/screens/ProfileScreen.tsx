import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Switch, List, Avatar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User, AppSettings } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    language: {
      code: 'ar',
      name: 'Arabic',
      nameAr: 'العربية',
      isRTL: true,
    },
    notifications: {
      priceAlerts: true,
      newProducts: true,
      healthTips: true,
    },
    privacy: {
      shareData: false,
      analytics: true,
    },
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // Mock user data
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      phone: '+96512345678',
      name: 'أحمد محمد',
      age: 28,
      weight: 75,
      height: 175,
      healthGoals: [
        {
          id: 'weight_loss',
          name: 'Weight Loss',
          nameAr: 'فقدان الوزن',
          description: 'Lose weight and maintain a healthy BMI',
          descriptionAr: 'فقدان الوزن والحفاظ على مؤشر كتلة الجسم الصحي',
        },
      ],
      dietaryPreferences: [
        {
          id: 'halal',
          name: 'Halal',
          nameAr: 'حلال',
          description: 'Only Halal certified products',
          descriptionAr: 'المنتجات الحلال المعتمدة فقط',
        },
      ],
      allergies: [
        {
          id: 'nuts',
          name: 'Nuts',
          nameAr: 'المكسرات',
          severity: 'severe',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تسجيل الخروج', 
          style: 'destructive',
          onPress: () => {
            // Handle logout
            navigation.replace('Onboarding');
          }
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
  };

  const handleChangeLanguage = () => {
    Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
  };

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePrivacyToggle = (key: keyof typeof settings.privacy) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  const renderProfileHeader = () => (
    <Card style={styles.profileCard}>
      <Card.Content style={styles.profileContent}>
        <Avatar.Text
          size={80}
          label={user?.name?.charAt(0) || 'U'}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userPhone}>{user?.phone}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Icon name="edit" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  const renderPersonalInfo = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>المعلومات الشخصية</Title>
        <List.Item
          title="الاسم"
          description={user?.name}
          left={(props) => <List.Icon {...props} icon="person" />}
        />
        <List.Item
          title="البريد الإلكتروني"
          description={user?.email}
          left={(props) => <List.Icon {...props} icon="email" />}
        />
        <List.Item
          title="رقم الهاتف"
          description={user?.phone}
          left={(props) => <List.Icon {...props} icon="phone" />}
        />
        <List.Item
          title="العمر"
          description={user?.age ? `${user.age} سنة` : 'غير محدد'}
          left={(props) => <List.Icon {...props} icon="cake" />}
        />
        <List.Item
          title="الوزن"
          description={user?.weight ? `${user.weight} كجم` : 'غير محدد'}
          left={(props) => <List.Icon {...props} icon="scale" />}
        />
        <List.Item
          title="الطول"
          description={user?.height ? `${user.height} سم` : 'غير محدد'}
          left={(props) => <List.Icon {...props} icon="straighten" />}
        />
      </Card.Content>
    </Card>
  );

  const renderHealthGoals = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>الأهداف الصحية</Title>
        {user?.healthGoals.map((goal, index) => (
          <List.Item
            key={index}
            title={goal.nameAr}
            description={goal.descriptionAr}
            left={(props) => <List.Icon {...props} icon="fitness-center" />}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const renderDietaryPreferences = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>التفضيلات الغذائية</Title>
        {user?.dietaryPreferences.map((preference, index) => (
          <List.Item
            key={index}
            title={preference.nameAr}
            description={preference.descriptionAr}
            left={(props) => <List.Icon {...props} icon="restaurant" />}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const renderAllergies = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>الحساسيات</Title>
        {user?.allergies.map((allergy, index) => (
          <List.Item
            key={index}
            title={allergy.nameAr}
            description={
              allergy.severity === 'severe' ? 'شديدة' :
              allergy.severity === 'moderate' ? 'متوسطة' : 'خفيفة'
            }
            left={(props) => <List.Icon {...props} icon="warning" />}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const renderSettings = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>الإعدادات</Title>
        
        <List.Item
          title="اللغة"
          description={settings.language.nameAr}
          left={(props) => <List.Icon {...props} icon="language" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleChangeLanguage}
        />
        
        <Divider />
        
        <List.Item
          title="تنبيهات الأسعار"
          description="تلقي تنبيهات عند تغير الأسعار"
          left={(props) => <List.Icon {...props} icon="notifications" />}
          right={() => (
            <Switch
              value={settings.notifications.priceAlerts}
              onValueChange={() => handleNotificationToggle('priceAlerts')}
            />
          )}
        />
        
        <List.Item
          title="منتجات جديدة"
          description="تلقي إشعارات عن المنتجات الجديدة"
          left={(props) => <List.Icon {...props} icon="new-releases" />}
          right={() => (
            <Switch
              value={settings.notifications.newProducts}
              onValueChange={() => handleNotificationToggle('newProducts')}
            />
          )}
        />
        
        <List.Item
          title="نصائح صحية"
          description="تلقي نصائح صحية يومية"
          left={(props) => <List.Icon {...props} icon="favorite" />}
          right={() => (
            <Switch
              value={settings.notifications.healthTips}
              onValueChange={() => handleNotificationToggle('healthTips')}
            />
          )}
        />
        
        <Divider />
        
        <List.Item
          title="مشاركة البيانات"
          description="مشاركة البيانات المجهولة لتحسين التطبيق"
          left={(props) => <List.Icon {...props} icon="share" />}
          right={() => (
            <Switch
              value={settings.privacy.shareData}
              onValueChange={() => handlePrivacyToggle('shareData')}
            />
          )}
        />
        
        <List.Item
          title="التحليلات"
          description="تتبع استخدام التطبيق لتحسين الأداء"
          left={(props) => <List.Icon {...props} icon="analytics" />}
          right={() => (
            <Switch
              value={settings.privacy.analytics}
              onValueChange={() => handlePrivacyToggle('analytics')}
            />
          )}
        />
      </Card.Content>
    </Card>
  );

  const renderStats = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>إحصائياتك</Title>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>منتج مسح</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>سعر أضيف</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>مفضل</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>A</Text>
            <Text style={styles.statLabel}>متوسط الصحة</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderActions = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>الإجراءات</Title>
        
        <List.Item
          title="المفضلة"
          description="عرض المنتجات المفضلة"
          left={(props) => <List.Icon {...props} icon="favorite" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً')}
        />
        
        <List.Item
          title="سجل المسح"
          description="عرض تاريخ المنتجات الممسوحة"
          left={(props) => <List.Icon {...props} icon="history" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً')}
        />
        
        <List.Item
          title="المساعدة والدعم"
          description="الحصول على المساعدة"
          left={(props) => <List.Icon {...props} icon="help" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً')}
        />
        
        <List.Item
          title="حول التطبيق"
          description="معلومات عن التطبيق"
          left={(props) => <List.Icon {...props} icon="info" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً')}
        />
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {renderProfileHeader()}
        {renderPersonalInfo()}
        {renderHealthGoals()}
        {renderDietaryPreferences()}
        {renderAllergies()}
        {renderStats()}
        {renderSettings()}
        {renderActions()}
        
        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={theme.colors.error}
          >
            تسجيل الخروج
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
  content: {
    flex: 1,
  },
  profileCard: {
    margin: theme.spacing.md,
    marginBottom: 0,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    ...typography.body2,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  userPhone: {
    ...typography.body2,
    color: theme.colors.gray,
  },
  editButton: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.roundness,
    marginBottom: theme.spacing.sm,
  },
  statNumber: {
    ...typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: theme.colors.text,
    textAlign: 'center',
  },
  logoutContainer: {
    padding: theme.spacing.lg,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
});

export default ProfileScreen;
