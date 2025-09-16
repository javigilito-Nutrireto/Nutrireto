import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function HomeScreen() {
  const [meal, setMeal] = useState(null);

  const generateMeal = () => {
    // Ejemplo de menú generado (esto luego se conecta a la API de ChatGPT o tu BD)
    const exampleMeal = {
      name: "Ensalada de Pollo",
      ingredients: "Pollo, lechuga, tomate, aguacate",
      calories: "350 kcal",
      image: "https://via.placeholder.com/200", // aquí puedes poner una URL real
    };
    setMeal(exampleMeal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽 Tu comida del día</Text>
      {meal ? (
        <View style={styles.card}>
          <Image source={{ uri: meal.image }} style={styles.image} />
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text>Ingredientes: {meal.ingredients}</Text>
          <Text>Calorías: {meal.calories}</Text>
        </View>
      ) : (
        <Text>No has generado una comida todavía</Text>
      )}
      <Button title="Generar comida del día" onPress={generateMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 20, backgroundColor: "#f4f4f4", borderRadius: 10, marginBottom: 20 },
  image: { width: 200, height: 200, marginBottom: 10, borderRadius: 10 },
  mealName: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});
