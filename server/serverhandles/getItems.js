const getItems = (connection) => (req, res) => {

    console.log("handling getItems");

    connection.query("SELECT * FROM testproduct", function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        if(result.length==0){
            console.log("Product does not exist");
            res.json({
                status:0,
                msg:"Product does not exist",
                productobj:null
            });
        }else{
            console.log(result);
            
            res.json({
                status:1,
                msg:"Products exists",
                productarr:result
            });
        }
    
    });

}
  
  module.exports = {
    getItems: getItems
  }