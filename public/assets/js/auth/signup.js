$( document ).ready(function() {
  const form = document.querySelector('form');
  const nameError = document.querySelector('.name.error');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    // get values
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log('email : ',email);
    console.log('password : ',password);
    try {
      const res = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ name, email, password }),
        headers: {'Content-Type': 'application/json'}
      });      
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        nameError.textContent = data.errors.name;
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  });
});  