document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("moviesContainer");

  axios.get("http://localhost/cinema-backend/controllers/get_movie.php")
    .then(response => {
      const movies = response.data;

      if (!Array.isArray(movies) || movies.length === 0) {
        container.innerHTML = "<p>No movies available right now.</p>";
        return;
      }

      movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
          <img src="http://localhost/cinema-backend/uploads/${movie.poster_url}" alt="${movie.title}" class"poster" />
          <h3>${movie.title}</h3>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <button class="book-btn" data-title="${movie.title}">Book Now</button>
        `;

        container.appendChild(card);
      });

      document.querySelectorAll(".book-btn").forEach(button => {
        button.addEventListener("click", function () {
          const movieTitle = this.dataset.title;
          localStorage.setItem("selected_movie", movieTitle);
          window.location.href = "booking.html";
        });
      });
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
      container.innerHTML = "<p>Could not load movies. Please try again later.</p>";
    });
});
function logout() {
  window.location.href = 'login.html';
}