const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get('movieId');
 
// URL de base de l'API

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
 
// Fonction qui nous permet de récupérer les détails d'un film

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
// Fonction qui nous permet d'afficher les détails du film

async function displayMovieDetails() {
//On récupère dans une variable la fonction qui retourne les détails du film.
  const movieDetails = await getMovieDetails(movieId);
 
  if (!movieDetails) return;
//On crée 3 variables qui correspondent au différente balise html que l'on va chercher avec leur id.
  const containerTitle = document.getElementById("title");
  const containerDescription = document.getElementById("description");
  const containerRecap=document.getElementById("recap");
  const containerTrailer=document.getElementById("trailerContainer")
//On crée la structure Html de la partie description des films.
//Ajout d'une flèche de retour pour retourner sur la page d'accueil.
//Ajout du titre du film.
  containerTitle.innerHTML = `
        <a id="back"href="index.html"><img src="assets/img/fleche_retour.svg" alt="fléche de retour"></a>
        <h1>${movieDetails.title}</h1>`
//Ajout de l'affiche du film.
//Dans une div on y met toutes les informations complémentaires concernant le film: la date de sortie, la durée, la langue, et la note.
containerDescription.innerHTML=`
  <img src="${IMAGE_BASE_URL + movieDetails.poster_path}" alt="Affiche de ${movieDetails.title}">
  <div>
    <p><strong>Date de sortie:</strong> ${movieDetails.release_date}</p>
    <p><strong>Durée:</strong> ${movieDetails.runtime} minutes</p>
    <p><strong>Langue:</strong> ${movieDetails.original_language}</p>
    <p><strong>Note moyenne:</strong> ${movieDetails.vote_average}</p>
    <a id="button" href="#notice"><p>Voir les avis</p></a>
  </div>`
//Enfin on rajoute le resumé du film.
containerRecap.innerHTML=`
<div>
    <p><strong>Résumé:</strong> <br> <br> ${movieDetails.overview}</p>
</div>`;
//Ajout des bandes annonce selon le titre du film à la main car l'APi ne comporte pas de bande annonce.
if (movieDetails.title=="Vaiana 2"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/R80cjWvqtfA?si=sBOZa3SxDxk9VYit" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Watchmen: Chapter II"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/0WeYJ0gCFow?si=7LpyRWj5ZQmnpxfo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Miraculous World : Londres, la course contre le temps"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/qIzlTK569C4?si=htEBlZ5fDtBLEN7J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Ce Noël-là"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/7lHvWCMeKqA?si=Z25XLJxQYO-YvthI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Le Robot sauvage"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/8EncMdPhoYU?si=-ANrEYEG0ceFCkTu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Mufasa : Le Roi Lion"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/30I7r-KA0fU?si=hi3KecCbZ-5g8SL0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Vice-versa 2"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/Jlme9-wFQxk?si=7dMAk1BFdbli2gWr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Transformers : Le Commencement"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/LH54qT04Vo4?si=CYuyQwBiP3Okq9lu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Moi, moche et méchant 4"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/5HgS6G0xhLY?si=XphH29KoUA6hJYA1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Ellian et le sortilège"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/ns2IeiIgf_0?si=SWpd9EzNrGEB7WeA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Solo Leveling -ReAwakening-"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/jxA25ympM7M?si=Aexcx6tP1qsGfM1C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Le Grinch"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/uSmnMc8zawg?si=f-IPrO607VBMpxD8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Flow, le chat qui n'avait plus peur de l'eau"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/aTIFSDIEzPE?si=d93pZ2WzBFve_um9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Overlord : The Sacred Kingdom"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/w8hM0H-0KXs?si=PH7dFDK-jwn4jq4e" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Tous en scène : Thriller"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/yT0xM06V7Ac?si=46No36NEgfcP2FzX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Le Seigneur des Anneaux : La Guerre des Rohirrim"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/7jBhd-lxNWI?si=seeIMxDGYMhttGqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Un conte de Noël, ou presque"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/uiBtk8oavjc?si=xLCUA7Gel8EDkJFp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Kamp Frayeur"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/KV7e1dGITg0?si=MOT8PNZc3E6-X0jz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Kung Fu Panda 4"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/-5qyM5TSWuY?si=jQMJ6eOhooZeTaFs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
if (movieDetails.title=="Les Démons d'argile"){
  containerTrailer.innerHTML=`
  <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/AYLec_KREwc?si=U3JOpBYqWmjPjkI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
};
}
 
// Charger les détails du film au chargement de la page

displayMovieDetails();