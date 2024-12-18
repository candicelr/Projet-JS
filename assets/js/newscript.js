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
    console.log("allMovies",data);
    
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


let listWishMovies = [];
const likes = (movieId) => {
  // Fonction qui change la couleur du cœur et gère l'ajout/suppression de films des favoris
  const changeColorHeart = (image, movieId) => {
    const whiteHeart = "assets/img/coeur.svg";
    const colorHeart = "assets/img/heartColor.svg";
    
    // Si le cœur est blanc, on le met en violet (ajout aux favoris)
    if (image.src.includes(whiteHeart)) {
      image.src = colorHeart;
      addToWishlist(movieId);  // Ajout du film à la liste des favoris
    } else {
      image.src = whiteHeart;
      removeFromWishlist(movieId);  // Retrait du film de la liste des favoris
    }
  };

  // Fonction pour ajouter un film à la liste des favoris
  const addToWishlist = (movieId) => {
    const movie = myGlobalMovieList.flat().find(movie => movie.id === movieId);  // Recherche le film dans la liste globale
    if (movie && !listWishMovies.includes(movie)) {  // Si le film n'est pas déjà dans les favoris
      listWishMovies.push(movie);  // Ajouter à la liste des favoris
      console.log("Film ajouté aux favoris:", movie);
    }
  };
  console.log("ma wishlist",listWishMovies)

  // Fonction pour retirer un film de la liste des favoris
  const removeFromWishlist = (movieId) => {
    listWishMovies = listWishMovies.filter(movie => movie.id !== movieId);  // Filtrer pour retirer le film
    console.log("Film retiré des favoris:", movieId);
  };

  // Recherche tous les cœurs sur la page et change la couleur du cœur correspondant au film cliqué
  const heartIcons = document.querySelectorAll(".favorite");
  heartIcons.forEach((icon) => {
    if (icon.id == movieId) {  // Trouver l'icône du cœur du film cliqué
      icon.addEventListener("click", () => changeColorHeart(icon, movieId));
    }
  });
}

// Fonction pour aller à la page des favoris
const wishlist = () => {
  localStorage.setItem('wishlist', JSON.stringify(listWishMovies)); // Sauvegarder la wishlist dans le localStorage
  window.location.href = 'wishlist.html'; // Aller à la page des favoris
};