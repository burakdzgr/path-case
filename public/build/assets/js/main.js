function get_percentage(total, number)
{
  if ( total > 0 ) {
   return Math.round((number * 100) / total, 2);
  } else {
    return 0;
  }
}

function yuzde(a,b){
if(a>0 && b > 0){
    return  Math.round(((a - b) / a ) * 100);
}
return 0;
}

$(document).ready(function(){
    $.getJSON("https://www.cheapshark.com/api/1.0/games?title=batman&limit=60&exact=0", function(a){
        console.log(a)
        show(a)
    })

    function show(data){
        var theme = "";
        $.each(data,function(a,i){
           
            $.get('https://www.cheapshark.com/api/1.0/games?id='+i.gameID,function(a){
                var cheap = a.cheapestPriceEver.price
                var price = parseFloat(i.cheapest - cheap).toFixed(2)
                var rate = yuzde(i.cheapest,price)
                if(price != 0){
                    $("#game-list").append(`
                    <li class=" bg-gray-100 shadow-xl item flex flex-col justify-between h-full" data-sort="${rate}">
                        <div class="card-img w-full">
                        <img src="${i.thumb}" alt="">
                        </div>
                    <div class="card-content mt-5">
                        <div class="card-title">
                        <span class="product-head text-base text-black font-bold">${i.external}</span>
                        <p class="product-desc text-sm text-gray-700 mt-2">Lorem Ipsum is used in the typesetting and printing industry. Lorem Ipsum has been used as the industry standard forged text since the 1500s, when an unknown printer took a gallery of fonts and scrambled them to create a type specimen book.</p>
                        </div>
                        <div class="card-footer flex justify-between mt-3">
                            <div class="card-price-box flex items-center">
                                <span class="card-price text-lg text-black font-bold">${price}$</span>
                                <span class="card-discount-price text-sm text-red-600 font-bold ml-1 line-through">${i.cheapest}$</span>
                            </div>
                            <div class="discount-box flex items-center justify-between">
                                <span class="text-sm rounded-lg text-center flex bg-red-200 text-red-600 py-2 px-4 font-bold">${rate}% İndirim</span>
                            </div>
                        </div>
                    </li>
                    `)
                }
            });

                
        })
     

        setTimeout(function(){
            var result = $('.item').sort(function (a, b) {
                console.log(a,"sasa")
                var contentA =parseInt( $(a).data('sort'));
                var contentB =parseInt( $(b).data('sort'));
                return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
             });
             $('#game-list').html(result);
        },100)
    }
  
})