console.log("hello")
//  clé API
const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
// Toute la doc de l'API est ici : https://developer.themoviedb.org/docs/getting-started

// Fonction pour afficher les films dans la liste
const disney = ["Vaiana 2","Miraculous World : Londre, la course contre le temps","Vice-Versa 2","Mufasa : Le Roi Lion","Un conte de Noël, ou presque"]
const classique = ["Le Grinch","Transformers : Le Commencement","Garfield : Héros malgrès lui"]
const jeunesse = ["Le Robot sauvage","Vaiana 2","Kung Fu Panda 4","Flow, le chat qui n'avait plus peur de l'eau","Ellian et le sortilège"]
const familial = ["Tous en scène : Thriller","Ce Noël-là","Moi, moche et méchant 4"]
const anime = ["Watchmen: Chapter II","Solo Leveling -ReAwakening-","Overlord : The Sacred Kingdom","Le Seigneur des Anneaux : La Guerre des Rohirrim","My Hero Academia: You’re Next"]
const displayMovies = (movies) => {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les films

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${
      movie.title
    }">
        `;
    movieList.appendChild(div);
  });
};

// Fonction pour récupérer les films récents
async function fetchRecentMovies() {
  // le try catch pour éviter le plantage du script si le fetch échoue
  try {
    // fetch de la base theMovieDb
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=1&with_genres=16`
    );
    // récupération de la réponse au format JSON
    const data = await response.json();
    console.log(data);
    // Appel de la fonction qui affiche les films
    if (response.status !== 401) {
      displayMovies(data.results);
    } else {
      alert(
        "Message du prof aux élèves :-)\nPensez à mettre votre clé d'API en ligne 40 du code !!!\nSinon, ça ne fonctionne pas\nInstructions ligne 38 dans le commentaire."
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
}

// Charger les films récents au chargement de la page
fetchRecentMovies();






// description
