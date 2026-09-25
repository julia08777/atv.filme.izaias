const API_URL = "https://apirequest.in/api";

export const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movie`);

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }

    const data = await response.json();

    console.log("FILMES DA API:", data);

    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};