import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Clock, Zap } from 'lucide-react-native';
import { Meal } from '@/types';
import { useMeals } from '@/hooks/meals-store';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export default function MealCard({ meal, onPress }: MealCardProps) {
  const { favoriteMeals, toggleFavorite } = useMeals();
  const isFavorite = favoriteMeals.includes(meal.id);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: meal.image }} style={styles.image} />
      
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(meal.id)}
      >
        <Heart 
          size={20} 
          color={isFavorite ? '#ef4444' : '#fff'} 
          fill={isFavorite ? '#ef4444' : 'transparent'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{meal.name}</Text>
        
        <View style={styles.nutritionRow}>
          <View style={styles.nutritionItem}>
            <Zap size={16} color="#22c55e" />
            <Text style={styles.nutritionText}>{meal.nutrition.calories} kcal</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.nutritionText}>15-20 min</Text>
          </View>
        </View>

        <View style={styles.macrosRow}>
          <Text style={styles.macroText}>P: {meal.nutrition.protein}g</Text>
          <Text style={styles.macroText}>C: {meal.nutrition.carbs}g</Text>
          <Text style={styles.macroText}>G: {meal.nutrition.fat}g</Text>
        </View>

        <View style={styles.tagsContainer}>
          {meal.tags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  nutritionText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  macroText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '500',
  },
});
