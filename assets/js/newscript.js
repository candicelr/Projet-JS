const API_KEY = "ddcf0bf3717e635e5e6832d2cab2fcdf";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const categories = [{name:"movieDisney",value:1},{name:"movieClassique",value:0},{name:"movieJeunesse",value:2},{name:"movieFamilial",value:3},{name:"movieAnime",value:4}]

const myGlobalMovieList = [];

// Fonction pour récupérer les films récents
async function allMovies() {
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
        myGlobalMovieList=[...data.results]
      } else {
        alert(
          "Pas de clé API"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  }

//Détail à rajouter dans myGlobalMovieList

const chercheDetails = async(id) =>{
    try{
        const response2 = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`
          );
          const data2 = await response2.json();
          console.log(data2)
        let myObj = {};
        // Récupérer dans myObj les infos de data qui nous intéressent
        let product = data2.production_companies[0]
        myObj = {product}
        console.log(myObj)
        return myObj
        
    }
    catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }};
console.log(chercheDetails(1299652));
  
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
  allMovies()

const detailMovieList =(aaa)=>{
    for(thisMovie of aaa){
      let thisMovieDetail = chercheDetails(thisMovie.id);

    }
}
const displayMovies = (movies) => {
    for (category of categories){
     thisCategoryName = category.name
     thisCategoryMovies = movies.filter(e=> e.genre_ids.includes(category.value))
     //J'zai ma liste de films de la catégorie Animation
     for (thisMovie of thisCategoryMovies){
     //Pour chaque film, j'appelle la fonction chercheDetail(movie)
     let myMovie = chercheDetails(thisMovie)
   
     }
    }
   
     for (thisMovie of movies){
   
     
     const movieGenreId = movies.genre_ids}
     
     
     const movieList = document.getElementById("movieList");
     movieList.innerHTML = ""; // Nettoyer la liste avant d'ajouter les films
   
     movies.forEach((movie) => {
       const div = document.createElement("div");
       div.innerHTML = `
             <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${
         movie.title
       }">
           <img onclick="likes()" src="assets/img/coeur.svg" alt="pictogramme coeur">
           `;
       movieList.appendChild(div);
     });
}