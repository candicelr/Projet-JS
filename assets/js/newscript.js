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

// Fonction qui nous permet d'afficher les films
function displayMovies(movies) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // On nettoie la liste
 
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
 
// Fonction qui nous permet d'ouvrir la page des détails d'un film
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
 
  container.appendChild(detailDiv);

}
 
// Fonction qui nous permet de changer la couleur du coeur au clique
function likes(movieId) {
//On crée une variable pour l'image coeur et on va chercher l'image dans le code grâce à son id
  const heartImage = document.getElementById(`favorite-${movieId}`);
//On crée une variable pour l'image du coeur blanc
  const whiteHeart = "assets/img/coeur.svg";
//On crée une variable pour l'image du coeur violet
  const purpleHeart = "assets/img/heartColor.svg";
//Si le coeur est blanc
  if (heartImage.src.includes(whiteHeart)) {
//Alors on affiche le coeur violet au clique
    heartImage.src = purpleHeart;
// Sinon on affiche le coeur blanc
  } else {
    heartImage.src = whiteHeart;
  }
}
 
// Fonction qui nous permet de récupérer les bandes-annonces
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

// // Fonction pour afficher les bandes-annonces
// const Video = async (movieId) => {
//   try {
//     // On récupère dans une variable la fonction qui retourne les détails du film.
//     const movieDetails = await getMovieDetails(movieId);  // Utilisation de await pour attendre la réponse.
    
//     // Vérification des détails récupérés
//     console.log("Movie details:", movieDetails);  // Affichage des détails dans la console pour débogage.
    
//     // Si les détails du film ne sont pas disponibles, on arrête l'exécution.
//     if (!movieDetails) {
//       console.log("Détails du film non trouvés.");
//       return;
//     }
    
//     // Vérification du titre du film
//     console.log("Titre du film:", movieDetails.title);  // Vérification du titre du film.
    
//     // Si le titre du film est "Vaina 2", on affiche la bande-annonce
//     if (movieDetails.title === "Vaina 2") {
//       const trailerContainer = document.getElementById("trailerContainer");
      
//       // Vérification de l'élément trailerContainer
//       if (!trailerContainer) {
//         console.log("Conteneur de bande-annonce non trouvé.");
//         return;
//       }
      
//       // Affichage de la vidéo
//       trailerContainer.innerHTML = `
//         <iframe width="560" height="315" src="https://www.youtube.com/embed/R80cjWvqtfA?si=sBOZa3SxDxk9VYit" 
//           title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//           referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//       `;
//     } else {
//       console.log("Le titre du film ne correspond pas à 'Vaina 2'.");
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'affichage de la bande-annonce :", error);
//   }
// };









