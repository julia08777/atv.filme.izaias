import React, { useEffect, useState } from "react";
import {View,Text,FlatList,StyleSheet,ActivityIndicator,TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMovies } from "../services/api";

export default function MoviesScreen({ route, navigation }) {
  const { generoNome } = route.params;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        console.log("RESPOSTA DA API:", data);

        const nomesGeneros = {
          "Ação": "Action",
          "Drama": "Drama",
          "Ficção Científica": "Sci-Fi"
        };

        const generoAPI = nomesGeneros[generoNome];

        const filmesFiltrados = data.filter((movie) =>
          movie.genre?.some(
            (genre) =>
              genre.toLowerCase() === generoAPI.toLowerCase()
          )
        );

        setMovies(filmesFiltrados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar filmes:", error);
        setLoading(false);
      });
  }, [generoNome]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>
          Carregando filmes...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>
        Filmes de {generoNome}
      </Text>

      {movies.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhum filme encontrado para este gênero.
        </Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetalhesMovieScreen", {
                  movie: item
                })
              }
            >
              <View style={styles.info}>
                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Text style={styles.detailText}>
                  🎬 Gênero: {item.genre?.join(", ")}
                </Text>

                <Text style={styles.detailText}>
                  ⭐ Avaliação: {item.rating}/10
                </Text>

                <Text style={styles.detailText}>
                  📅 Lançamento: {item.release_year}
                </Text>

                <Text style={styles.detailText}>
                  🎥 Diretor: {item.director}
                </Text>

                <Text style={styles.detailText}>
                  ⏱️ Duração: {item.duration_minutes} minutos
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F8",
    padding: 16
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  loadingText: {
    marginTop: 10,
    color: "#66706A"
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#18211B"
  },

  emptyText: {
    textAlign: "center",
    color: "#66706A",
    marginTop: 20
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4E8E5"
  },

  info: {
    flex: 1
  },

  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#18211B",
    marginBottom: 8
  },

  detailText: {
    fontSize: 14,
    color: "#66706A",
    marginTop: 5
  }
});