var uid = "";
var accessToken = "";
var book;

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
            FB.api('/me?fields=id,name,age_range,books.limit(10),games.limit(10),movies.limit(10),music.limit(10),birthday', function(response) {
                console.log(response.books.data[2].name);
                window.book = response.books.data[2].name;
                console.log(book);
                console.log('Your picture ' + 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140');
                
                document.getElementById("name-pro").innerHTML = 
                    "<strong for='name-pro' id='name-pro' class='fb-name-color'>" + response.name + "</strong>";
                
                image = document.getElementById('my-img-pro');
                image.src = 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140';
                console.log(response);
                localStorage.setItem(uid, JSON.stringify(response));//Salva no local storage as informacoes do usuario logado
                
                //console.log("Idade: " +response.age_range.min);
                //console.log("Data de aniversario: " + response.birthday);
                
                //Passa os livros
                //getBooks(response.books);
                
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
    }, {scope: 'public_profile,email,user_friends,email,user_likes'});
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
    
    FB.api('/me/friends?fields=id,name,age_range,music.limit(10),movies.limit(10),books.limit(10),games.limit(10)', function(response){

        //CARREGA 'PRINCIPAIS AMIGOS':
        for (var i = 0; i < response.data.length; i++){
            
            document.getElementById("principal").innerHTML += "<ul class='listrap' id='principal' for='principal'>"
                + "<a class='btn-default' onclick='profile(" + i + ")' id='" + i + "'>"
                + "<li class='row col-xs-4 col-md-6 col-sm-6 col-lg-4'>" 
                + "<div class='col-xs-12'>" 
                + "<img id='img-friend" + i + "' class='fb-image-friends img-circle' src=''/></div>"
                + "<div class='col-xs-12' id='friend" + i + "'><label id='name-friend" + i + "' for='name-friend" + i + "' value=''>"
                + "</label></div></li></a>"
                + "</ul>";
            
            image = document.getElementById("img-friend" + i + "");
            image.src = 'https://graph.facebook.com/' + response.data[i].id + '/picture?width=140&height=140';
            
            document.getElementById("friend" + i + "").innerHTML = "<label id='name-friend" + i + "' for='name-friend" + i + "' value='" + i + "'>"+response.data[i].name+"</label>";
        }
        
        //CARREGA 'TODOS':
        for (var i = 0; i < response.data.length; i++){

            document.getElementById("todos").innerHTML += "<ul class='listrap' id='todos' for='todos'>"
                + "<a class='btn-default' onclick='profile(" + i + ")'>"
                + "<li class='row col-xs-12 col-md-6 col-sm-6 col-lg-4'>" 
                + "<div class='col-xs-4'>" 
                + "<img id='img-all-friend" + i + "' class='fb-image-friends img-circle' src=''/></div>"
                + "<div id='all-friend" + i + "'><label id='name-all-friend" + i + "' for='name-all-friend" + i + "' value=''>"
                + "</label></div></li></a>"
                + "</ul>";

            document.getElementById("all-friend" + i + "").innerHTML =
               "<label id='name-all-friend" + i + "' for='name-all-friend" + i + "' value='" + i + "'>"+response.data[i].name+"</label> ";

           image = document.getElementById("img-all-friend" + i + "");
           image.src = 'https://graph.facebook.com/' + response.data[i].id + '/picture?width=140&height=140';
        }
        
        //CARREGA 'ANIVESARIANTES DO MÊS'
        now = new Date;
        mes = now.getMonth() + 1;
        mes = 10; //temporario -> apenas para teste
        
        for (var i = 0; i < response.data.length; i++){
            
            //Recupera o usuario
            //response.data[i].id
            var obj = localStorage.getItem("1145650655565704");
            user = JSON.parse(obj);
            
            if (user == null){
                console.log("Data de aniverário do usuario '" + response.data[i].id + "' indisponível");
            }
            else{
                if(user.birthday == null){
                    console.log("Data de aniverário do usuario '" + response.data[i].id + "' indisponível");
                }
                else{
                    var res = user.birthday.substring(0, 2);
                    if (res == mes){ //Se for aniversariante do mês, imprime no HTML
                        console.log(user.age_range.min);
                        document.getElementById("niver").innerHTML += "<ul class='listrap' id='niver' for='niver'>"
                            + "<a class='btn-default' onclick='profile(" + i + ")'>"
                            + "<li class='row col-xs-12 col-md-6 col-sm-6 col-lg-4'>" 
                            + "<div class='col-xs-4'>" 
                            + "<img id='img-niver-friend" + i + "' class='fb-image-friends img-circle' src=''/></div>"
                            + "<div id='niver-friend" + i + "'><label id='name-niver-friend" + i + "' for='name-niver-friend" + i + "' value=''>"
                            + "</label><h5 id='idade-niver-friend" + i + "' for='idade-niver-friend" + i + "' value=''></h5></div></li></a>"
                            + "</ul>";

                        document.getElementById("niver-friend" + i + "").innerHTML = "<label id='name-niver-friend" 
                            + i + "' for='name-niver-friend" + i + "' value='" + i + "'>"+response.data[i].name+"</label> "
                            + "<h5 id='idade-niver-friend" + i + "' for='idade-niver-friend" + i + "'>" + user.age_range.min + " anos</h5>";

                        image = document.getElementById("img-niver-friend" + i + "");
                        image.src = 'https://graph.facebook.com/' + response.data[i].id + '/picture?width=140&height=140';
                        
                        //Fazendo " + user.age_range.min + " no dia " + res + "
                    }
                }
            }
        }
        
        //console.log("Hoje é: " + mes + "/" + now.getDate() + "/" + now.getFullYear());
   });
}

function profile(id){

    FB.api('/me/friends?fields=name', function(response){
        
        //Armazena os dados
        localStorage.setItem("name_friend", response.data[id].name);

        var tmp = 'https://graph.facebook.com/' + response.data[id].id + '/picture?width=140&height=140';
        localStorage.setItem("pic_friend", tmp);

        localStorage.setItem("id_friend", response.data[id].id);

        //Chama o profile do amigo
        window.location = 'profile_friend.html';
    });
}

//Recupera livros
function getBooks(books){
    
    var keyword;
    console.log(books);
    
    for (var i = 0; i < 10; i++){
        
        keyword = books.data[i].name;
        $.get("https://sandbox-api.lomadee.com/v2/1508440137937e31d5fb8/product/_search?sourceId=35860773&keyword=" + keyword, function(data){
            var produtos = data["products"];
            // aqui você faza a manipulação do json, exemplo:
            if(produtos == null){
                console.log("Nao encontrou livros para a keyword: " + keyword);
            }
            else{
                console.log(produtos[0]);
            }
        });
    }
}

/*
var keyword = "Sapiens";

$.get("https://sandbox-api.lomadee.com/v2/1508440137937e31d5fb8/product/_search?sourceId=35860773&keyword=" + keyword, function(data){

    var produtos = data["products"];

    // aqui você faza a manipulação do json, exemplo:
    //console.log(produtos["0"]);

    document.getElementById("priceMin").innerHTML = "<label id='priceMin' for='priceMin'>"+ produtos["0"].priceMin + "</label> ";
    document.getElementById("name").innerHTML = "<label id='name' for='name'>"+ produtos["0"].name + "</label> ";
    var image = document.getElementById("img-product1");
    image.src = produtos[0].thumbnail.url;

});

var keyword1 = "Harry Potter";
$.get("https://sandbox-api.lomadee.com/v2/1508440137937e31d5fb8/product/_search?sourceId=35860773&keyword=" + keyword1, function(data){

    var produtos1 = data["products"];

    // aqui você faza a manipulação do json, exemplo:
    //console.log(produtos1["0"]);

    document.getElementById("priceMin1").innerHTML = "<label id='priceMin1' for='priceMin1'>"+ produtos1["0"].priceMin + "</label> ";
    document.getElementById("name1").innerHTML = "<label id='name1' for='name1'>"+ produtos1["0"].name + "</label> ";
    var image = document.getElementById("img-product2");
    image.src = produtos1[0].thumbnail.url;

});

var keyword2 = "Sociedade Esportiva Palmeiras";
$.get("https://sandbox-api.lomadee.com/v2/1508440137937e31d5fb8/product/_search?sourceId=35860773&keyword=" + keyword2, function(data){

    var produtos2 = data["products"];

    // aqui você faza a manipulação do json, exemplo:
    //console.log(produtos2["0"]);

    document.getElementById("priceMin2").innerHTML = "<label id='priceMin2' for='priceMin2'>"+ produtos2["0"].priceMin + "</label> ";
    document.getElementById("name2").innerHTML = "<label id='name2' for='name2'>"+ produtos2["0"].name + "</label> ";
    var image = document.getElementById("img-product3");
    image.src = produtos2[0].thumbnail.url;


});*/
