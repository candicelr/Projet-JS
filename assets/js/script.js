console.log("hello")
//  clé API
const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
// Toute la doc de l'API est ici : https://developer.themoviedb.org/docs/getting-started

// Fonction pour afficher les films dans la liste
const displayMovies = (movies) => {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les films

  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <h2>${movie.title}</h2>
          <p>Date de sortie : ${movie.release_date}</p>
          <p>${movie.overview || "Résumé indisponible."}</p>
          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${
      movie.title
    }">
        `;
    movieList.appendChild(li);
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
