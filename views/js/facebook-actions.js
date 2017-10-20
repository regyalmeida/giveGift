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
       FB.login();
     }
   });

   FB.login(function(response) {
      if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
         });
      } else {
         console.log('User cancelled login or did not fully authorize.');
      }
   }, {scope: 'email'});

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
         //console.log(response);
         return people;


   });
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
