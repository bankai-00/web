document.addEventListener('DOMContentLoaded', () => {
  const showRegister = document.getElementById('show-register');
  const cancelRegister = document.getElementById('cancel-register');
  const loginForm = document.getElementById('loginform');
  const registerForm = document.getElementById('register-form');

  function toggleToRegister() {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  }
  function toggleToLogin() {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  }

  if (showRegister) showRegister.addEventListener('click', toggleToRegister);
  if (cancelRegister) cancelRegister.addEventListener('click', toggleToLogin);


  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
 
    console.log('Login submit:', {
      username: document.getElementById('username').value
    });
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pw = document.getElementById('reg-password').value;
    const pwc = document.getElementById('reg-password-confirm').value;
    if (pw !== pwc) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register submit:', {
      username: document.getElementById('reg-username').value,
      email: document.getElementById('reg-email').value
    });
  
    toggleToLogin();
  });
});