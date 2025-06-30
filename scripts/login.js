document.querySelector('.auth-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await axios.post('http://localhost/cinema-backend/controllers/login_user.php', {
      email,
      password
    });

    const data = response.data;

    if (data.status === 200) {
      localStorage.setItem('user_id', data.user_id);

      if (data.is_admin === 1) {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'movies.html';
      }

    } else {
      alert(data.message || 'Login failed');
    }

  } catch (err) {
    console.error(err);
    alert('Error connecting to server.');
  }
});