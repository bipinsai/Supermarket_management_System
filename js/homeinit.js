console.log(window.location.search.substring(1).substring(5));
useridhash = window.location.search.substring(1).substring(5);
let curemp = null;
let itemlist = [];
let cart = [];


fetch('http://localhost:3000/home', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    useridhash: useridhash
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                if(data.jobTitle=='admin'){
                    $('.billing-tab').css('display','none');
                    $('.billing-tab').removeClass('active');
                    $('.admin-tab').addClass('active');
                    $('.divisions.admindiv').css('margin-left','250px')
                }else{
                    $('.admin-tab').css('display','none');
                    $('.w3-sidebar').css('display','none');
                }

                $('.admindivisions').css('display','none');
                $('.sidenav-tab.manage-menu').addClass('active');
                $('.admindivisions.managediv').css('display','block');

                let arr = document.querySelectorAll('.divisions');

                arr.forEach((e)=>{
                    // console.log(e)
                    if(document.querySelector('.nav-tab.active').innerHTML==e.id){
                    e.style.display = 'block';
                    }else{
                        e.style.display = 'none';
                    }
                })
                
                curemp = data;
                curemp.id = useridhash;
                $('.empdetail.firstname').html("First Name: <p class='profilevalue'>"+ data.firstName+'</p>');
                $('.empdetail.lastname').html( "Last Name :  <p class='profilevalue'>"+ data.lastName+'</p>');
                $('.empdetail.phone').html(    "Number    : <p class='profilevalue'>"+data.employeeNumber+'</p>');
                $('.empdetail.address').html(  "Email     : <p class='profilevalue'>" + data.email + '</p>');
                $('.empdetail.jobtitle').html( "Job Title : <p class='profilevalue'>"+data.jobTitle+'</p>');

                $('.nav-name').html(data.firstName+" "+data.lastName);
            })
            .catch((err)=>console.log(err));




fetch('http://localhost:3000/getItems')
.then((response) => response.json())
.then((data) => {
    console.log(JSON.stringify(data));
    if(data.status==1){
        itemlist = data.productarr;
        let list = "";
        itemlist.map((p)=>{
            list += `<option value='${p.pname}' title='${p.pid}'></option>`;
        })

        $('#itemdatalist').html(list);
    }
})
.catch((err)=>console.log(err));            