import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationSettings } from '@/types';

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  breakfast: { enabled: true, time: '08:00' },
  lunch: { enabled: true, time: '13:00' },
  dinner: { enabled: true, time: '20:00' },
  promotions: false,
  weeklyReports: true,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class NotificationService {
  private settings: NotificationSettings = DEFAULT_NOTIFICATION_SETTINGS;

  async initialize(): Promise<boolean> {
    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return false;
    }

    try {
      await this.loadSettings();
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permissions not granted');
        return false;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('meal-reminders', {
          name: 'Recordatorios de Comida',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#22c55e',
        });

        await Notifications.setNotificationChannelAsync('promotions', {
          name: 'Promociones',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }

      await this.scheduleAllNotifications();
      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  private async loadSettings(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('nutrireto_notifications');
      if (stored) {
        this.settings = { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.log('Error loading notification settings:', error);
    }
  }

  async updateSettings(newSettings: Partial<NotificationSettings>): Promise<void> {
    try {
      this.settings = { ...this.settings, ...newSettings };
      await AsyncStorage.setItem('nutrireto_notifications', JSON.stringify(this.settings));
      await this.scheduleAllNotifications();
    } catch (error) {
      console.log('Error updating notification settings:', error);
    }
  }

  getSettings(): NotificationSettings {
    return this.settings;
  }

  private async scheduleAllNotifications(): Promise<void> {
    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule meal reminders
    if (this.settings.breakfast.enabled) {
      await this.scheduleMealReminder('breakfast', this.settings.breakfast.time, 'Desayuno');
    }
    if (this.settings.lunch.enabled) {
      await this.scheduleMealReminder('lunch', this.settings.lunch.time, 'Almuerzo');
    }
    if (this.settings.dinner.enabled) {
      await this.scheduleMealReminder('dinner', this.settings.dinner.time, 'Cena');
    }

    // Schedule weekly reports
    if (this.settings.weeklyReports) {
      await this.scheduleWeeklyReport();
    }
  }

  private async scheduleMealReminder(mealType: string, time: string, mealName: string): Promise<void> {
    try {
      const [hours, minutes] = time.split(':').map(Number);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `¡Hora de tu ${mealName.toLowerCase()}! 🍽️`,
          body: 'Revisa tu menú personalizado en Nutrireto',
          data: { type: 'meal-reminder', mealType },
          sound: true,
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
        } as Notifications.CalendarTriggerInput,
      });

      console.log(`✅ Scheduled ${mealName} reminder for ${time}`);
    } catch (error) {
      console.error(`Error scheduling ${mealName} reminder:`, error);
    }
  }

  private async scheduleWeeklyReport(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '📊 Tu reporte semanal está listo',
          body: 'Descubre tu progreso nutricional de esta semana',
          data: { type: 'weekly-report' },
        },
        trigger: {
          weekday: 1, // Monday
          hour: 9,
          minute: 0,
          repeats: true,
        } as Notifications.CalendarTriggerInput,
      });

      console.log('✅ Scheduled weekly report');
    } catch (error) {
      console.error('Error scheduling weekly report:', error);
    }
  }

  async sendPromotionNotification(title: string, body: string): Promise<void> {
    if (!this.settings.promotions) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type: 'promotion' },
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending promotion notification:', error);
    }
  }

  async sendCustomNotification(title: string, body: string, data?: any): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type: 'custom', ...data },
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending custom notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('🔕 All notifications cancelled');
  }

  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}

export const notificationService = new NotificationService();
export default notificationService;
