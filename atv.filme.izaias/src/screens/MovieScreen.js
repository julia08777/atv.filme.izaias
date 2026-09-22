import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MoviesScreen({ route }) {
  const { generoId, generoNome } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=1f54413125f4f80838f796446d7237f9&with_genres=${generoId}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => {
    console.log("RESPOSTA DA API:", data);

    setMovies(data.results || []);
    setLoading(false);
})
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [generoId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Filmes de {generoNome}</Text>
      {movies.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum filme encontrado para este gênero.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/70x105?text=Sem+Capa"
                }}
                style={styles.poster}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.detailText}>⭐ Avaliação: {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}/10</Text>
                <Text style={styles.detailText}>📅 Lançamento: {item.release_date || "N/A"}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7F8", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#18211B" },
  emptyText: { textAlign: "center", color: "#66706A", marginTop: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E8E5",
  },
  poster: { width: 70, height: 105, borderRadius: 8 },
  info: { marginLeft: 14, flex: 1 },
  title: { fontSize: 18, fontWeight: "bold", color: "#18211B" },
  detailText: { fontSize: 13, color: "#66706A", marginTop: 4 },
});


