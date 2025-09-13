import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AppSettings } from '../types';

const STORAGE_KEYS = {
  USER: 'user',
  SETTINGS: 'settings',
  FAVORITES: 'favorites',
  SCAN_HISTORY: 'scan_history',
  LANGUAGE: 'language',
} as const;

export const StorageService = {
  // User data
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async clearUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing user:', error);
      throw error;
    }
  },

  // App settings
  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  async getSettings(): Promise<AppSettings | null> {
    try {
      const settingsData = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settingsData ? JSON.parse(settingsData) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  },

  // Favorites
  async saveFavorites(favorites: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  },

  async getFavorites(): Promise<string[]> {
    try {
      const favoritesData = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favoritesData ? JSON.parse(favoritesData) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addToFavorites(productId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        await this.saveFavorites(favorites);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  async removeFromFavorites(productId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== productId);
      await this.saveFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  // Scan history
  async saveScanHistory(scanData: any): Promise<void> {
    try {
      const history = await this.getScanHistory();
      history.unshift(scanData);
      // Keep only last 100 scans
      const limitedHistory = history.slice(0, 100);
      await AsyncStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving scan history:', error);
      throw error;
    }
  },

  async getScanHistory(): Promise<any[]> {
    try {
      const historyData = await AsyncStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
      return historyData ? JSON.parse(historyData) : [];
    } catch (error) {
      console.error('Error getting scan history:', error);
      return [];
    }
  },

  async clearScanHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SCAN_HISTORY);
    } catch (error) {
      console.error('Error clearing scan history:', error);
      throw error;
    }
  },

  // Language
  async saveLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error saving language:', error);
      throw error;
    }
  },

  async getLanguage(): Promise<string> {
    try {
      const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return language || 'ar';
    } catch (error) {
      console.error('Error getting language:', error);
      return 'ar';
    }
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.SETTINGS,
        STORAGE_KEYS.FAVORITES,
        STORAGE_KEYS.SCAN_HISTORY,
        STORAGE_KEYS.LANGUAGE,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  },

  // Get storage info
  async getStorageInfo(): Promise<{ used: number; available: number }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      const used = data.reduce((total, [key, value]) => {
        return total + (value ? value.length : 0);
      }, 0);
      
      return {
        used,
        available: 0, // AsyncStorage doesn't provide available space
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, available: 0 };
    }
  },
};

export default StorageService;
