const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
console.log("hello")
// Fonction pour afficher les films favoris
const displayWishlist = () => {
  const wishlistContainer = document.getElementById("wishlistContainer");
  wishlistContainer.innerHTML = ""; // Nettoyage
 
  // Charger la wishlist depuis le localStorage
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
 
  if (savedWishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Aucun film favori pour le moment.</p>";
    return;
  }
 
  // Afficher les films
  savedWishlist.forEach((movie) => {
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
 
// Fonction pour retirer un film des favoris
const removeFromWishlist = (movieId) => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  console.log(savedWishlist)
  const updatedWishlist = savedWishlist.filter((movie) => movie.id !== movieId);
 
  // Mettre à jour le localStorage
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
 
  // Réafficher la wishlist
  displayWishlist();
};

// Charger les favoris au démarrage
document.addEventListener("DOMContentLoaded", displayWishlist);
 