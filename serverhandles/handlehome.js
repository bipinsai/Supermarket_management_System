const md5   = require("blueimp-md5");

const handlehome = (connection) => (req, res) => {
    console.log(req.body);
    let useridhash = req.body.useridhash;

    console.log("handling home");

    connection.query("SELECT * FROM testemp", function (err, result, fields) {
        if (err) throw err;
        
        // console.log(result);

        let emp = null;
        result.map((row)=>{
            if(md5(row.employeeNumber)==useridhash){
                // console.log(row.employeeNumber + "   " + useridhash);                
                emp = row;
            }
        })
        console.log(emp);
        if(emp) res.json(emp);
        // if(result.length==0){
        //     console.log("Email does not exist");
        //     res.json("Email does not exist");
        // }
        // if(result.length>0){
        //     // console.log(result[0].employeeNumber)
        //     if(password==result[0].password){
        //         console.log("Logged IN SUCCESSFULLY");
        //         res.json({
        //             status:1,
        //             msg:"Logged IN SUCCESSFULLY",
        //             userid:result[0].employeeNumber
        //         });
        //     }else{
        //         console.log("Wrong Pasword");
        //         res.json("Wrong Pasword");
        //     }

        // }
    });
}
  
module.exports = {
    handlehome: handlehome
}