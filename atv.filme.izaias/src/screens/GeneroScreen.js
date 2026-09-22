import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function GenerosScreen({ navigation }) {
  const [generos, setGeneros] = useState([
    { id: 28, name: "Ação" },
    { id: 35, name: "Comédia" },
    { id: 18, name: "Drama" }
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Gêneros de Filmes</Text>
      <FlatList
        data={generos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MoviesScreen", { generoId: item.id, generoNome: item.name })}
          >
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.generoId}>ID do Gênero: {item.id}</Text>
            </View>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7F8", padding: 16, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#18211B" },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E8E5",
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#18211B" },
  generoId: { fontSize: 13, color: "#66706A", marginTop: 4 },
  arrow: { fontSize: 24, color: "#E50914", fontWeight: "bold" },
});