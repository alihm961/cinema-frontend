document.addEventListener("DOMContentLoaded", () => {
  const seatGrid = document.getElementById("seatGrid");
  const confirmBtn = document.getElementById("confirmSeatBtn");
  const payBtn = document.getElementById("payBtn");
  const selectedSeats = [];

  const user_id = localStorage.getItem("user_id");
  const selected_movie = localStorage.getItem("selected_movie");

  for (let i = 1; i <= 100; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = i;
    seat.dataset.number = i;

    seat.addEventListener("click", () => {
      if (seat.classList.contains("unavailable")) return;
      seat.classList.toggle("selected");

      const seatNum = seat.dataset.number;
      if (selectedSeats.includes(seatNum)) {
        selectedSeats.splice(selectedSeats.indexOf(seatNum), 1);
      } else {
        selectedSeats.push(seatNum);
      }
    });

    seatGrid.appendChild(seat);
  }

  confirmBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    confirmBtn.disabled = true;
    payBtn.style.display = "inline-block";
    alert(`Seats confirmed: ${selectedSeats.join(", ")}`);
  });

  payBtn.addEventListener("click", () => {
    axios.post("http://localhost/cinema-backend/controllers/post_booking.php", {
      user_id,
      showtime_id: 1, 
      seat_number: selectedSeats.join(","),
      status: "paid"
    }).then(res => {
      alert(res.data.message);
      window.location.href = "profile.html";
    }).catch(err => {
      alert("Booking failed. Try again.");
      console.error(err);
    });
  });
});

function logout() {
  window.location.href = 'login.html';
}