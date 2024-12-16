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
    console.log(data);
    // Appel de la fonction qui affiche les films
    if (response.status !== 401) {
      displayMovies(data.results);
      // myGlobalMovieList=[...data.results]
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
const detailMovieList = (aaa) => {
  for (thisMovie of aaa) {
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
             <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
           <img class="favorite" id="${movie.id}" onclick="likes(${movie.id})" src="assets/img/coeur.svg" alt="pictogramme coeur">
           `;
    movieList.appendChild(div);
  });
  // Affichage catégories Classique si la note est supérieur à 8


  //  const movieClassique = document.getElementById("movieClassique");
  //  div.innerHTML = "";
  //  let compteurClassique = 0;
  //  if (compteurClassique < 3){
  //   if (movies.vote_average > 8){
  //     movies.forEach((movie) => {
  //       div.innerHTML = `
  //       <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
  //       <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
  //       `;
  //     movieClassique.appendChild(div);
  //     })
  //   }
  //   compteurClassique++
  //  }
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
    //On crée une variable pour le coeur blanc//
    let whiteHeart = "assets/img/coeur.svg";
    //On crée une variable pour le coeur violet//
    let colorHeart = "assets/img/heartColor.svg";

    image.forEach((image) => {
      //On rajoute une évenement au clique sur l'image//
      //si l'image cliqué est le coeur blanc//
      if (image.src.includes(whiteHeart)) {
        //alors on affiche le coeur violet//
        image.src = colorHeart;
        //Sinon on affiche le coeur blanc
      } else {
        image.src = whiteHeart;
      }
    });
  };
  changeColorHeart();
};







//Récuperer l'ID pour le mettre sur l'affiche (morceau de html) la deuxième c'est le coeur (recup son id) et le mettre sur l'affiche. Comparer cet ID avec l'ID des autres films. Ensuite créer la page -> récuperer les infos dans le tableau result.


//   if (heartImage.src.includes(whiteHeart)) {
//     heartImage.src = purpleHeart;
//     // Appeler la fonction pour afficher les infos du film
//     await afficheDetails(movieId);
//   } else {
//     heartImage.src = whiteHeart;
//     // Supprimer l'affichage si nécessaire (optionnel)
//     supprimeDetails(movieId);
//   }
// };
// const afficheDetails = async (movieId) => {
//   try {
//     const response = await fetch(
//     );
//     const movie = await response.json();

//     // Ajouter les informations sur la page
const description = (abc) => {
  abc = window.open("description.html");
};
const container = document.getElementById("movieList");
const detailDiv = document.createElement("div");
detailDiv.id = `details-${movieId}`; // ID unique pour pouvoir supprimer ou modifier
detailDiv.classList.add("movie-details");
detailDiv.innerHTML = `
      <h3>${movie.title}</h3>
      <img src="${IMAGE_BASE_URL+movie.poster_path}" alt="Affiche de ${movie.title}">
      <div>
      <p>"<strong>Date de sortie:</strong> ${release_date}"</p>
      <p>"<strong>Durée: </strong>${runtime} minutes"</p>
      <p>"<strong>Langue: </strong>${originial_language}"</p>
      <p>"<strong>Status: </strong>${vote_count}"</p>
      <p>"<strong>Note: </strong>${vote_average}"</p>
      <p>"<strong>Pays de production: </strong>${origin_country}"</p>
      </div>
      <p>${movie.overview}</p>
            
             
    `;

//     container.appendChild(detailDiv);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des détails du film :", error);
//   }
// };
// const supprimeDetails = (movieId) => {
//   const detailDiv = document.getElementById(`details-${movieId}`);
//   if (detailDiv) {
//     detailDiv.remove();
//   }
// };
// const displayMovies = (movies) => {
//   const movieList = document.getElementById("movieList");
//   movieList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les films

//   movies.forEach((movie) => {
//     const div = document.createElement("div");
//     div.innerHTML = `
//       <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
//       <img class="favorite" id="${movie.id}" onclick="likes(${movie.id})" src="assets/img/coeur.svg" alt="pictogramme coeur">
//     `;
//     movieList.appendChild(div);
//   });
// };
