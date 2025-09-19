import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Filter, Calendar } from 'lucide-react-native';
import { useMeals } from '@/hooks/meals-store';
import { useUser } from '@/hooks/user-store';
import MealCard from '@/components/MealCard';
import { router } from 'expo-router';

export default function MenuScreen() {
  const { dailyMeals, mealHistory } = useMeals();
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleMealPress = (mealId: string) => {
    router.push(`/meal/${mealId}`);
  };

  const selectedDayMeals = selectedDate === new Date().toISOString().split('T')[0] 
    ? dailyMeals 
    : mealHistory.find(day => day.date === selectedDate);

  const availableDates = [
    new Date().toISOString().split('T')[0],
    ...mealHistory.map(day => day.date)
  ].filter((date, index, arr) => arr.indexOf(date) === index);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Menú del Día</Text>
        <Text style={styles.subtitle}>
          Plan {user.subscriptionPlan.toUpperCase()} - {selectedDayMeals?.maxMeals || 0} comidas máximo
        </Text>
      </View>

      <View style={styles.dateSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {availableDates.slice(0, 7).map((date) => {
            const dateObj = new Date(date);
            const isToday = date === new Date().toISOString().split('T')[0];
            const isSelected = date === selectedDate;
            
            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateButton,
                  isSelected && styles.selectedDateButton
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.dateText,
                  isSelected && styles.selectedDateText
                ]}>
                  {isToday ? 'Hoy' : dateObj.getDate()}
                </Text>
                <Text style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText
                ]}>
                  {dateObj.toLocaleDateString('es-ES', { weekday: 'short' })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Calendar size={20} color="#22c55e" />
          <Text style={styles.statText}>
            {selectedDayMeals?.meals.length || 0} de {selectedDayMeals?.maxMeals || 0} comidas
          </Text>
        </View>
      </View>

      <View style={styles.mealsContainer}>
        {selectedDayMeals?.meals.length === 0 ? (
          <View style={styles.emptyState}>
            <Search size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No hay comidas para este día</Text>
            <Text style={styles.emptyText}>
              {selectedDate === new Date().toISOString().split('T')[0] 
                ? 'Ve a la pantalla principal para generar tu menú de hoy'
                : 'Este día no tiene comidas generadas'
              }
            </Text>
          </View>
        ) : (
          selectedDayMeals?.meals.map((meal) => (
            <MealCard 
              key={meal.id} 
              meal={meal} 
              onPress={() => handleMealPress(meal.id)}
            />
          ))
        )}
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
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  dateSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDateButton: {
    backgroundColor: '#22c55e',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedDateText: {
    color: '#fff',
  },
  dayText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  selectedDayText: {
    color: '#dcfce7',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  mealsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
