// Fonction pour afficher les films favoris
const displayWishlist = () => {
    const wishlistContainer = document.getElementById("wishlistContainer");
    wishlistContainer.innerHTML = "";  // Nettoyer la liste avant d'ajouter les films
  
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];  // Récupérer la wishlist depuis localStorage
  
    savedWishlist.forEach((movie) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="Affiche de ${movie.title}">
        <h3>${movie.title}</h3>
      `;
      wishlistContainer.appendChild(div);
    });
  };
  
  // Appel à la fonction pour afficher les films favoris au chargement de la page
  displayWishlist();