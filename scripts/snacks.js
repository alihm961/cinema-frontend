document.addEventListener("DOMContentLoaded", function () {
  const snacksContainer = document.getElementById("snacksContainer");

  axios.get("http://localhost/cinema-backend/controllers/get_snacks.php")
    .then(response => {
      const snacks = response.data;
      snacksContainer.innerHTML = ""; 

      snacks.forEach(snack => {
        const snackCard = document.createElement("div");
        snackCard.className = "snack-card";
        snackCard.innerHTML = `
          <img src="${snack.image}" alt="${snack.name}" />
          <h3>${snack.name}</h3>
          <p>${snack.description}</p>
          <p class="snack-price">$${snack.price.toFixed(2)}</p>
        `;
        snacksContainer.appendChild(snackCard);
      });
    })
    .catch(error => {
      snacksContainer.innerHTML = "<p>Failed to load snacks.</p>";
      console.error(error);
    });
});

function logout() {
  window.location.href = 'login.html';
}