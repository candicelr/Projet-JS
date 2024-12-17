const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
 
const categories = [
  { name: "Walt Disney Pictures", value: 2 },
  { name: "movieClassique", value: 0 },
  { name: "movieJeunesse", value: 2 },
  { name: "movieFamilial", value: 3 },
  { name: "movieAnime", value: 4 },
];
 
const myGlobalMovieList = [];
 
// Fonction pour récupérer les films récents
async function allMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=1&with_genres=16`
    );
 
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
 
    const data = await response.json();
    console.log("Films récupérés:", data);
 
    // Affiche les films récupérés
    displayMovies(data.results);
    // Sauvegarde dans myGlobalMovieList
    myGlobalMovieList.push(...data.results);
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
  }
}

// Pour aller sur la page films favoris en  cliquant sur "Voir Plus"
const wishlist = (wishlistWindow) => {
  wishlistWindow = window.open("witchlist.html");
};
// Fonction pour le menu burger du favori sur la page d'acceuil
const menuWishlist = () => {
  let menuBox = document.getElementById("menuBox");
  if (menuBox.style.display == "block") {
    menuBox.style.display = "none";
  } else {
    menuBox.style.display = "block";
  }
};

// Fonction pour récupérer les détails d'un film
async function chercheDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
 
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
 
    const data = await response.json();
    console.log(`Détails du film (${id}):`, data);
 
    return {
      productionCompanies: data.production_companies,
      releaseDate: data.release_date,
      runtime: data.runtime,
      originalLanguage: data.original_language,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      overview: data.overview,
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails du film (${id}):`, error);
    return null;
  }
}

// Fonction pour afficher les films
function displayMovies(movies) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Nettoyer la liste
 
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-item");
 
    div.innerHTML = `
<img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}" onclick="goToMovieDetailsPage(${movie.id})">
<img class="favorite" id="favorite-${movie.id}" onclick="likes(${movie.id})" src="assets/img/coeur.svg" alt="Pictogramme coeur">

    `;
 
    movieList.appendChild(div);
  });
}
 
// Fonction pour rediriger vers la page des détails d'un film
function goToMovieDetailsPage(movieId) {
  // Redirection vers une nouvelle page avec l'ID du film dans l'URL
  window.location.href = `movieDetails.html?movieId=${movieId}`;
}

 
// Fonction pour afficher les détails d'un film

async function description(movieId) {

  const movieDetails = await chercheDetails(movieId);

  if (!movieDetails) return;
 
  // Vérifie si un détail du film est déjà affiché, si oui on le remplace

  let existingDetail = document.querySelector(`#details-${movieId}`);

  if (existingDetail) {

    existingDetail.remove(); // Supprime les détails existants avant d'ajouter les nouveaux

  }

}
 
// Fonction pour gérer les likes
function likes(movieId) {
  const heartImage = document.getElementById(`favorite-${movieId}`);
  const whiteHeart = "assets/img/coeur.svg";
  const purpleHeart = "assets/img/heartColor.svg";
 
  if (heartImage.src.includes(whiteHeart)) {
    heartImage.src = purpleHeart;
  } else {
    heartImage.src = whiteHeart;
  }
}

// Charger les films au démarrage
allMovies();











