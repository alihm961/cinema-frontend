document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const is_adult = document.querySelector('input[name="is_adult"]').checked ? 1 : 0;

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("phone", phone);
  formData.append("is_adult", is_adult);

  try {
    const response = await axios.post(
      "http://localhost/cinema-backend/controllers/register_user.php",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    alert(response.data.message);
    if (response.data.status === 200) {
      window.location.href = "login.html";
    }
  } catch (error) {
    alert("Registration failed: " + (error.response?.data?.message || error.message));
  }
});