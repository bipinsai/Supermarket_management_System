const handlelogin = (connection) => (req, res) => {
    console.log(req.body);
    let email = req.body.name;
    let password = req.body.pwd;
    // if (!email || !password) {
    //   return res.status(400).json('incorrect form submission');
    // }

    console.log("handling login");

    connection.query("SELECT * FROM testemp where email='"+email +"'", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        // result.map((row)=>console.log(row));
        console.log(result)

        if(result.length==0){
            console.log("Email does not exist");
            res.json("Email does not exist");
        }
        if(result.length>0){
            // console.log(result[0].employeeNumber)
            if(password==result[0].password){
                console.log("Logged IN SUCCESSFULLY");
                res.json({
                    status:1,
                    msg:"Logged IN SUCCESSFULLY",
                    userid:result[0].employeeNumber
                });
            }else{
                console.log("Wrong Pasword");
                res.json("Wrong Pasword");
            }

        }
    });
          

//     db.select('email', 'hash').from('login')
//       .where('email', '=', email)
//       .then(data => {
//         const isValid = bcrypt.compareSync(password, data[0].hash);
//         if (isValid) {
//           return db.select('*').from('users')
//             .where('email', '=', email)
//             .then(user => {
//               res.json(user[0])
//             })
//             .catch(err => res.status(400).json('unable to get user'))
//         } else {
//           res.status(400).json('wrong credentials')
//         }
//       })
//       .catch(err => res.status(400).json('wrong credentials'))

}
  
  module.exports = {
    handlelogin: handlelogin
  }