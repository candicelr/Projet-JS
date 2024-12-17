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
 
  const container = document.getElementById("movieList");
 
  const detailDiv = document.createElement("div");

  detailDiv.id = `details-${movieId}`;  // Ajouter un ID unique pour pouvoir gérer plusieurs films

  detailDiv.classList.add("movie-details");
 
  detailDiv.innerHTML = `
<h3>Détails du film</h3>
<p><strong>Date de sortie:</strong> ${movieDetails.releaseDate}</p>
<p><strong>Durée:</strong> ${movieDetails.runtime} minutes</p>
<p><strong>Langue:</strong> ${movieDetails.originalLanguage}</p>
<p><strong>Note moyenne:</strong> ${movieDetails.voteAverage}</p>
<p><strong>Résumé:</strong> ${movieDetails.overview}</p>

  `;
 
  container.appendChild(detailDiv);

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
 
// Fonction pour afficher les détails d'un film
async function description(movieId) {
  const movieDetails = await chercheDetails(movieId);
  if (!movieDetails) return;
 
  const container = document.getElementById("movieList");
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("movie-details");
 
  detailDiv.innerHTML = `
<h3>Détails du film</h3>
<p><strong>Date de sortie:</strong> ${movieDetails.releaseDate}</p>
<p><strong>Durée:</strong> ${movieDetails.runtime} minutes</p>
<p><strong>Langue:</strong> ${movieDetails.originalLanguage}</p>
<p><strong>Note moyenne:</strong> ${movieDetails.voteAverage} (${movieDetails.voteCount} votes)</p>
<p><strong>Résumé:</strong> ${movieDetails.overview}</p>
  `;
 
  container.appendChild(detailDiv);
}
 
// Fonction pour récupérer les bandes-annonces
async function fetchMovieTrailers(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=videos`
    );
 
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
 
    const data = await response.json();
    const trailers = data.videos.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
 
    return trailers;
  } catch (error) {
    console.error("Erreur lors de la récupération des bandes-annonces:", error);
    return [];
  }
}
 
// Fonction pour afficher les bandes-annonces
async function displayMovieTrailers(movieId) {
  const trailerContainer = document.getElementById("trailerContainer");
  trailerContainer.innerHTML = "";
 
  const trailers = await fetchMovieTrailers(movieId);
 
  if (trailers.length === 0) {
    trailerContainer.innerHTML = `<p>Aucune bande-annonce disponible pour ce film.</p>`;
    return;
  }
 
  trailers.forEach((trailer) => {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
    iframe.title = trailer.name;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
 
    trailerContainer.appendChild(iframe);
  });
}
 
// Charger les films au démarrage
allMovies();











