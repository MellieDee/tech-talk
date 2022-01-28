//   SIGNUP FORM HANDLING
async function signupHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-sign').value.trim();
  const email = document.querySelector('#email-sign').value.trim();
  const password = document.querySelector('#password-sign').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


//   LOGIN FORM HANDLING
async function loginHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-log').value.trim();
  const password = document.querySelector('#password-log').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);
document.querySelector('.login-form').addEventListener('submit', loginHandler);

