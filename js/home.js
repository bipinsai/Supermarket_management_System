console.log("in home");


(function ($) {
    "use strict";
    console.log($('.profilediv')[0]);
    $('.nav-tab').on('click',function(){
        console.log("clicked");
        $('.nav-tab').removeClass('active');
        $(this).addClass('active');

        console.log("HEREHEREHEREHEREHERE");
        
        console.log(this.innerHTML);
        if(this.innerHTML=='Billing'){
            console.log("SHOW bill");
            $('.divisions').css('display','none');
            $('.billingdiv').css('display','block');
        }else if(this.innerHTML=='Profile'){
            console.log("show profile");
            $('.divisions').css('display','none');
            $('.w3-sidebar').css('display','none');
            $('.profilediv').css('display','block');
        }else if(this.innerHTML=='Admin'){
            console.log('show Admin');
            $('.w3-sidebar').css('display','block');
            $('.divisions').css('display','none');
            $('.admindiv').css('display','block');
        }
    });

    $('.sidenav-tab').on('click',function(){
        console.log("clicked");

        $('.sidenav-tab').removeClass('active');
        $(this).addClass('active');

        if(this.innerHTML=='Manage'){
            console.log("SHOW manage");
            $('.admindivisions').css('display','none');
            $('.managediv').css('display','block');
        }else if(this.innerHTML=='Add Employee'){
            console.log("show Add Emp");
            $('.admindivisions').css('display','none');
            $('.addempdiv').css('display','block');
        }else if(this.innerHTML=='Inventory'){
            console.log('show Inventory');
            $('.admindivisions').css('display','none');
            $('.inventorydiv').css('display','block');
        }else if(this.innerHTML=='Sales'){
            console.log('show Sales');
            $('.admindivisions').css('display','none');
            $('.salesdiv').css('display','block');
        }
    });

    $('.logoutbtn').on('click',()=>{
        window.location.href = "./index.html";

    })

    


})(jQuery);
