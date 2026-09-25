import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetalhesMovieScreen({ route }) {
  const { movie } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>

      <Text style={styles.info}>
        🎬 Gênero: {movie.genre?.join(", ")}
      </Text>

      <Text style={styles.info}>
        ⭐ Avaliação: {movie.rating}/10
      </Text>

      <Text style={styles.info}>
        📅 Ano de lançamento: {movie.release_year}
      </Text>

      <Text style={styles.info}>
        🎥 Diretor: {movie.director}
      </Text>

      <Text style={styles.info}>
        ⏱️ Duração: {movie.duration_minutes} minutos
      </Text>

      <Text style={styles.info}>
        🌎 Idioma: {movie.language}
      </Text>

      <Text style={styles.info}>
        Disponível: {movie.available ? "Sim" : "Não"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F8",
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#18211B",
    marginBottom: 25
  },

  info: {
    fontSize: 16,
    color: "#66706A",
    marginBottom: 12
  }
});