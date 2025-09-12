import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PricingScreen from './src/screens/PricingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';

// Import theme
import { theme } from './src/styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Scanner') {
            iconName = 'qr-code-scanner';
          } else if (route.name === 'Pricing') {
            iconName = 'trending-up';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.lightGray,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'الرئيسية' }}
      />
      <Tab.Screen 
        name="Scanner" 
        component={ScannerScreen}
        options={{ title: 'الماسح' }}
      />
      <Tab.Screen 
        name="Pricing" 
        component={PricingScreen}
        options={{ title: 'الأسعار' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'الملف الشخصي' }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor={theme.colors.primary} 
          />
          <Stack.Navigator 
            initialRouteName="Onboarding"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Product" 
              component={ProductScreen}
              options={{ title: 'معلومات المنتج' }}
            />
            <Stack.Screen 
              name="Restaurant" 
              component={RestaurantScreen}
              options={{ title: 'معلومات المطعم' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
