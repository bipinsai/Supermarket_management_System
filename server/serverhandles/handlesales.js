const getSales = (connection) => (req, res) => {
    console.log(req.body);
    let bid = req.body.branchid;
   
    console.log("handling search");

    connection.query(`SELECT T.TID,T.PID,P.PRODUCT_NAME,C.CUSTOMER_ID,CUSTOMER_NAME,C.PH_NO,T.QUANTITY,DATETIME,T.QUANTITY FROM 
                    (TRANSACTION AS T,BILL AS B,CUSTOMER AS C, PRODUCT AS P) 
                    WHERE T.TID=B.TID AND B.CUSTOMER_ID=C.CUSTOMER_ID AND T.PID=P.PRODUCT_ID AND 
                    EXISTS (SELECT * FROM EMPLOYEE AS E WHERE E.EMP_ID=B.EMP_ID AND E.BRANCH_ID=${bid});`, function (err, result, fields) {
        if (err) throw err;
        console.log(result)

        if(result.length==0){
            console.log("No sales");
            res.json({
                status:0,
                msg:"No sales to show",
            });
        }else{
            res.json({
                status:1,
                msg:"Product exists",
                'salesarr':result
            });
            // res.json(result[0]);
        }
    
    });

}
  
  module.exports = {
    getSales: getSales
  }