var url_buscape = "http://sandbox.buscape.com.br/service";

var app_token = "/15056683997910f4db52a/BR/";

var source_id = "35841312";

var format_json = "&format=json";


var urn_busca = "/findProductList/buscape";

var urn_mais_vendidos = "/v2/topProducts/buscape";


$(function () {

    maisVendidosPorCategoria(328, "#categoria1", atualizarCategoriaMaisVendida, 10, "", true);

    maisVendidosPorCategoria(285, "#categoria2", atualizarCategoriaMaisVendida, 10, "", true);

    maisVendidosPorCategoria(278, "#categoria3", atualizarCategoriaMaisVendida, 4, "col-xs-6 col-sm-4 col-lg-3", false);

    maisVendidosPorCategoria(3442, "#categoria4", atualizarCategoriaMaisVendida, 10, "", true);


});


function atualizarCategoriaMaisVendida(jsonData, categoria, num_produtos, class_outer, is_carousel) {

    for (i = 0; i < num_produtos; i++) {


        try {

            buscapeId = jsonData[i]['id'];

            nome_produto = jsonData[i]['productName'];

            price_min = jsonData[i]["priceMin"];

            img_src = jsonData[i]['thumbnail']["url"];

        } catch (error) {


        }


        if (is_carousel) {

            $(categoria).owlCarousel('add', newProduto(buscapeId, nome_produto, img_src, price_min, class_outer)).owlCarousel('refresh')

        } else {

            $(categoria).append(newProduto(buscapeId, nome_produto, img_src, price_min, class_outer));

        }

    }

}



function procurarProduto(nome) {

    $.get(url_buscape + urn_busca + app_token, { sourceId: source_id, keyword: nome, format: "json" })

}


function procurarProdutoPorCategoria(nome, id_categoria) {

    $.get(url_buscape + urn_busca + app_token, { sourceId: source_id, keyword: nome, categoryId: id_categoria, format: "json" }, function (data) {

    });

}


function maisVendidosPorCategoria(id_categoria, div_categoria, func, num_produtos, class_outer, is_carousel) {

    $.getJSON(url_buscape + urn_mais_vendidos + app_token, { sourceId: source_id, categoryId: id_categoria, format: "json" }).done(function (data) {

        func(data["product"], div_categoria, num_produtos, class_outer, is_carousel);

    });

}


function newProduto(id_produto_buscape, nome_produto, src_img, preco, class_outer) {


    var div_box_product_outer = $("<div class='" + class_outer + " box-product-outer'> </div>");

    var div_box_product = $("<div class='box-product'></div");

    var div_img_wrapper = $("<div class='img-wrapper'> </div>");

    var a_link = $("<a></a>");

    var img_product = $("<img alt='Product'>");

    img_product.attr("src", src_img);


    var div_tags = $("<div class='tags'></div>");

    var span_label_tags = $("<span class='label-tags'>");

    var a_link2 = $("<a></a>");

    var span_label_success = $("<span class='label label-success arrowed-right'></span>");


    var div_option = $("<div class='option'>");

    // var a_cart = $("<a href='#' data-toggle='tooltip' title='Add to Cart'><i class='fa fa-shopping-cart'></i></a>");

    // var a_compare = $("<a href='#' data-toggle='tooltip' title='Add to Cart'><i class='fa fa-align-left'></i></a>");

    var a_wishlist = $("<a href='#' data-toggle='tooltip' title='call to review' class='wishlist'>faça sua review</a>");


    var h6_nome = $("<h6></h6>");

    var a_nome = $("<a href='product-detail.html?id=5'></a>")

    a_nome.text(nome_produto);


    var div_price = $("<div class='price'></div>");

    div_price.text("R$ " + preco);


    var div_rating = $("<div class='rating'></div>");

    var i_star = $("<i class='fa fa-star'></i>");

    var i_half_star = $("<i class='fa fa-star-half-o'></i>");


    var a_reviews = $("<a></a>");


    a_link.append(img_product);


    a_link2.append(span_label_success);

    span_label_tags.append(a_link2);

    div_tags.append(span_label_tags);


    // div_option.append(a_cart);

    // div_option.append(a_compare);

    div_option.append(a_wishlist);


    div_img_wrapper.append(a_link);

    //div_img_wrapper.append(div_tags_left);

    div_img_wrapper.append(div_option);


    h6_nome.append(a_nome);


    var random =
