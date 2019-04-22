(function($) {
    // var input = $('.signup-form .input100');

    console.log(cart);
    
    $('.pay.submit').on('click',function(){
        var check = true;
        console.log("clicked pay");
        
        if(validate($('#customer_name')) == false){
            showValidate($('#customer_name'), "Enter valid name");
            check=false;
        }
        if(validate($('#phone_number')) == false){
            showValidate($('#phone_number'),"Not valid");
            check=false;
        }
        if(check==true){
            payment();
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
       if($(input).attr('id') == 'phone_number') {
           if(isNaN($(input).val())==true || $(input).val().length!=10){
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
            msg = "Not valid";
        }
        thisAlert[0].setAttribute("data-validate", msg)
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    const payment = ()=>{
        console.log("clicked");
        let name = document.querySelector("#customer_name").value;
        let phno = $('#phone_number').val();
        let price = parseInt($('#total_amount').val().slice(1));
        if(!name || !phno) return;
        

        fetch('http://localhost:3000/payment', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'customer_name': name,
                    'phno':phno,
                    'cart':cart,
                    'amount': price,
                    'empid': curemp.EMP_ID
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status==1){
                    console.log(JSON.stringify(data));
                    alert("TRANSACTION SUCCESSFUL!");
                    cart = [];
                    $('.productlist').html("");
                    $('#total_amount').val("");
                    $('#customer_name').val("");
                    $('#phone_number').val("");

                }else{
                    console.log(data.msg);
                    alert("TRANSACTION FAILED!");
                }
            })
            .catch((err)=>console.log(err))
    }



})(jQuery);