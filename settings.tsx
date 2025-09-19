import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  TextInput, 
  Alert,
  Platform 
} from 'react-native';
import { 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  FileText, 
  Smartphone,
  Key,
  Trash2,
  Save,
  Clock
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useSettings } from '@/hooks/settings-store';
import { useUser } from '@/hooks/user-store';
import aiService from '@/services/ai-service';
import notificationService from '@/services/notification-service';

export default function SettingsScreen() {
  const { colors, isDark, settings, updateTheme, updateNotifications } = useSettings();
  const { user } = useUser();
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(notificationService.getSettings());
  const [dailyUsage, setDailyUsage] = useState({ requests: 0, tokens: 0, cost: 0 });

  const styles = createStyles(colors);

  useEffect(() => {
    loadApiKey();
    loadDailyUsage();
    loadNotificationSettings();
  }, []);

  const loadApiKey = async () => {
    const key = await aiService.getApiKey();
    if (key) {
      setApiKey(key);
    }
  };

  const loadDailyUsage = async () => {
    const usage = await aiService.getDailyUsage();
    setDailyUsage(usage);
  };

  const loadNotificationSettings = () => {
    setNotificationSettings(notificationService.getSettings());
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Por favor ingresa una API key válida');
      return;
    }

    try {
      await aiService.setApiKey(apiKey);
      Alert.alert('Éxito', 'API key guardada correctamente');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error guardando API key');
    }
  };

  const handleClearCache = async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('¿Estás seguro de que quieres limpiar el caché de IA?');
      if (!confirmed) return;
    } else {
      Alert.alert(
        'Limpiar Caché',
        '¿Estás seguro de que quieres limpiar el caché de IA?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Limpiar', style: 'destructive', onPress: () => performClearCache() }
        ]
      );
      return;
    }
    performClearCache();
  };

  const performClearCache = async () => {
    try {
      await aiService.clearCache();
      Alert.alert('Éxito', 'Caché limpiado correctamente');
      loadDailyUsage();
    } catch (error) {
      Alert.alert('Error', 'No se pudo limpiar el caché');
    }
  };

  const handleNotificationToggle = async (key: string, value: boolean) => {
    const newSettings = { ...notificationSettings, [key]: value } as any;
    setNotificationSettings(newSettings);
    await notificationService.updateSettings(newSettings);
    await updateNotifications({ [key]: value } as any);
  };

  const handleMealTimeChange = async (meal: string, time: string) => {
    const currentMealSetting = notificationSettings[meal as keyof typeof notificationSettings] as any;
    const newSettings = {
      ...notificationSettings,
      [meal]: { ...currentMealSetting, time }
    };
    setNotificationSettings(newSettings);
    await notificationService.updateSettings(newSettings);
  };

  const initializeNotifications = async () => {
    const success = await notificationService.initialize();
    if (success) {
      Alert.alert('Éxito', 'Notificaciones configuradas correctamente');
    } else {
      Alert.alert('Error', 'No se pudieron configurar las notificaciones');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              {isDark ? <Moon size={20} color={colors.text} /> : <Sun size={20} color={colors.text} />}
              <Text style={styles.settingLabel}>Tema</Text>
            </View>
            <View style={styles.themeButtons}>
              {['light', 'dark', 'system'].map((theme) => (
                <TouchableOpacity
                  key={theme}
                  style={[
                    styles.themeButton,
                    settings.theme === theme && styles.themeButtonActive
                  ]}
                  onPress={() => updateTheme(theme as any)}
                >
                  <Text style={[
                    styles.themeButtonText,
                    settings.theme === theme && styles.themeButtonTextActive
                  ]}>
                    {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Oscuro' : 'Sistema'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* AI Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración de IA</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Key size={20} color={colors.text} />
              <Text style={styles.settingLabel}>API Key de ChatGPT</Text>
            </View>
          </View>
          
          <View style={styles.apiKeyContainer}>
            <TextInput
              style={styles.apiKeyInput}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Ingresa tu API key de OpenAI"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!isApiKeyVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsApiKeyVisible(!isApiKeyVisible)}
            >
              <Text style={styles.toggleButtonText}>
                {isApiKeyVisible ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveApiKey}>
            <Save size={16} color="#fff" />
            <Text style={styles.saveButtonText}>Guardar API Key</Text>
          </TouchableOpacity>

          <View style={styles.usageCard}>
            <Text style={styles.usageTitle}>Uso Diario</Text>
            <View style={styles.usageStats}>
              <View style={styles.usageStat}>
                <Text style={styles.usageNumber}>{dailyUsage.requests}</Text>
                <Text style={styles.usageLabel}>Solicitudes</Text>
              </View>
              <View style={styles.usageStat}>
                <Text style={styles.usageNumber}>{dailyUsage.tokens}</Text>
                <Text style={styles.usageLabel}>Tokens</Text>
              </View>
              <View style={styles.usageStat}>
                <Text style={styles.usageNumber}>${dailyUsage.cost.toFixed(4)}</Text>
                <Text style={styles.usageLabel}>Costo</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.clearCacheButton} onPress={handleClearCache}>
            <Trash2 size={16} color={colors.error} />
            <Text style={styles.clearCacheText}>Limpiar Caché de IA</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={initializeNotifications}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={colors.text} />
              <Text style={styles.settingLabel}>Configurar Notificaciones</Text>
            </View>
            <Text style={styles.settingValue}>Tocar para activar</Text>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Clock size={20} color={colors.text} />
              <Text style={styles.settingLabel}>Recordatorios de Comida</Text>
            </View>
            <Switch
              value={notificationSettings.breakfast.enabled}
              onValueChange={(value) => handleNotificationToggle('breakfast', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          {notificationSettings.breakfast.enabled && (
            <View style={styles.timeSettings}>
              <View style={styles.timeSetting}>
                <Text style={styles.timeLabel}>Desayuno:</Text>
                <TextInput
                  style={styles.timeInput}
                  value={notificationSettings.breakfast.time}
                  onChangeText={(time) => handleMealTimeChange('breakfast', time)}
                  placeholder="08:00"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View style={styles.timeSetting}>
                <Text style={styles.timeLabel}>Almuerzo:</Text>
                <TextInput
                  style={styles.timeInput}
                  value={notificationSettings.lunch.time}
                  onChangeText={(time) => handleMealTimeChange('lunch', time)}
                  placeholder="13:00"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View style={styles.timeSetting}>
                <Text style={styles.timeLabel}>Cena:</Text>
                <TextInput
                  style={styles.timeInput}
                  value={notificationSettings.dinner.time}
                  onChangeText={(time) => handleMealTimeChange('dinner', time)}
                  placeholder="20:00"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          )}

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabel}>Promociones</Text>
            </View>
            <Switch
              value={notificationSettings.promotions}
              onValueChange={(value) => handleNotificationToggle('promotions', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabel}>Reportes Semanales</Text>
            </View>
            <Switch
              value={notificationSettings.weeklyReports}
              onValueChange={(value) => handleNotificationToggle('weeklyReports', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/privacy-policy')}
          >
            <View style={styles.settingLeft}>
              <Shield size={20} color={colors.text} />
              <Text style={styles.settingLabel}>Política de Privacidad</Text>
            </View>
            <Text style={styles.settingValue}>Ver</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/terms-of-service')}
          >
            <View style={styles.settingLeft}>
              <FileText size={20} color={colors.text} />
              <Text style={styles.settingLabel}>Términos de Uso</Text>
            </View>
            <Text style={styles.settingValue}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Smartphone size={20} color={colors.text} />
              <Text style={styles.settingLabel}>Versión</Text>
            </View>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabel}>Plan Actual</Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.primary, fontWeight: '600' }]}>
              {user.subscriptionPlan.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>¿Necesitas ayuda?</Text>
          <Text style={styles.contactEmail}>📧 contacto@vidasaludablehoy.com</Text>
          <Text style={styles.contactText}>
            Estamos aquí para ayudarte con cualquier pregunta o problema que tengas.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  themeButtons: {
    flexDirection: 'row',
  },
  themeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: colors.background,
  },
  themeButtonActive: {
    backgroundColor: colors.primary,
  },
  themeButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  themeButtonTextActive: {
    color: '#fff',
  },
  apiKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  apiKeyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  toggleButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  usageCard: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  usageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  usageStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  usageStat: {
    alignItems: 'center',
  },
  usageNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  usageLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  clearCacheButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  clearCacheText: {
    color: colors.error,
    fontSize: 16,
    marginLeft: 8,
  },
  timeSettings: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  timeSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 16,
    color: colors.text,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    minWidth: 80,
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: colors.surface,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
