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
      displayMovies(data.results);
      myGlobalMovieList.push(data.results)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
}
allMovies();

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
    div.innerHTML = `
             <img id="${movie.id}" class="affiche" src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${
      movie.title
    }">
           <img class="favorite" id="${movie.id}" onclick="likes(${
      movie.id
    })" src="assets/img/coeur.svg" alt="pictogramme coeur">
           `;
    movieList.appendChild(div);
  });
//   const div = document.createElement("div");
//   const movieClassique = document.getElementById("movieClassique");
//   div.innerHTML = "";
//   let compteurClassique = 0;
//   if (compteurClassique < 3){
//    if (movies.vote_average > 8){
//      movies.forEach((movie) => {
//        div.innerHTML = `
//        <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
//        <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
//        `;
//      movieClassique.appendChild(div);
//      });
//    };
//    compteurClassique++
//   };

// // Affichage catégorie Jeunesse et Familial
//  const movieJeunesse = document.getElementById("movieJeunesse");
//  const movieFamilial = document.getElementById("movieFamilial");
//  div.innerHTML = "";
//  div.innerHTML = "";
//  let compteurJeunesse = 0 ;
//  let compteurFamilial = 0;
//  if (compteurJeunesse < 3){
//    for (let i=0; i< (movies.genre_ids).length; i++ ){
//      if (movies.genre_ids[i] === 10751){
//          movies.forEach((movie)=> {
//          div.innerHTML = `
//          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
//          <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
//          `;
//          movieJeunesse.appendChild(div)
//        });
//      };
//    };
//    compteurJeunesse++
//  }
//  else if (compteurFamilial < 3){
//    for (let i=0; i< (movies.genre_ids).length; i++ ){
//      if (movies.genre_ids[i] === 10751){
//          movies.forEach((movie)=> {
//          div.innerHTML = `
//          <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
//          <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
//          `;
//          movieFamilial.appendChild(div)
//        });
//      };
//    };
//    compteurFamilial++
//  };
};
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
    let afficheWishlist=document.querySelector(".affiche")
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
          // film={
          //   affiche: IMAGE_BASE_URL + myGlobalMovieList.poster_path,
          //   nom:myGlobalMovieList.title,
          // }
          // listWishMovies.push(film)

          
          //Sinon on affiche le coeur blanc
        } else {
          image.src = whiteHeart;
        }
      });
    });
  };
  changeColorHeart();
};
console.log("tous mes films:" ,myGlobalMovieList,listWishMovies)