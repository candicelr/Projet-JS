//Récupération des affiches des films de l'API.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

// Fonction qui permet d'afficher les films favoris
const displayWishlist = () => {
  const wishlistContainer = document.getElementById("wishlistContainer");
  wishlistContainer.innerHTML = ""; // Nettoyage

  // On charge la wishlist depuis le localStorage
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  //Si la liste enregistrée ne contient rien on affiche un message indiquant qu'il n'y a aucun film ajouté à la liste des favoris.
  if (savedWishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Aucun film favori pour le moment.</p>";
    return;
  }

  // On affiche les films:
  savedWishlist.forEach((movie) => {
    //On crée un élément div pour afficher l'affiche du film et le picto moins pour supprimer un film des favoris.
    const div = document.createElement("div");
    div.classList.add("movie-item");
    div.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="Affiche de ${movie.title}">
      <img src="assets/img/moins.svg" class="remove-favorite" alt="pictogramme moins">
    `;

    // Bouton pour retirer un film des favoris
    const removeButton = div.querySelector(".remove-favorite");
    removeButton.addEventListener("click", () => removeFromWishlist(movie.id));

    wishlistContainer.appendChild(div);
  });
};

// Fonction pour retirer un film des favoris:
const removeFromWishlist = (movieId) => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  // Retirer le film de la wishlist en filtrant par ID.
  const updatedWishlist = savedWishlist.filter((movie) => movie.id !== movieId);

  // On met à jour le localStorage
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  //On réaffiche la wishlist
  displayWishlist();
};

// On charge les favoris au démarrage
document.addEventListener("DOMContentLoaded", displayWishlist);
