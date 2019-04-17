console.log("in home");


(function ($) {
    "use strict";
    
    $('.nav-tab').on('click',function(){
        console.log("clicked");
        // $('.nav-tab').map((e)=>{
        //     e.removeClass('active');
        // }) 
        $('.nav-tab').removeClass('active');
        $(this).addClass('active');

        
        console.log(this.innerHTML);
        if(this.innerHTML=='Billing'){
            console.log("SHOW bill");
            $('.divisions').css('display','none');
            $('.billingdiv').css('display','block');
        }else if(this.innerHTML=='Profile'){
            console.log("show profile");
            $('.divisions').css('display','none');
            $('.profilediv').css('display','block');
        }else if(this.innerHTML=='Admin'){
            console.log('show Admin');
            $('.divisions').css('display','none');
            $('.admindiv').css('display','block');
        }
    });

    $('.logoutbtn').on('click',()=>{
        window.location.href = "./index.html";

    })

    


})(jQuery);
