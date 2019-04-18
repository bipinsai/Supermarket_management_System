(function($) {
    // var input = $('.signup-form .input100');

    $('.product.submit').on('click',function(){
        var check = true;

        // for(var i=0; i<input.length; i++) {
            if(validate($('#productnuminput')) == false){
                showValidate($('#productnuminput'), "Item not present");
                check=false;
            }
            if(validate($('#quantityinput')) == false){
                showValidate($('#quantityinput'),"Not valid");
                check=false;
            }
        // }
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
        // console.log(thisAlert[0].getAttribute("data-validate"));
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    // var cart = [];

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

            if(pname==item.pname){
                it = item;
                if(userq > item.quantity){
                    showValidate($('#quantityinput'),'Not valid');
                    return;
                }
                it.userquantity = userq;
                cart.push(it);
                showCart();
            }
        })

        $('#productnuminput').val("");
        $('#quantityinput').val("");
        // cart.push(p)
        // console.log(itemlist);
        
    //     fetch('http://localhost:3000/searchproduct', {
    //             method: 'post',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 'pname':pname
    //             })
    //         })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if(data.status==1){
    //                 console.log(JSON.stringify(data));
    //                 cart.push(data.productobj);
    //                 showCart();
    //             }else{
    //                 console.log(data.msg);
    //             }
    //             // console.log(cart);
    //         })
    //         .catch((err)=>console.log(err))
    }

    const showCart = ()=>{
        cartstring = "";
        // console.log("\n");
        let price = 0;
        let pname = "";
        for(let i=0; i<cart.length; i++){
            let n = cart[i].pname.length;
            pname = cart[i].pname;
            price += cart[i].userquantity * cart[i].price;
            if(n<20){
                // console.log(n);
                for(let j=0; j<=20-n; j++) {pname+=" &nbsp;"}
            }

            if(i!=0)cartstring+="<br>"
            cartstring += `${pname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp; ${cart[i].userquantity} &emsp;&emsp; ${cart[i].price}`;
        
        }
    //   console.log("cart" + "   " + cartstring);
      
        $('.productlist').html(cartstring);
        
        $('#total_amount').val("₹" + price);
    }



})(jQuery);