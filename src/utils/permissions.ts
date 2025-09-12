import { Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';

const PERMISSION_MESSAGES = {
  camera: {
    title: 'إذن الكاميرا',
    message: 'يحتاج التطبيق إلى إذن الكاميرا لمسح الباركود',
    buttonNeutral: 'اسألني لاحقاً',
    buttonNegative: 'إلغاء',
    buttonPositive: 'موافق',
  },
  photo: {
    title: 'إذن الصور',
    message: 'يحتاج التطبيق إلى إذن الوصول للصور لإضافة صور المنتجات',
    buttonNeutral: 'اسألني لاحقاً',
    buttonNegative: 'إلغاء',
    buttonPositive: 'موافق',
  },
  location: {
    title: 'إذن الموقع',
    message: 'يحتاج التطبيق إلى إذن الموقع لإظهار المتاجر القريبة',
    buttonNeutral: 'اسألني لاحقاً',
    buttonNegative: 'إلغاء',
    buttonPositive: 'موافق',
  },
};

export const PermissionService = {
  // Camera permission
  async requestCameraPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }) as Permission;

    return this.requestPermission(permission, 'camera');
  },

  // Photo library permission
  async requestPhotoPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }) as Permission;

    return this.requestPermission(permission, 'photo');
  },

  // Location permission
  async requestLocationPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    }) as Permission;

    return this.requestPermission(permission, 'location');
  },

  // Generic permission request
  async requestPermission(permission: Permission, type: keyof typeof PERMISSION_MESSAGES): Promise<boolean> {
    try {
      const result = await request(permission);
      
      switch (result) {
        case RESULTS.GRANTED:
          return true;
        case RESULTS.DENIED:
          return false;
        case RESULTS.BLOCKED:
          this.showPermissionBlockedAlert(type);
          return false;
        case RESULTS.UNAVAILABLE:
          console.warn('Permission is not available on this device');
          return false;
        default:
          return false;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  },

  // Check permission status
  async checkPermission(permission: Permission): Promise<boolean> {
    try {
      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  },

  // Show permission blocked alert
  showPermissionBlockedAlert(type: keyof typeof PERMISSION_MESSAGES) {
    const messages = PERMISSION_MESSAGES[type];
    
    Alert.alert(
      messages.title,
      `${messages.message}\n\nيرجى الذهاب إلى إعدادات التطبيق وتمكين الإذن`,
      [
        { text: messages.buttonNegative, style: 'cancel' },
        { 
          text: 'فتح الإعدادات', 
          onPress: () => Linking.openSettings() 
        },
      ]
    );
  },

  // Request multiple permissions
  async requestMultiplePermissions(permissions: Permission[]): Promise<{ [key: string]: boolean }> {
    const results: { [key: string]: boolean } = {};
    
    for (const permission of permissions) {
      try {
        const result = await request(permission);
        results[permission] = result === RESULTS.GRANTED;
      } catch (error) {
        console.error(`Error requesting permission ${permission}:`, error);
        results[permission] = false;
      }
    }
    
    return results;
  },

  // Check if all required permissions are granted
  async checkAllRequiredPermissions(): Promise<boolean> {
    const requiredPermissions = [
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      }) as Permission,
    ];

    for (const permission of requiredPermissions) {
      const isGranted = await this.checkPermission(permission);
      if (!isGranted) {
        return false;
      }
    }

    return true;
  },

  // Get permission status for all app permissions
  async getAllPermissionStatuses(): Promise<{ [key: string]: string }> {
    const permissions = [
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      }) as Permission,
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }) as Permission,
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }) as Permission,
    ];

    const statuses: { [key: string]: string } = {};

    for (const permission of permissions) {
      try {
        const result = await check(permission);
        statuses[permission] = result;
      } catch (error) {
        console.error(`Error checking permission ${permission}:`, error);
        statuses[permission] = RESULTS.UNAVAILABLE;
      }
    }

    return statuses;
  },
};

export default PermissionService;
