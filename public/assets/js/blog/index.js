$( document ).ready(function() {
  $('.tooltipped').tooltip();
  $('#loader-page').hide();
});

blogLikeDissLikeFunction = (type,id) => {
  $('#loader-page').show();
  let obj = {
    type: type,
    blog_id: id
  }
  fetch(`/like`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log('response object:',responseJson);
    if(responseJson.success){
      alertify.success(responseJson.message);
      setTimeout(()=> {
        location.assign('/blogs');
      },250);
    } else {
      alertify.error('something went wrong, contact your administrator');
      $('#loader-page').hide();
    }
  })
  .catch((error) => {
    console.error(error);
    $('#loader-page').hide();
  });
}