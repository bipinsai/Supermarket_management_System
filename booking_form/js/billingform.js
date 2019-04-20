(function($) {

    $('.product.submit').on('click',function(){
        var check = true;

            if(validate($('#productnuminput')) == false){
                showValidate($('#productnuminput'), "Item not present");
                check=false;
            }
            if(validate($('#quantityinput')) == false){
                showValidate($('#quantityinput'),"Not valid");
                check=false;
            }
        if(check==true){
            addtocart();
            console.log("validated");
        }

        return check;
    });


    $('.form-input input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function validate (input) {
       if($(input).attr('name') == 'search') {
           let f = 0;
            $('#itemdatalist option').map((p,e)=>{
                if($(e).val()==$(input).val()) f = 1;
            })
            if(f==0) {
                return false;
            }    
        }else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input, msg) {
        var thisAlert = $(input).parent();
        if(!msg){
            msg = "Valid email is required: ex@abc.xyz";
        }
        thisAlert[0].setAttribute("data-validate", msg)
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    $('.refresh').on('click', ()=>{
        
        cart = [];
        showCart();
    })

    const addtocart = ()=>{
        console.log("clicked");
        let pname = document.querySelector("#productnuminput").value;
        let userq = $('#quantityinput').val();
        if(!pname) return;

        itemlist.map((item)=>{

            if(pname==item.PRODUCT_NAME){
                it = item;
                if(userq > item.QUANTITY){
                    showValidate($('#quantityinput'),'Not valid');
                    return;
                }
                it.userquantity = parseInt(userq,10);
                if(!cart.includes(it)){
                    cart.push(it);
                    showCart();
                }
            }
        })

        $('#productnuminput').val("");
        $('#quantityinput').val("");

    }

    const showCart = ()=>{
        cartstring = "";
        // console.log("\n");
        let price = 0;
        let pname = "";
        for(let i=0; i<cart.length; i++){
            let n = cart[i].PRODUCT_NAME.length;
            pname = cart[i].PRODUCT_NAME;
            price += cart[i].userquantity * cart[i].PRICE;
            if(n<20){
                // console.log(n);
                for(let j=0; j<=20-n; j++) {pname+=" &nbsp;"}
            }

            if(i!=0)cartstring+="<br>"
            cartstring += `${pname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp; ${cart[i].userquantity} &emsp;&emsp; ${cart[i].PRICE}`;
        
        }
      
        $('.productlist').html(cartstring);
        
        $('#total_amount').val("₹" + price);
    }



})(jQuery);