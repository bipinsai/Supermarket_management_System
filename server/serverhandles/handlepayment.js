const pay = (connection) => (req, res) => {
    cus_name = req.body.customer_name;
    empid = req.body.empid;
    cart = req.body.cart;
    phno = req.body.phno;
    console.log("handling payment");
    let tid = 1;
    let n = cart.length;
    console.log(req.body.cart);
    
    let count = 0;
    connection.query(`SELECT MAX(TID) as mtid FROM TRANSACTIONS`, function (err, result, fields) {
        if (err) throw err;

        if(result){
            tid = result[0].mtid+1;
            // console.log("Tid  "+tid);
            
            for(let i=0; i<n; i++){
                // console.log("insert res: ");
                connection.query(`INSERT INTO TRANSACTIONS VALUES(${tid},'${cus_name}','${phno}',${empid},${cart[i].pid},${cart[i].quantity})`, function (err1, result1, fields1) {
                    if (err1) throw err1;

                    if(result1.length==0){
                        console.log("not inserted");
                        
                    }else{
                        count+=1;
                        // console.log('incremented');
                        
                        connection.query(`UPDATE TESTPRODUCT SET QUANTITY=QUANTITY-${cart[i].quantity} WHERE PID=${cart[i].pid}`, function (err2, result2, fields2) {
                            if (err2) throw err2;
                            console.log(result2);
                            // console.log("in update");
                            
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
          
            },5000);
            
            
        }
    })

}

  
  module.exports = {
    pay: pay
  }