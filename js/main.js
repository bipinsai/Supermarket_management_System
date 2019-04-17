
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form .loginbtn').on('click',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check==true){
            loginfunc();
            console.log("validated");
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
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

    const loginfunc = ()=>{
        console.log("clicked");
        let username = document.querySelector(".emailinput").value;
        let password = document.querySelector(".passwordinput").value;
        if(!username || !password) return;

        fetch('http://localhost:3000/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: username,
                    pwd: password
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                if(data.status==1){
                    var hash = md5(data.userid);
                    console.log(hash);
                    gotopage(hash);
                }else if(data.status==0){
                    showValidate($('.emailinput'), data.msg);
                }else if(data.status==2){
                    showValidate($('.passwordinput'), data.msg);
                }
            })
            .catch((err)=>console.log(err))
    }

    const gotopage = (userid)=>{
        console.log("going to new page");
        window.location.href = "./home.html?user="+userid;
    }

})(jQuery);