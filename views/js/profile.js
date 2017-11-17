window.onload = function (){
    profile();
}

function profile(){
    
    var name_friend = localStorage.getItem("name_friend");
    var pic_friend = localStorage.getItem("pic_friend");
    var id_friend = localStorage.getItem("id_friend");
    
    document.getElementById("friend-img-pro").innerHTML = 
        "<h1 for='friend-img-pro' id='friend-img-pro' class='fb-name-color'>" + name_friend + "</h1>";
    
    image = document.getElementById("pic_friend");
    image.src = pic_friend;
    
    //Recupera o json armazenado para consultar os dados do amigo
    var resp = localStorage.getItem(1145650655565704);
    
    //Idade
    var idade = document.getElementById ("idade_user");
    idade.placeholder = resp.age_range.min;
    
    //Data de aniversario
    var data_niver = document.getElementById ("dataniver_user");
    data_niver.placeholder = resp.birthday;
    
    console.log(resp);
    console.log(id_friend);
}