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
                curemp = data;
                curemp.id = useridhash;
                $('.emplistlabel').append(data.BRANCH_NAME);
                getinventory();
                if(data.JOB_TITLE=='MANAGER'){
                    $('.billing-tab').css('display','none');
                    $('.billing-tab').removeClass('active');
                    $('.admin-tab').addClass('active');
                    $('.divisions.admindiv').css('margin-left','250px')
                    getempfunc();
                    salesfunc();
                }else{
                    $('.admin-tab').css('display','none');
                    $('.w3-sidebar').css('display','none');
                }

                $('.admindivisions').css('display','none');
                $('.sidenav-tab.manage-menu').addClass('active');
                $('.admindivisions.managediv').css('display','block');

                let arr = document.querySelectorAll('.divisions');

                arr.forEach((e)=>{
                    if(document.querySelector('.nav-tab.active').innerHTML==e.id){
                        e.style.display = 'block';
                    }else{
                        e.style.display = 'none';
                    }
                })
                
                
                $('.empdetail.firstname').html("First Name: <p class='profilevalue'>"+ data.FIRST_NAME+'</p>');
                $('.empdetail.lastname').html( "Last Name :  <p class='profilevalue'>"+ data.LAST_NAME+'</p>');
                $('.empdetail.phone').html(    "EMP_ID    : <p class='profilevalue'>"+data.EMP_ID+'</p>');
                $('.empdetail.address').html(  "Address     : <p class='profilevalue'>" + data.STREET+', '+data.CITY+', '+data.STATE + '</p>');
                $('.empdetail.jobtitle').html( "Job Title : <p class='profilevalue'>"+data.JOB_TITLE+'</p>');
                $('.empdetail.salary').html( "Salary : <p class='profilevalue'>₹ "+data.SALARY+'</p>');

                $('.nav-name').html(data.FIRST_NAME+" "+data.LAST_NAME);


                $('.footertext').html(data.BRANCH_NAME);
            })
            .catch((err)=>console.log(err));



let getinventory = ()=>{
    fetch('http://localhost:3000/getItems', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'branchid': curemp.BRANCH_ID
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(JSON.stringify(data));
        if(data.status==1){
            itemlist = data.productarr;
            if(curemp.JOB_TITLE=='MANAGER'){
                showInventory(itemlist);
            }
            let list = "";
            itemlist.map((p)=>{
                list += `<option value='${p.PRODUCT_NAME}' title='${p.PRODUCT_ID}'></option>`;
            })

            $('#itemdatalist').html(list);
        }else{
            console.log("No items in database");
            
        }
    })
    .catch((err)=>console.log(err));            
}


let showInventory = (list)=>{
    let invstr = `
        <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
        <tr>
    `;

    list.map((item)=>{
        invstr += `<tr>
            <td>${item.PRODUCT_ID}</td>
            <td>${item.PRODUCT_NAME}</td>
            <td>${item.BRAND}</td>
            <td>${item.PRICE}</td>
            <td>${item.QUANTITY}</td>
        </tr>`;
    })

    $('.inventorytable').html(invstr);

}


let getempfunc = ()=>{
    let tablestr = `<tr>
    <th>Emp No</th>
    <th>Name</th>
    <th>email</th>
    <th>Job Title</th>
    <th>Salary</th>
    <th>Phone Number</th>
    </tr>`;



    fetch('http://localhost:3000/getemp', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'BRANCH_ID':curemp.BRANCH_ID
        })
    })
    .then((response) => response.json())
    .then((data) => {
            console.log(JSON.stringify(data));
            if(data.status==1){
                data.emplist.map((emp)=>{
                    tablestr += `<tr>
                        <td>${emp.EMP_ID}</td>
                        <td>${emp.FIRST_NAME} ${emp.LAST_NAME}</td>
                        <td>${emp.EMAIL}</td>
                        <td>${emp.JOB_TITLE}</td>
                        <td>${emp.SALARY}</td>
                        <td>${emp.PH_NO}</td>`;
                    if(emp.JOB_TITLE!='MANAGER'){
                        tablestr += `<td><input type='button' class='rmbtn' name='${emp.EMP_ID}' value='Remove' /></td>`;
                    }
                    tablestr += `<tr></tr>`;

                })

                $('.employeetable').html(tablestr);
                
                
                $('.rmbtn').on('click',function(){
                    if($())
                    removeemp(parseInt($(this).attr('name'),10));
                })
            }

    })
    .catch((err)=>console.log(err))

}


let removeemp = (id)=>{

fetch('http://localhost:3000/rmemp', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'id': id
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(JSON.stringify(data));
        if(data.status==1){
            console.log(data.msg);
            getempfunc();
            
        }else{
            console.log(data.msg);
            
        }
    })
    .catch((err)=>console.log(err));  

}


// let getsales=()=>{

//     let tablestr = `<tr>
//     <th>TID</th>
//     <th>PID</th>
//     <th>PRODUCT NAME</th>
//     <th>QUANTITY PURCHASED</th>
//     <th>CUSTOMER ID</th>
//     <th>CUSTOMER NAME</th>
//     <th>PHONE NUMBER</th>
//     </tr>`;



//     fetch('http://localhost:3000/getsales', {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             'BRANCH_ID':curemp.BRANCH_ID
//         })
//     })
//     .then((response) => response.json())
//     .then((data) => {
//             console.log(JSON.stringify(data));
//             if(data.status==1){
//                 data.emplist.map((emp)=>{
//                     tablestr += `<tr>
//                         <td>${emp.EMP_ID}</td>
//                         <td>${emp.FIRST_NAME} ${emp.LAST_NAME}</td>
//                         <td>${emp.EMAIL}</td>
//                         <td>${emp.JOB_TITLE}</td>
//                         <td>${emp.SALARY}</td>
//                         <td>${emp.PH_NO}</td>`;
//                     if(emp.JOB_TITLE!='MANAGER'){
//                         tablestr += `<td><input type='button' class='rmbtn' name='${emp.EMP_ID}' value='Remove' /></td>`;
//                     }
//                     tablestr += `<tr></tr>`;

//                 })

//                 $('.employeetable').html(tablestr);
                
                
//                 $('.rmbtn').on('click',function(){
//                     if($())
//                     removeemp(parseInt($(this).attr('name'),10));
//                 })
//             }

//     })
//     .catch((err)=>console.log(err))
// }


