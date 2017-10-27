var uid = "";
var accessToken = "";

window.fbAsyncInit = function() {
    FB.init({
        appId :'490726977954779',
        cookie : true,
        xfbml : true,
        version : '{latest-api-version}'
    });
    
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log('Logged in.');
            console.log(uid);
            console.log(accessToken);
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                console.log('Your picture ' + 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140');
                image = document.getElementById('my-img-pro');
                image.src = 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140';
                api();
            });
        }
        else {
            //login();
            console.log('Not logged.');
        }
    });
};

(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


//Para o botao personalizado 
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            window.location = "../usuario/profile.html";
        }
    }, {scope: 'public_profile,email,user_friends,user_actions:give_gift'});  
};

function jsonParser(response) {
    var message = "";
    var dataArray = response.data;
    for(var count in dataArray){
        message = message + dataArray[count].name;
        message = message + '<br/>';
    }
    return message;
};

function logout() {
  FB.logout(function(response) {
      window.location = "../index.html";
  });
}

function api(){
    
    ///me/friends?fields=birthday
    FB.api('/me/friends?fields=name', function(response){
       for (var i = 0; i < response.data.length; i++){
           console.log("Amigo " + i +":");
           console.log('    ' + response.data[i].id);
           console.log('    ' + response.data[i].name);
           console.log('    ' + 'https://graph.facebook.com/' + response.data[i].id + '/picture?width=140&height=140');
           //document.getElementById("nome-pro").htmlFor = response.data[i].id;
           document.getElementById("total-pro").innerHTML = "<label for='total'>"+response.data[i].name+"</label> ";
           image = document.getElementById('id-img-pro');
           image.src = 'https://graph.facebook.com/' + response.data[i].id + '/picture?width=140&height=140';
           
           //console.log('    ' + response.data[i].picture);
           //console.log('    ' + response.data[i].birthday);
           //console.log('    ' + response.data[i].email);
       }
   });
}