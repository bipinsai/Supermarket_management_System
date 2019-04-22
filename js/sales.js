
let salesfunc = ()=>{
    
    let tablestr = `<tr>
    <th>TID</th>
    <th>PID</th>
    <th>PRODUCT NAME</th>
    <th>QUANTITY PURCHASED</th>
    <th>CUSTOMER ID</th>
    <th>CUSTOMER NAME</th>
    <th>PHONE NUMBER</th>
    </tr>`;


    setTimeout(()=>{
        fetch('http://localhost:3000/getSales', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'branchid': curemp.BRANCH_ID
            })
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(JSON.stringify(data));
            if(data.status==1){
                console.log(data.salesarr);
                data.salesarr.map((row)=>{
                    tablestr += `<tr>
                            <td>${row.TID}</td>
                            <td>${row.PID} </td>
                            <td>${row.PRODUCT_NAME}</td>
                            <td>${row.QUANTITY}</td>
                            <td>${row.CUSTOMER_ID}</td>
                            <td>${row.CUSTOMER_NAME}</td>
                            <td>${row.PH_NO}</td>
                        </tr>`;
                });
                $('.salestable').html(tablestr);
            }else{
                console.log(data.msg);        
            }
        })
        .catch((err)=>console.log(err));      
    },2000);
}
    


