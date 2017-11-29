window.onload = function (){
    profile();
}

window.profile = function(){
    
    var name_friend = localStorage.getItem("name_friend");
    var pic_friend = localStorage.getItem("pic_friend");
    var id_friend = localStorage.getItem("id_friend");
    
    //Recupera o json armazenado para consultar os dados do amigo
    var obj = localStorage.getItem(id_friend);
    //console.log(resp);
    resp = JSON.parse(obj);
    
    document.getElementById("friend-img-pro").innerHTML = 
        "<strong for='friend-img-pro' id='friend-img-pro' class='fb-name-color'>" + resp.name + "</strong>";
    
    image = document.getElementById("pic_friend");
    image.src = pic_friend;
    
    document.getElementById("recom").innerHTML = "<h4 id='recom' for='recom'>Recomendações para '" + resp.first_name + "'</h4>";
    //" + resp.first_name  + "
    
    //Faz a busca no Lomadee
    getProducts(resp.books, id_friend, "livro");
    getProducts(resp.games, id_friend, "jogo");
    getProducts(resp.movies, id_friend, "filme");
    getProducts(resp.music, id_friend, "musica");
    
    //Idade
    var idade = document.getElementById ("idade_user");
    if (resp.age_range.min != null && resp.age_range.max != null){
        idade.placeholder = "Entre " + resp.age_range.min + " e " + resp.age_range.max + " anos";
    }
    else if (resp.age_range.min != null && resp.age_range.max == null){
        idade.placeholder = resp.age_range.min + " anos";
    }
    else if (resp.age_range.min == null && resp.age_range.max != null){
        idade.placeholder = resp.age_range.max + "anos";
    }
    else{
        idade.placeholder = "Indisponível";
    }
    
    //Data de aniversario
    var data_niver = document.getElementById ("dataniver_user");
    if (resp.birthday != null){
        data_niver.placeholder = resp.birthday;
    }
    else{
        data_niver.placeholder = "Indisponível";
    }
    
    //ID carol: 1145650655565704
    //console.log(id_friend);
}

//Recupera produtos com base no objeto passado. resp=>obj de paginas do facebook,
function getProducts(resp, id, categoria){
    
    var keyword;
    console.log(resp);
    
    for (var i = 0; i < 5; i++){
        var j = 0;
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