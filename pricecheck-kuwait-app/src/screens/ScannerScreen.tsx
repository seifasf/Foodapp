import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, typography, layout } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getProductByBarcode } from '../data/dummyData';

type ScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width, height } = Dimensions.get('window');

const ScannerScreen: React.FC = () => {
  const navigation = useNavigation<ScannerScreenNavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const cameraRef = useRef<RNCamera>(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      // For now, just set permission to true for testing
      // In a real app, you would use proper permission handling
      setHasPermission(true);
    } catch (error) {
      console.error('Camera permission error:', error);
      setHasPermission(false);
    }
  };

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    console.log('Barcode scanned:', { type, data });
    
    // Simulate API call to check if product exists
    setTimeout(() => {
      // Check if product exists in dummy data
      const product = getProductByBarcode(data);
      
      if (product) {
        // Navigate to product page
        navigation.navigate('Product', { 
          productId: product.id,
          barcode: data 
        });
      } else {
        // Show add product dialog
        showAddProductDialog(data);
      }
      
      setScanned(false);
    }, 1000);
  };

  const showAddProductDialog = (barcode: string) => {
    Alert.alert(
      'منتج غير موجود',
      `المنتج بالباركود ${barcode} غير موجود في قاعدة البيانات. هل تريد إضافته؟`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
          onPress: () => setScanned(false),
        },
        {
          text: 'إضافة المنتج',
          onPress: () => {
            // Navigate to add product screen or show form
            Alert.alert('قريباً', 'ستكون هذه الميزة متاحة قريباً');
            setScanned(false);
          },
        },
      ]
    );
  };

  const toggleFlash = () => {
    setFlashMode(prev => {
      switch (prev) {
        case 'off': return 'on';
        case 'on': return 'auto';
        case 'auto': return 'off';
        default: return 'off';
      }
    });
  };

  const toggleCamera = () => {
    setCameraType(prev => prev === 'back' ? 'front' : 'back');
  };

  const renderCamera = () => {
    if (hasPermission === null) {
      return (
        <View style={styles.permissionContainer}>
          <Icon name="camera-alt" size={64} color={theme.colors.gray} />
          <Text style={styles.permissionText}>طلب إذن الكاميرا...</Text>
        </View>
      );
    }

    if (hasPermission === false) {
      return (
        <View style={styles.permissionContainer}>
          <Icon name="camera-alt" size={64} color={theme.colors.error} />
          <Text style={styles.permissionText}>لا يمكن الوصول للكاميرا</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={checkCameraPermission}
          >
            <Text style={styles.permissionButtonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        onBarCodeRead={handleBarcodeScanned}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.upc_e,
        ]}
        captureAudio={false}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay}>
            <Text style={styles.instructionText}>
              ضع الباركود داخل الإطار للمسح
            </Text>
          </View>
          
          <View style={styles.middleOverlay}>
            <View style={styles.leftOverlay} />
            <View style={styles.scanArea}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
            <View style={styles.rightOverlay} />
          </View>
          
          <View style={styles.bottomOverlay}>
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleFlash}
              >
                <Icon
                  name={flashMode === 'off' ? 'flash-off' : 'flash-on'}
                  size={24}
                  color={theme.colors.white}
                />
                <Text style={styles.controlText}>فلاش</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleCamera}
              >
                <Icon name="flip-camera-android" size={24} color={theme.colors.white} />
                <Text style={styles.controlText}>تبديل</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.helpText}>
              <Text style={styles.helpTextContent}>
                تأكد من وجود إضاءة كافية ووضوح الباركود
              </Text>
            </View>
          </View>
        </View>
      </RNCamera>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {renderCamera()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  instructionText: {
    ...typography.h4,
    color: theme.colors.white,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.roundness,
  },
  middleOverlay: {
    flex: 2,
    flexDirection: 'row',
  },
  leftOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing.md,
    borderRadius: theme.roundness,
    minWidth: 80,
  },
  controlText: {
    ...typography.caption,
    color: theme.colors.white,
    marginTop: theme.spacing.xs,
  },
  helpText: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  helpTextContent: {
    ...typography.body2,
    color: theme.colors.white,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.roundness,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  permissionText: {
    ...typography.h3,
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  permissionButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.roundness,
  },
  permissionButtonText: {
    ...typography.button,
    color: theme.colors.white,
  },
});

export default ScannerScreen;
