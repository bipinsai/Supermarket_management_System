console.log("in home");


// $('.nav-tab').on('click',()=>{
//     console.log("clicked");
//     document.querySelector('.nav-tab').map((e)=>e.style.color="#fff");
// })

// console.log(document.querySelector('.nav-tab'));

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
            $('.billingdiv').css('display','block');
            $('.profilediv').css('display','none');
        }else if(this.innerHTML=='Profile'){
            console.log("show profile");
            $('.profilediv').css('display','block');
            $('.billingdiv').css('display','none');
        }
    });


})(jQuery);
