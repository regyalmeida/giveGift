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


