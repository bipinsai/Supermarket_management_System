// import { emitKeypressEvents } from "readline";

(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form .addempbtn').on('click',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check==true){
            addempfunc();
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
        }else if($(input).attr('name') == 'number') {
           if($(input).val().trim().length!=10) {
                return false;
            }
        }else if($(input).attr('name') == 'pass') {
            if($(input).val().length<6) {
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
        if($(input).attr('name') == 'number') {
            msg = "Enter a valid phone number" 
        }else if($(input).attr('name') == 'pass') {
            msg = "Enter password with atleast 6 characters" 
        }

        if($(input).val().length==0) msg = "Empty Field";

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

    const addempfunc = ()=>{
        console.log("clicked");
        let email = $(".emailinput").val();
        let password = $(".passwordinput").val();
        let phno = $(".phnoinput").val();
        let fname = $(".fnameinput").val();
        let lname = $(".lnameinput").val();
        let city = $(".cityinput").val();
        let state = $(".stateinput").val();
        let street = $(".streetinput").val();
        let salary = $(".salaryinput").val();
        let jobtitle = $(".jobinput").val();
        
        if(!email || !password || !phno || !fname || !lname || !salary || !jobtitle || !street || !city) return;

        fetch('http://localhost:3000/addemp', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'phno': phno,
                    'fname':fname,
                    'lname':lname,
                    'street':street,
                    'city':city,
                    'state':state,
                    'salary':salary,
                    'jobtitle':jobtitle,
                    'branchid':curemp.BRANCH_ID
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                if(data.status==1){
                    alert("Successfully added a new Employee");
                    $('.validate-input .input100').val("");
                }else if(data.status==0){
                    showValidate($('.emailinput'),"Email already exists");
                }
            })
            .catch((err)=>console.log(err))
    }

    const gotopage = (userid)=>{
        console.log("going to new page");
        window.location.href = "./home.html?user="+userid;
    }

})(jQuery);