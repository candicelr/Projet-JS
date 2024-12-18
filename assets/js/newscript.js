const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const myGlobalMovieList = [];

const displayMovies = (movies) => {
  
// Affichage catégories Classique si la note est supérieur à 8
   const moviePopulaire = document.getElementById("moviePopulaires");
   moviePopulaire.innerHTML = "";
   let compteurPopulaire = 0;
   
    const populaireMovies = movies.filter(movie => movie.vote_average > 8);
    populaireMovies.forEach((movie) => {
      // Affichage d'uniquement 3 film
      if (compteurPopulaire < 3) {
        const div = document.createElement("div");
        // création de l'HTML
        div.innerHTML = `
          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
          <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
        `;
        moviePopulaire.appendChild(div);
        compteurPopulaire++;
      }
    });
  // Affichage categorie Disney

  const movieDisney = document.getElementById("movieDisney");
  movieDisney.innerHTML = "";
  let compteurDisney = 0;

  // filtrage en fonction de la compagnie Disney 
  console.log(movies)
  const disneyMovies = movies.filter((e)=> e.production_companies[0].id === 2);

  // Limiter le nombre de films affichés à 3
  disneyMovies.forEach((movie) => {
    if (compteurDisney < 3){
      const div = document.createElement("div");
      // création de l'HTML
      div.innerHTML = `
        <img src="${IMAGE_BASE_URL + (movie.poster_path )}" alt="Affiche de ${movie.title}">
        <img onclick="likes()" src="assets/img/coeur.svg" alt="Pictogramme coeur">
      `;
      movieDisney.appendChild(div);
      compteurDisney++; // Incrémentation du compteur pour éviter de dépasser 3 films
  }



  });
// Affichage catégorie Jeunesse et Familial 
  const movieJeunesse = document.getElementById("movieJeunesse");
  const movieFamilial = document.getElementById("movieFamilial");

  movieJeunesse.innerHTML = "";
  movieFamilial.innerHTML = "";

  let compteurJeunesse = 0;
  let compteurFamilial = 0;

  // Filtrage en fonction du genre jeunesse
    const jeunesseMovies = movies.filter(movie => movie.genre_ids.includes(10751) && movie.genre_ids.includes(28)); 
    jeunesseMovies.forEach((movie) => {
      // Affichage d'uniquement 3 film
      if (compteurJeunesse < 3) {
        const div = document.createElement("div");
        // création de l'HTML
        div.innerHTML = `
          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
          <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
        `;
        movieJeunesse.appendChild(div);
        compteurJeunesse++;
      }
      
    });

  // Filtrage en fonction du genre familial
    const familialMovies = movies.filter(movie => movie.genre_ids.includes(10751) && movie.genre_ids.includes(14));
    familialMovies.forEach((movie) => {
      // Affichage d'uniquement 3 film
      if (compteurFamilial < 3) {
        const div = document.createElement("div");
        // création de l'HTML
        div.innerHTML = `
          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
          <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
        `;
        movieFamilial.appendChild(div);
        compteurFamilial++;
      }
      });
// Affichage Anime
  const movieAnime = document.getElementById("movieAnime");
  movieAnime.innerHTML = "";
  let compteurAnime = 0;
  // Filtrage des films d'animation en japonais
  const AnimeMovies = movies.filter(movie => movie.original_language === 'ja'); 

  AnimeMovies.forEach((movie) => {
    if (compteurAnime < 3) {  
      // Vérification du compteur pour limiter l'affichage à 3 films
      const div = document.createElement("div");
      // création de l'HTML
      div.innerHTML = `
        <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
        <img onclick="likes()" src="assets/img/coeur.svg" alt="Pictogramme coeur">
      `;
      movieAnime.appendChild(div);
      compteurAnime++; // Incrémentation du compteur pour limiter à 3 films
    }
});



    
}

const chercheDetails = async (id) => {
  try {
    const response2 = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
    const data2 = await response2.json();
    
    // Récupérer dans myObj les infos de data qui nous intéressent
    return data2.production_companies;
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    return null;
  }
};



// Fonction qui permet d'utiliser la compagnie du film
const detailMovieList = async (mGML)=>{
  let counter = 0 ;
  for(let i=0; i<mGML.length;i++){
    let thisMovieDetail = await chercheDetails(mGML[i].id);
    if (thisMovieDetail){
      counter++
      mGML[i].production_companies = thisMovieDetail
    }
    else{
      console.log("erreur : ",mGML[i].id)
    }
  }
  if (counter === mGML.length){
    return mGML
  } else {
    return mGML
  }
}
// Fonction pour récupérer les films récents et de genre d'animation !!
async function allMovies() {
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
      myGlobalMovieList.push(...data.results.filter(movie => !myGlobalMovieList.includes(movie)));
      let newList = await detailMovieList(myGlobalMovieList);
      console.log("ajout detail",newList)
      displayMovies(newList);
      
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }


};
await allMovies()
console.log("tout mes films",myGlobalMovieList)
//Détail à rajouter dans myGlobalMovieList








// Pour aller sur la page films favoris en  cliquant sur "Voir Plus"
const wishlist = (wishlistWindow) => {
  wishlistWindow = window.open("wishlist.html");
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
let listWishMovies = [];
const likes = (movieId) => {
  //Fonction qui permet de changer la couleur du coeur lorsqu'on clique dessus//
  const changeColorHeart = () => {
    //On crée une variable image//
    let image = document.querySelectorAll(".favorite");
    //On crée une variable pour le coeur blanc//
    let whiteHeart = "assets/img/coeur.svg";
    //On crée une variable pour le coeur violet//
    let colorHeart = "assets/img/heartColor.svg";

    image.forEach((image) => {
      //On rajoute une évenement au clique sur l'image//
      image.addEventListener("click", function () {
        //si l'image cliqué est le coeur blanc//
        if (image.src.includes(whiteHeart)) {
          //alors on affiche le coeur violet//
          image.src = colorHeart;
          //Sinon on affiche le coeur blanc
        } else {
          image.src = whiteHeart;
        }
      });
    });
  };
  changeColorHeart();
};








