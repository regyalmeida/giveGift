window.fbAsyncInit = function() {
    FB.init({
        appId: '490726977954779',
        xfbml: true,
        version: 'v2.10'
    });
    FB.AppEvents.logPageView();
    
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
        }
        else {
            //login();
            console.log('Not logged.');
        }
    });

    // atualizar token de acesso 
    var token = "";
    var vinicius = {
        id: "",
        name: "",
        birthday: "",
        picture: ""
    };
    
    var myself = {
        id: "",
        name: "",
        birthday: "",
        picture: ""
    }
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Para o botão personalizado do facebook
function login() {
    FB.login(function(response) {
      if (response.authResponse) {
          window.location = "usuario/profile.html";
          console.log('Logged in');
      } else {
          console.log('User cancelled login or did not fully authorize.');
          window.location = "index.html";
      }
    }, {scope: 'email'});           
}

function logout() {
  FB.logout(function(response) {
      window.location.href='../index.html';
      console.log('User is now logged out');
  });
}

function api(){
    FB.api('/me', 'get', {
        access_token: token,
        fields: 'id,name,gender,friends{id,name,birthday,picture}'
    }, function(response) {
        var people = {
            myself: [
                name = response.name
            ],
            vinicius: [
                id = response.friends.data[1].id,
                name = response.friends.data[1].name,
                birthday = response.friends.data[1].birthday,
                picture =response.friends.data[1].picture.data.url
            ]
        }
        console.log(people);
        return people;
    });
}

// FB.api(
//     "/{user-id}/friends",
//     function (response) {
//       if (response && !response.error) {
//         /* handle the result */
//       }
// //     }
// // );
// window.fbAsyncInit = function() {
//
// }
