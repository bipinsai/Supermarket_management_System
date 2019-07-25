const handlelogin = (connection) => (req, res) => {
    console.log(req.body);
    let email = req.body.name;
    let password = req.body.pwd;
    if (!email || !password) {
      return res.status(400).json('incorrect form submission');
    }

    console.log("handling login");

    connection.query("SELECT * FROM EMPLOYEE where email='"+email +"'", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        console.log(result)

        if(result.length==0){
            console.log("Email does not exist");
            res.json({
                status:0,
                msg:"Email does not exist",
                userid:null
            });
        }
        if(result.length>0){
            if(password==result[0].PASSWORD){
                console.log("Logged IN SUCCESSFULLY");
                res.json({
                    status:1,
                    msg:"Logged IN SUCCESSFULLY",
                    userid:result[0].EMP_ID
                });
            }else{
                console.log("Wrong Pasword");
                res.json({
                    status:2,
                    msg:"Wrong Pasword",
                    userid:null
                });
            }

        }
    });

}
  
  module.exports = {
    handlelogin: handlelogin
  }