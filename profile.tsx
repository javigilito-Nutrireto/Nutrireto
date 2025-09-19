import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { User, Settings, Heart, History, Edit3 } from 'lucide-react-native';
import { router } from 'expo-router';
import { useUser } from '@/hooks/user-store';
import { useMeals } from '@/hooks/meals-store';
import { ALLERGY_ICONS, ALLERGY_LABELS } from '@/constants/subscriptions';
import { Allergy, NutritionalGoal } from '@/types';

export default function ProfileScreen() {
  const { user, updateProfile, getBMI } = useUser();
  const { getFavoriteMealsData } = useMeals();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    age: user.age.toString(),
    weight: user.weight.toString(),
    height: user.height.toString(),
  });

  const bmi = getBMI();
  const favoriteMeals = getFavoriteMealsData();

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Bajo peso', color: '#3b82f6' };
    if (bmi < 25) return { text: 'Peso normal', color: '#22c55e' };
    if (bmi < 30) return { text: 'Sobrepeso', color: '#f59e0b' };
    return { text: 'Obesidad', color: '#ef4444' };
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name: editData.name,
        age: parseInt(editData.age),
        weight: parseFloat(editData.weight),
        height: parseFloat(editData.height),
      });
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  const toggleAllergy = async (allergy: Allergy) => {
    const newAllergies = user.allergies.includes(allergy)
      ? user.allergies.filter(a => a !== allergy)
      : [...user.allergies, allergy];
    
    await updateProfile({ allergies: newAllergies });
  };

  const updateGoal = async (goal: NutritionalGoal) => {
    await updateProfile({ goal });
  };

  const bmiCategory = getBMICategory(bmi);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <Settings size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <User size={32} color="#fff" />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.plan}>Plan {user.subscriptionPlan.toUpperCase()}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Edit3 size={16} color="#22c55e" />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Guardar' : 'Editar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nombre</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.name}
                onChangeText={(text) => setEditData({...editData, name: text})}
              />
            ) : (
              <Text style={styles.infoValue}>{user.name}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Edad</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.age}
                onChangeText={(text) => setEditData({...editData, age: text})}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{user.age} años</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Peso</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.weight}
                onChangeText={(text) => setEditData({...editData, weight: text})}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{user.weight} kg</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Altura</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.height}
                onChangeText={(text) => setEditData({...editData, height: text})}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{user.height} cm</Text>
            )}
          </View>
        </View>

        <View style={styles.bmiContainer}>
          <Text style={styles.bmiLabel}>Índice de Masa Corporal (IMC)</Text>
          <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
          <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>
            {bmiCategory.text}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objetivo Nutricional</Text>
        <View style={styles.goalContainer}>
          {[
            { key: 'lose_weight', label: 'Perder peso' },
            { key: 'maintain', label: 'Mantener peso' },
            { key: 'gain_muscle', label: 'Ganar músculo' }
          ].map((goal) => (
            <TouchableOpacity
              key={goal.key}
              style={[
                styles.goalButton,
                user.goal === goal.key && styles.selectedGoalButton
              ]}
              onPress={() => updateGoal(goal.key as NutritionalGoal)}
            >
              <Text style={[
                styles.goalButtonText,
                user.goal === goal.key && styles.selectedGoalButtonText
              ]}>
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alergias e Intolerancias</Text>
        <View style={styles.allergiesContainer}>
          {Object.entries(ALLERGY_ICONS).map(([allergy, icon]) => (
            <TouchableOpacity
              key={allergy}
              style={[
                styles.allergyButton,
                user.allergies.includes(allergy as Allergy) && styles.selectedAllergyButton
              ]}
              onPress={() => toggleAllergy(allergy as Allergy)}
            >
              <Text style={styles.allergyIcon}>{icon}</Text>
              <Text style={[
                styles.allergyText,
                user.allergies.includes(allergy as Allergy) && styles.selectedAllergyText
              ]}>
                {ALLERGY_LABELS[allergy as Allergy]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Heart size={24} color="#ef4444" />
            <Text style={styles.statNumber}>{favoriteMeals.length}</Text>
            <Text style={styles.statLabel}>Comidas favoritas</Text>
          </View>
          <View style={styles.statCard}>
            <History size={24} color="#6b7280" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Días activo</Text>
          </View>
        </View>
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
    backgroundColor: '#22c55e',
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  plan: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#22c55e',
    marginLeft: 4,
    fontWeight: '500',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  infoItem: {
    width: '50%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#22c55e',
    paddingVertical: 4,
  },
  bmiContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  bmiLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goalButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedGoalButton: {
    backgroundColor: '#22c55e',
  },
  goalButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedGoalButtonText: {
    color: '#fff',
  },
  allergiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergyButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedAllergyButton: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  allergyIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  allergyText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  selectedAllergyText: {
    color: '#d97706',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginRight: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
});
