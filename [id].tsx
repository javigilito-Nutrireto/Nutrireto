import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Heart, Clock, Users, ChefHat, Zap } from 'lucide-react-native';
import { MOCK_MEALS } from '@/data/meals';
import { useMeals } from '@/hooks/meals-store';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams();
  const { favoriteMeals, toggleFavorite } = useMeals();
  
  const meal = MOCK_MEALS.find(m => m.id === id);
  
  if (!meal) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Comida no encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFavorite = favoriteMeals.includes(meal.id);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: meal.name,
          headerRight: () => (
            <TouchableOpacity onPress={() => toggleFavorite(meal.id)}>
              <Heart 
                size={24} 
                color={isFavorite ? '#ef4444' : '#6b7280'} 
                fill={isFavorite ? '#ef4444' : 'transparent'}
              />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: meal.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{meal.name}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.infoText}>15-20 min</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={16} color="#6b7280" />
              <Text style={styles.infoText}>1 porción</Text>
            </View>
            <View style={styles.infoItem}>
              <ChefHat size={16} color="#6b7280" />
              <Text style={styles.infoText}>Fácil</Text>
            </View>
          </View>

          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Información Nutricional</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Zap size={20} color="#22c55e" />
                <Text style={styles.nutritionValue}>{meal.nutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>Calorías</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>Proteínas</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbohidratos</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.fat}g</Text>
                <Text style={styles.nutritionLabel}>Grasas</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instrucciones</Text>
            {meal.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Etiquetas</Text>
            <View style={styles.tagsContainer}>
              {meal.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>
                    {tag.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  nutritionContainer: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '500',
  },
});
