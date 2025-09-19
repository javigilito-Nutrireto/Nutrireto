import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { AppSettings, ThemeMode } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  notifications: {
    mealReminders: true,
    promotions: false,
    weeklyReports: true,
  },
  language: 'es',
};

export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
}

const LIGHT_THEME: ThemeColors = {
  primary: '#22c55e',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  card: '#ffffff',
  tabBar: '#ffffff',
  tabBarActive: '#22c55e',
  tabBarInactive: '#6b7280',
};

const DARK_THEME: ThemeColors = {
  primary: '#22c55e',
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  border: '#374151',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  card: '#1f2937',
  tabBar: '#1f2937',
  tabBarActive: '#22c55e',
  tabBarInactive: '#9ca3af',
};

export const [SettingsProvider, useSettings] = createContextHook(() => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  const loadSettings = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('nutrireto_settings');
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, [loadSettings]);

  const saveSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await AsyncStorage.setItem('nutrireto_settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  }, [settings]);

  const updateTheme = useCallback(async (theme: ThemeMode) => {
    await saveSettings({ theme });
  }, [saveSettings]);

  const updateNotifications = useCallback(async (notifications: Partial<AppSettings['notifications']>) => {
    await saveSettings({ 
      notifications: { ...settings.notifications, ...notifications } 
    });
  }, [saveSettings, settings.notifications]);

  const getCurrentTheme = useCallback((): 'light' | 'dark' => {
    if (settings.theme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return settings.theme === 'dark' ? 'dark' : 'light';
  }, [settings.theme, systemColorScheme]);

  const colors = useMemo((): ThemeColors => {
    return getCurrentTheme() === 'dark' ? DARK_THEME : LIGHT_THEME;
  }, [getCurrentTheme]);

  const isDark = useMemo(() => getCurrentTheme() === 'dark', [getCurrentTheme]);

  return useMemo(() => ({
    settings,
    colors,
    isDark,
    isLoading,
    saveSettings,
    updateTheme,
    updateNotifications,
    getCurrentTheme,
  }), [
    settings,
    colors,
    isDark,
    isLoading,
    saveSettings,
    updateTheme,
    updateNotifications,
    getCurrentTheme,
  ]);
});
