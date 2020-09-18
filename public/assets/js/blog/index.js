$( document ).ready(function() {

});

blogLikeDissLikeFunction = (type,id) => {
  console.log('type : ',type);
  console.log('id : ',id);
  let obj = {
    type: type,
    blog_id: id
  }
  console.log('obj : ',obj);
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
      // alert(responseJson.message);
      // alertify.success(responseJson.message);
      alertify.alert('Blog Action', responseJson.message, function(){ location.assign('/blogs'); });
      location.assign('/blogs');
    } else {
      alertify.error('something went wrong');
    }
  })
  .catch((error) => {
    console.error(error);
    // alert(`${config.networkError}`);
  });
}