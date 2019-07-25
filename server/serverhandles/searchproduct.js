const search = (connection) => (req, res) => {
    console.log(req.body);
    let pid = req.body.pid;
    // if (!email || !password) {
    //   return res.status(400).json('incorrect form submission');
    // }

    console.log("handling search");

    connection.query("SELECT * FROM PRODUCT where PRODUCT_ID='"+pid +"'", function (err, result, fields) {
        if (err) throw err;
        console.log(result)

        if(result.length==0){
            console.log("Product does not exist");
            res.json({
                status:0,
                msg:"Product does not exist",
                productobj:null
            });
        }else{
            res.json({
                status:1,
                msg:"Product exists",
                productobj:result[0]
            });
            // res.json(result[0]);
        }
    
    });

}
  
  module.exports = {
    search: search
  }