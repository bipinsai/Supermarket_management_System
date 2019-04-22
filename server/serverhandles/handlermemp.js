const rmemp = (connection) => (req, res) => {
    console.log(req.body);
    let id = req.body.id;

    console.log("handling removing employee");

    
    connection.query(`SET foreign_key_checks = 0`, function (err, result, fields) {
        if (err) throw err;
        connection.query(`DELETE FROM EMPLOYEE WHERE EMP_ID=${id}`, function (err1, result1, fields) {
            if (err1) throw err1;
            connection.query(`SET foreign_key_checks = 1`, function (err2, result2, fields) {
                if (err2) throw err2;
            });
            console.log(result1.affectedRows);
            
            if(result1.affectedRows>0){
                res.json({
                    'status':1,
                    'msg':'Employee successfully removed'
                })
            }else{
                res.json({
                    status:0,
                    msg:"Employee does not exist"
                })
            }

            
        });

        
    });

  

}
  
  module.exports = {
    rmemp: rmemp
  }