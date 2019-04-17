const addemp = (connection) => (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let lname = req.body.lname;
    let fname = req.body.fname;
    let phno = req.body.phno;
    // if (!email || !password) {
    //   return res.status(400).json('incorrect form submission');
    // }

    console.log("handling adding employee");

    connection.query("SELECT * FROM testemp where email='"+email +"'", function (err, result, fields) {
        if (err) throw err;
        if(result.length==0){
            
            // s = String.format("INSERT INTO testemp(lastName,firstName,email,password,phno) VALUES ({1},{2},{3},{4},{5})",lname,fname,email,password,phno);
            connection.query(`INSERT INTO testemp(lastName,firstName,email,password,jobTitle,phno) VALUES ('${lname}','${fname}','${email}','${password}','biller','${phno}')`, function (err, result, fields) {
                
                if (err) throw err;
                console.log(result);
                res.json({
                    status:1,
                    msg:"Added employee"
                })
            });
        }else{
            res.json({
                status:0,
                msg:"Employee with this email already exists."
            })
        }
    });

}
  
  module.exports = {
    addemp: addemp
  }