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
allMovies()
 
//Détail à rajouter dans myGlobalMovieList
 
const chercheDetails = async (id) => {
  try {
    const response2 = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
    );
    const data2 = await response2.json();
    console.log(data2);
    let myObj = {};
    // Récupérer dans myObj les infos de data qui nous intéressent
 
    myObj.product = [...data2.production_companies];
    console.log("mes données", myObj);
    return myObj;
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};
console.log(chercheDetails(1241982));
 
// Fonction qui permet d'utiliser la compagnie du film
const detailMovieList =(aaa)=>{
  for(thisMovie of aaa){
    let thisMovieDetail = chercheDetails(thisMovie.id);
    aaa[thisMovie] = thisMovieDetail
  }
}
// detailMovieList(allMovies())
const displayMovies = (movies) => {
  for (category of categories) {
    thisCategoryName = category.name;
    thisCategoryMovies = movies.filter((e) =>
      e.genre_ids.includes(category.value)
    );
    //J'ai ma liste de films de la catégorie Animation
    for (thisMovie of thisCategoryMovies) {
      //Pour chaque film, j'appelle la fonction chercheDetail(movie)
      let myMovie = detailMovieList(thisMovie);
    }
  }
 
  for (thisMovie of movies) {
    const movieGenreId = movies.genre_ids;
  }
 
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les films
 
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-item");
    div.innerHTML = `
             <img id="${movie.id}" class="affiche" onclick="goToMovieDetailsPage(${movie.id})" src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${
      movie.title
    }">
           <img class="favorite" id="${movie.id}" onclick="likes(${
      movie.id
    })" src="assets/img/coeur.svg" alt="pictogramme coeur">
           `;
    movieList.appendChild(div);
  });
 
};
 
// // Fonction pour le menu burger du favori sur la page d'acceuil
// const menuWishlist = () => {
//   let menuBox = document.getElementById("menuBox");
//   if (menuBox.style.display == "block") {
//     menuBox.style.display = "none";
//   } else {
//     menuBox.style.display = "block";
//   }
// };
let listWishMovies = [];  // Liste des films favoris
 
// Fonction pour gérer le changement de couleur du cœur et ajouter/supprimer des films de la liste des favoris
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
 
// Fonction qui nous permet d'ouvrir la page des détails d'un film
function goToMovieDetailsPage(movieId) {
  // Redirection vers une nouvelle page avec l'ID du film dans l'URL
  window.location.href = `movieDetails.html?movieId=${movieId}`;
}
 








