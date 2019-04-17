console.log(window.location.search.substring(1).substring(5));
useridhash = window.location.search.substring(1).substring(5);
let globvar = null;



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
                }else{
                    $('.admin-tab').css('display','none');
                }

                let arr = document.querySelectorAll('.divisions');

                arr.forEach((e)=>{
                    // console.log(e)
                    if(document.querySelector('.nav-tab.active').innerHTML==e.id){
                    e.style.display = 'block';
                    }else{
                        e.style.display = 'none';
                    }
                })
                
                globvar = data;
                $('.empdetail.firstname').html('First Name: ' +"<p class='profilelabels'>"+ data.firstName+'</p>');
                $('.empdetail.lastname').html('Last Name: ' +"<p class='profilelabels'>"+ data.lastName+'</p>');
                $('.empdetail.phone').html('Number: ' + "<p class='profilelabels'>"+data.employeeNumber+'</p>');
                $('.empdetail.address').html('Email: ' + "<p class='profilelabels'>"+data.email+'</p>');
                $('.empdetail.jobtitle').html('Job Title: ' + "<p class='profilelabels'>"+data.jobTitle+'</p>');

                $('.nav-name').html(data.firstName+" "+data.lastName);
            })
            .catch((err)=>console.log(err));