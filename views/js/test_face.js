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
            FB.api('/me?fields=id,name,age_range,books.limit(10),games.limit(10),movies.limit(10),music.limit(10),birthday,first_name', function(response) {
                console.log(book);
                console.log('Your picture ' + 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140');
                
                document.getElementById("name-pro").innerHTML = 
                    "<strong for='name-pro' id='name-pro' class='fb-name-color'>" + response.name + "</strong>";
                
                image = document.getElementById('my-img-pro');
                image.src = 'https://graph.facebook.com/' + uid + '/picture?width=140&height=140';
                console.log(response);
                localStorage.setItem(uid, JSON.stringify(response));//Salva no local storage as informacoes do usuario logado
                
                //Passa os livros
                //console.log("Livros");
                getProducts(response.books, uid, "livro");
                
                //Passa os jogos
                //console.log("Jogos");
                getProducts(response.games, uid, "jogo");
                
                //Passa os filmes
                //console.log("Filmes");
                getProducts(response.movies, uid, "filme");
                
                //Passa as musicas
                //console.log("Músicas");
                getProducts(response.music, uid, "musica");
                
                //Recupera informações de usuarios
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
        //mes = 10; //temporario -> apenas para teste
        
        for (var i = 0; i < response.data.length; i++){
            
            //Recupera o usuario
            var obj = localStorage.getItem(response.data[i].id);
            user = JSON.parse(obj);
            
            if (user == null){
                console.log("Usuário indisponível");
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
function getProducts(resp, id, categoria){
    
    var keyword;
    console.log(resp);
    
    for (var i = 0; i < 5; i++){
        var j = 0;
        
        if (resp.data[i].name == null){
            break;
        }
        else{
            keyword = resp.data[i].name;    
        
        
        $.get("https://sandbox-api.lomadee.com/v2/1508440137937e31d5fb8/product/_search?sourceId=35860773&keyword=" + keyword, function(data){
            var produtos = data["products"];
            console.log(produtos);
            if(produtos == null){
                console.log("Nao encontrou livros para a keyword: " + keyword);
            }
            else{
                k = j+1;
                localStorage.setItem(categoria+k+id, JSON.stringify(produtos));
                //Exemplo: categoria+i+id = "livro01145650655565704" -> representa o livro 0 da pessoa com esse id
                
                document.getElementById("my-product" + j + "").innerHTML += '<ul class="listrap" id="my-product' + k +'" for="my-product' + k +'">'
                    + '<li class="row col-xs-12 col-md-4">'
                    + '<div class="thumbnail">'
                    + '<a data-toggle="modal" data-target="#basicModal">'
                    + '<img id="img-prod' + k + '" src="'+ produtos[0].thumbnail.url + '" class="fb-image-products"/></a></div>'
                    + '<ul class="list-inline">'
                    + '<li><label id="pricemin-prod' + k + '" for="pricemin-prod"' + i + '">' + produtos[0].priceMin + '</label></li>'
                    + '<li><label id="name-prod' + k + '" for="name-prod"' + i + '">' + produtos[0].name + '</label></li>'
                    + '<li class="pull-right"></li></ul>'
                    + '<a href="#" id="det-prod' + k + '" class="btn btn-warning" data-toggle="modal" data-target="#basicModal"'
                    + 'onclick="getDetalhes(' + "'" + categoria+k+id + "'" + ')">Detalhes</a>'
                    + '<a id="link-prod' + k + '" href="' + produtos[0].link + '" class="btn btn-success col-md-6">Comprar</a></li>'
                    + '</ul>';
                k--;
                j++;
            }
        });
            }
    }
}

//Recupera os dados do localStorage -> Exemplo: cat_id => recupera livro01145650655565704
function getDetalhes(cat_id){
    
    var obj = localStorage.getItem(cat_id);
    produtos = JSON.parse(obj);
    
    image = document.getElementById("pic-prod");
    image.src = produtos[0].thumbnail.url;
    
    document.getElementById("n-prod").innerHTML = "<h5 id='n-prod'>" + produtos[0].name + "</h5>";
    document.getElementById("category-prod").innerHTML = "<h5 id='category-prod'>" + produtos[0].category.name + "</h5>";
    document.getElementById("min-prod").innerHTML = "<h5 id='min-prod'>" + produtos[0].priceMin + "</h5>";
    document.getElementById("max-prod").innerHTML = "<h5 id='max-prod'>" + produtos[0].priceMax + "</h5>";
    document.getElementById("estoque-prod").innerHTML = "<h5 id='estoque-prod'>" + produtos[0].category.hasProduct + "</h5>";
    document.getElementById("desc-prod").innerHTML = "<h5 id='desc-prod'>" + produtos[0].discount + "</h5>";
}
