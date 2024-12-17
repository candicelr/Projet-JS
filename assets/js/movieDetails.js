const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get('movieId');
 
// URL de base de l'API

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
 
// Fonction pour récupérer les détails d'un film

async function getMovieDetails(id) {

  try {

    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);

    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Erreur lors de la récupération des détails du film :", error);

    return null;

  }

}
 
// Fonction pour afficher les détails du film

async function displayMovieDetails() {

  const movieDetails = await getMovieDetails(movieId);
 
  if (!movieDetails) return;
 
  const containerTitle = document.getElementById("title");
  const containerDescription = document.getElementById("description");
  containerTitle.innerHTML = `
    <div id="title">
        <a href="index.html"><img src="assets/img/fleche_retour.svg" alt="fléche de retour"></a>
        <h1>${movieDetails.title}</h1>
    <div/>`
containerDescription.innerHTML=`

  <img src="${IMAGE_BASE_URL + movieDetails.poster_path}" alt="Affiche de ${movieDetails.title}">
  <p><strong>Date de sortie:</strong> ${movieDetails.release_date}</p>
  <p><strong>Durée:</strong> ${movieDetails.runtime} minutes</p>
  <p><strong>Langue:</strong> ${movieDetails.original_language}</p>
  <p><strong>Note moyenne:</strong> ${movieDetails.vote_average}</p>
  <p><strong>Résumé:</strong> ${movieDetails.overview}</p>
`;

}
 
// Charger les détails du film au chargement de la page

displayMovieDetails();

 