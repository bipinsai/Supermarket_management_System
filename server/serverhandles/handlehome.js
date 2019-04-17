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
  
    });
}
  
module.exports = {
    handlehome: handlehome
}