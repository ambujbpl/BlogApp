$( document ).ready(function() {
  M.updateTextFields();
  $('#loader-page').hide();
});

loginFunction = async () => {
  $('#loader-page').show();
  const email = $('#email').val();
  const password = $('#password').val();
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(email == '' || password == '' || !filter.test(email)) {
    let err = ``;
    if(email == '') err += `Email is required `;
    else if(password == '') err += ` Password are required `;
    else if (!filter.test(email)) err += ` It should be valid email id`;
    else err += 'Email and Password are required';
    alertify.success(err);
    $('#loader-page').hide();
  } else {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data.errors) {
      let err = data.errors.email + ' ' + data.errors.password;
      alertify.success(err);
      $('#loader-page').hide();
    }
    if (data.user) {
      alertify.success(data.message);
      setTimeout(()=> {
        location.assign('/');
      },200);
    }
  }
}