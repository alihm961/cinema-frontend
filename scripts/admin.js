const adminId = localStorage.getItem("is_admin");
if (!is_admin) {
  window.location.href = "login.html";
}

document.getElementById("movieForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("movieTitle").value;
  const genre = document.getElementById("movieGenre").value;
  const poster_url = document.getElementById("moviePoster").value;
  const trailer_url = document.getElementById("movieTrailer").value;

  axios.post("http://localhost/cinema-backend/controllers/post_movie.php", {
    is_admin: is_admin,
    title,
    genre,
    poster_url,
    trailer_url,
  })
  .then(res => {
    alert("Movie added");
    this.reset();
  })
  .catch(err => {
    alert("Failed to add movie");
    console.error(err);
  });
});

document.getElementById("snackForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const snack_name = document.getElementById("snackName").value;
  const price = document.getElementById("snackPrice").value;

  axios.post("http://localhost/cinema-backend/controllers/post_snack.php", {
    admin_id: is_admin,
    snack_name,
    price,
    quantity: 0 
  })
  .then(res => {
    alert("Snack added");
    this.reset();
  })
  .catch(err => {
    alert("Failed to add snack");
    console.error(err);
  });
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}