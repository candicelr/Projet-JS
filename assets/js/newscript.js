//Ajout de la clé API grâce à laquelle on récupère nos films.
const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
//Ajout de l'URL de l'API.
const BASE_URL = "https://api.themoviedb.org/3";
//Ajout des affiches des films provenant de l'API.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

let myGlobalMovieList = []; //Liste des films.
let listWishMovies = []; // Liste des films favoris.

// Fonction qui nous permet de récupérer les détails d'un film
const chercheDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    return data.production_companies; // Retourne les compagnies de production
    //Si il y a un problème dans la récupération des détails on affiche un message d'erreur.
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    return null;
  }
};

// Fonction qui permet de rajouter des détails sur les films dans la liste
const detailMovieList = async (movies) => {
  //On itère sur tout les films de la liste.
  for (let i = 0; i < movies.length; i++) {
    // On appelle la fonction 'chercheDetails' pour obtenir les détails du film en utilisant son ID.
    const details = await chercheDetails(movies[i].id);
     // Si des détails ont été trouvés pour ce film, on les ajoute à l'objet 'movies[i]'.
    if (details) {
       // Ajout des informations des compagnies de production dans l'objet du film.
      movies[i].production_companies = details;
    }
  }
  return movies;
};

// Fonction qui permet de récupérer les films récents et de genre animation
async function allMovies() {
  try {
     // Requête HTTP afin de récupérer les films avec un genre spécifique (ici, "Animation" avec l'ID 16).
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=1&with_genres=16`
    );
      // On converti la réponse en format JSON pour pouvoir la traiter.
    const data = await response.json();
    // Si la requête est réussie le code est 200.
    if (response.status === 200) {
       // On stocke les films récupérés dans la variable myGlobalMovieList.
      myGlobalMovieList = data.results;
      // On appel de la fonction detailMovieList pour ajouter des détails supplémentaires aux films récupérés.
      myGlobalMovieList = await detailMovieList(myGlobalMovieList);
       // On affiche les films récupérés avec les détails ajoutés.
      displayMovies(myGlobalMovieList);
    }
    //En cas d'erreur de récupération des données on affiche un message d'erreur.
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
  // On vérifie si les conteneurs HTML pour les catégories de films existent.
  if (!moviePopulaire || !movieDisney || !movieJeunesse || !movieFamilial || !movieAnime) {
    // Si l'un des conteneurs est manquant, on affiche un message d'erreur dans la console.
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
    // On filtre les films de la catégorie en fonction du critère de filtrage, puis on selectionne les 3 premiers afin d'en avoir 3 par catégorie.
    const filteredMovies = movies.filter(category.filter).slice(0, 3);
    // Pour chaque film filtré, on crée un élément HTML et on l'ajouter à la catégorie correspondante
    filteredMovies.forEach((movie) => {
      // On crée un élément div pour afficher chaque film
      const div = document.createElement("div");
      //La div contient l'affiche du film et le picto coeur pour ajouter un film aux favoris.
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
      // On ajoute l'élément div au conteneur HTML de la catégorie correspondante.
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

  // Charger la wishlist depuis le localStorage (si elle existe)
  let listWishMovies = JSON.parse(localStorage.getItem("wishlist")) || [];

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

  // Sauvegarder la liste mise à jour dans le localStorage
  localStorage.setItem("wishlist", JSON.stringify(listWishMovies));
};

// Charger les films au démarrage
document.addEventListener("DOMContentLoaded", allMovies);
