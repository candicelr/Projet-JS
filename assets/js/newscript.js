const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

let myGlobalMovieList = [];
let listWishMovies = []; // Liste des films favoris

// Fonction qui nous permet de récupérer les détails d'un film
const chercheDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    return data.production_companies; // Retourne les compagnies de production
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    return null;
  }
};

// Fonction qui permet de rajouter des détails sur les films dans la liste
const detailMovieList = async (movies) => {
  for (let i = 0; i < movies.length; i++) {
    const details = await chercheDetails(movies[i].id);
    if (details) {
      movies[i].production_companies = details;
    }
  }
  return movies;
};

// Fonction qui permet de récupérer les films récents et de genre animation
async function allMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=1&with_genres=16`
    );
    const data = await response.json();

    if (response.status === 200) {
      myGlobalMovieList = data.results;
      myGlobalMovieList = await detailMovieList(myGlobalMovieList);
      displayMovies(myGlobalMovieList);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
}

// Fonction qui nous permet d'afficher les films par catégories.
const displayMovies = (movies) => {
  const moviePopulaire = document.getElementById("moviePopulaires");
  const movieDisney = document.getElementById("movieDisney");
  const movieJeunesse = document.getElementById("movieJeunesse");
  const movieFamilial = document.getElementById("movieFamilial");
  const movieAnime = document.getElementById("movieAnime");

  if (!moviePopulaire || !movieDisney || !movieJeunesse || !movieFamilial || !movieAnime) {
    console.error("Les conteneurs HTML requis pour les catégories de films sont manquants.");
    return;
  }

  // Réinitialisation des conteneurs HTML.
  moviePopulaire.innerHTML = "";
  movieDisney.innerHTML = "";
  movieJeunesse.innerHTML = "";
  movieFamilial.innerHTML = "";
  movieAnime.innerHTML = "";

  // Catégories de films:
  const categories = [
    { element: moviePopulaire, filter: (movie) => movie.vote_average > 8 },
    { element: movieDisney, filter: (movie) => movie.production_companies.some((company) => company.id === 2) },
    { element: movieJeunesse, filter: (movie) => movie.genre_ids.includes(10751) && movie.genre_ids.includes(28) },
    { element: movieFamilial, filter: (movie) => movie.genre_ids.includes(10751) && movie.genre_ids.includes(14) },
    { element: movieAnime, filter: (movie) => movie.original_language === "ja" }
  ];

  // Afficher les films dans chaque catégorie
  categories.forEach((category) => {
    const filteredMovies = movies.filter(category.filter).slice(0, 3);
    filteredMovies.forEach((movie) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img 
          src="${IMAGE_BASE_URL + movie.poster_path}" 
          alt="Affiche de ${movie.title}" 
          onclick="viewMovieDetails(${movie.id})"
          style="cursor: pointer;"
        >
        <img 
          src="assets/img/coeur.svg" 
          alt="Pictogramme coeur" 
          onclick="likes(event, ${movie.id})" 
          style="cursor: pointer;"
        >
      `;
      category.element.appendChild(div);
    });
  });
};

// Fonction qui permet d'afficher les détails d'un film au clic.
const viewMovieDetails = (movieId) => {
  // Naviguer vers une autre page ou afficher les détails
  window.location.href = `movieDetails.html?movieId=${movieId}`;
};

// Gestion des favoris avec changement de couleur du cœur lorsqu'on clique dessus
const likes = (event, movieId) => {
  event.stopPropagation(); // Empêche les clics de se propager

  const movie = myGlobalMovieList.find((movie) => movie.id === movieId);
  if (!movie) return;

  // On trouve l'image du cœur
  const heartIcon = event.target;

  const index = listWishMovies.findIndex((item) => item.id === movieId);
  if (index === -1) {
    // Ajouter le film aux favoris
    listWishMovies.push(movie);
    console.log("Film ajouté aux favoris:", movie);
    // Changer l'image du cœur en violet
    heartIcon.src = "assets/img/heartColor.svg";
  } else {
    // Retirer le film des favoris
    listWishMovies.splice(index, 1);
    console.log("Film retiré des favoris:", movie);
    // Revenir à l'image du cœur blanc
    heartIcon.src = "assets/img/coeur.svg";
  }
  localStorage.setItem("wishlist", JSON.stringify(listWishMovies));
};


// Charger les films au démarrage
document.addEventListener("DOMContentLoaded", allMovies);


 








