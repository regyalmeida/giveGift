window.fbAsyncInit = function() {
    FB.init({
        appId :'490726977954779',
        cookie : true,
        xfbml : true,
        version : '{latest-api-version}'
    });

    //Para o botao da api do facebook
    FB.Event.subscribe('auth.login', function () {
        window.location = "usuario/profile.html";
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
          window.location = "usuario/profile.html";
      }
}, {scope: 'public_profile,email,user_friends,user_actions:give_gift'});            
}

function logout() {
  FB.logout(function(response) {
  // user is now logged out
  });
}

var status = FB.getLoginStatus();
console.log(status);