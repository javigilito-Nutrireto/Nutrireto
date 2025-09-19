import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Crown } from 'lucide-react-native';
import { SubscriptionInfo } from '@/types';

interface SubscriptionCardProps {
  subscription: SubscriptionInfo;
  isActive?: boolean;
  onSelect: () => void;
}

export default function SubscriptionCard({ subscription, isActive, onSelect }: SubscriptionCardProps) {
  const isPremium = subscription.plan === 'premium';
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isActive && styles.activeContainer,
        isPremium && styles.premiumContainer
      ]}
      onPress={onSelect}
    >
      {isPremium && (
        <View style={styles.crownContainer}>
          <Crown size={24} color="#fbbf24" fill="#fbbf24" />
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={[styles.planName, isPremium && styles.premiumText]}>
          {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
        </Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Activo</Text>
          </View>
        )}
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.price, isPremium && styles.premiumText]}>
          {subscription.price === 0 ? 'Gratis' : `€${subscription.price}`}
        </Text>
        {subscription.price > 0 && (
          <Text style={styles.period}>/mes</Text>
        )}
      </View>

      <Text style={styles.mealsText}>
        {subscription.mealsPerDay === 1 
          ? '1 comida al día' 
          : `Hasta ${subscription.mealsPerDay} comidas al día`
        }
      </Text>

      <View style={styles.featuresContainer}>
        {subscription.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Check size={16} color="#22c55e" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {!isActive && (
        <TouchableOpacity 
          style={[styles.selectButton, isPremium && styles.premiumButton]}
          onPress={onSelect}
        >
          <Text style={[styles.selectButtonText, isPremium && styles.premiumButtonText]}>
            Seleccionar Plan
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activeContainer: {
    borderColor: '#22c55e',
  },
  premiumContainer: {
    borderColor: '#fbbf24',
    backgroundColor: '#fffbeb',
  },
  crownContainer: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  premiumText: {
    color: '#d97706',
  },
  activeBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  period: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 4,
  },
  mealsText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  selectButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumButton: {
    backgroundColor: '#fbbf24',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumButtonText: {
    color: '#92400e',
  },
});
