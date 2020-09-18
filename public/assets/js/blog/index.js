$( document ).ready(function() {

});

blogLikeDissLikeFunction = (type,id) => {
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
    // alert(responseJson.message);
    // setTimeout(() =>{
    // resetBirdRegistryForm(birdObj);},150);
    if(responseJson.success){
      alertify.success(responseJson.message);
      setTimeout(()=> {
        location.assign('/blogs');
      },250)
      // alertify.alert('Blog Action', responseJson.message, function(){ location.assign('/blogs'); });
      // location.assign('/blogs');
    } else {
      alertify.error('something went wrong, contact your administrator');
    }
  })
  .catch((error) => {
    console.error(error);
  });
}