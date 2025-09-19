import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Crown, Zap, Shield } from 'lucide-react-native';
import { useUser } from '@/hooks/user-store';
import { SUBSCRIPTION_PLANS } from '@/constants/subscriptions';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function PlansScreen() {
  const { user, updateSubscription } = useUser();

  const handleSelectPlan = (planId: string) => {
    if (planId === user.subscriptionPlan) return;

    if (planId === 'free') {
      Alert.alert(
        'Cambiar a plan gratuito',
        '¿Estás seguro de que quieres cambiar al plan gratuito? Perderás acceso a las funciones premium.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: () => updateSubscription('free') }
        ]
      );
    } else {
      Alert.alert(
        'Suscripción Premium',
        `¿Quieres suscribirte al plan ${planId.toUpperCase()} por €${SUBSCRIPTION_PLANS[planId].price}/mes?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Suscribirse', 
            onPress: () => {
              updateSubscription(planId as any);
              Alert.alert('¡Éxito!', 'Te has suscrito correctamente al plan premium.');
            }
          }
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Crown size={32} color="#fbbf24" />
        <Text style={styles.title}>Planes de Suscripción</Text>
        <Text style={styles.subtitle}>
          Elige el plan que mejor se adapte a tus necesidades nutricionales
        </Text>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>¿Por qué elegir Nutrireto Premium?</Text>
        
        <View style={styles.benefitItem}>
          <Zap size={20} color="#22c55e" />
          <Text style={styles.benefitText}>Más comidas personalizadas cada día</Text>
        </View>
        
        <View style={styles.benefitItem}>
          <Shield size={20} color="#22c55e" />
          <Text style={styles.benefitText}>Análisis nutricional avanzado</Text>
        </View>
        
        <View style={styles.benefitItem}>
          <Crown size={20} color="#22c55e" />
          <Text style={styles.benefitText}>Acceso a recetas exclusivas</Text>
        </View>
      </View>

      <View style={styles.plansContainer}>
        {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
          <SubscriptionCard
            key={plan.plan}
            subscription={plan}
            isActive={user.subscriptionPlan === plan.plan}
            onSelect={() => handleSelectPlan(plan.plan)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          • Cancela en cualquier momento{'\n'}
          • Sin compromisos a largo plazo{'\n'}
          • Soporte 24/7 para usuarios premium
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  plansContainer: {
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
