const pay = (connection) => (req, res) => {
    cus_name = req.body.customer_name;
    empid = req.body.empid;
    cart = req.body.cart;
    phno = req.body.phno;
    tot_amount = req.body.amount;
    console.log("handling payment");
    let tid = 1;
    let n = cart.length;
    console.log(req.body.cart);
    
    let count = 0;
    connection.query(`SELECT MAX(TID) as mtid FROM TRANSACTION`, function (err, result, fields) {
        if (err) throw err;

        if(result){
            tid = result[0].mtid+1;
        }
        connection.query(`SELECT CUSTOMER_ID FROM CUSTOMER WHERE CUSTOMER_NAME='${cus_name}' AND PH_NO='${phno}'`, function (err2, result2, fields2) {
            if (err2) throw err2;
            console.log(result2.length);

            if(result2.length>0){
                let cus_id = result2[0].CUSTOMER_ID;
                connection.query(`INSERT INTO BILL(TID,EMP_ID,CUSTOMER_ID,AMOUNT) VALUES(${tid},${empid},'${cus_id}',${tot_amount})`, function (err3, result3, fields3) {
                    if (err3) throw err3;
                    console.log(result3);
                });
            }else{
                connection.query(`INSERT INTO CUSTOMER(CUSTOMER_NAME,PH_NO) VALUES('${cus_name}','${phno}')`, function (err3, result3, fields3) {
                    if (err3) throw err3;
                    
                    connection.query(`SELECT CUSTOMER_ID FROM CUSTOMER WHERE CUSTOMER_NAME='${cus_name}' AND PH_NO='${phno}'`, function (err5, result5, fields5) {
                        if (err5) throw err5;
                        if(result5){
                            let cus_id = result5[0].CUSTOMER_ID;
                            connection.query(`INSERT INTO BILL(TID,EMP_ID,CUSTOMER_ID,AMOUNT) VALUES(${tid},${empid},'${cus_id}',${tot_amount})`, function (err4, result4, fields4) {
                                if (err4) throw err4;
                                console.log(result4);
                            });
                        }
                        
                    })
                    // console.log(result3);
                });
                console.log();
            }

        });

        

        for(let i=0; i<n; i++){
            connection.query(`INSERT INTO TRANSACTION VALUES(${tid},${cart[i].PRODUCT_ID},${cart[i].userquantity})`, function (err1, result1, fields1) {
                if (err1) throw err1;

                if(result1.length==0){
                    console.log("not inserted");
                    
                }else{
                    count+=1;
                    connection.query(`UPDATE PRODUCT SET QUANTITY=QUANTITY-${cart[i].userquantity} WHERE PRODUCT_ID=${cart[i].PRODUCT_ID}`, function (err2, result2, fields2) {
                        if (err2) throw err2;
                        console.log(result2);
                        
                    });
                }
            });
        }

        setTimeout(()=>{
            if(count==n){
                res.json({
                    status:1,
                    msg:"Trasaction Successful",
                });
            }else{
                console.log(count + "   Product does not exist");
                res.json({
                    status:0,
                    msg:"Transaction failed",
                });
            }
        
        },3000);
        
        
        
    })

}

  
  module.exports = {
    pay: pay
  }