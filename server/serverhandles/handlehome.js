const md5   = require("blueimp-md5");

const handlehome = (connection) => (req, res) => {
    console.log(req.body);
    let useridhash = req.body.useridhash;

    console.log("handling home");

    connection.query("SELECT * FROM EMPLOYEE", function (err, result, fields) {
        if (err) throw err;        
        let emp = null;
        result.map((row)=>{
            if(md5(row.EMP_ID)==useridhash){
                emp = row;
            }
        })
        connection.query(`SELECT BRANCH_NAME FROM EMPLOYEE,BRANCH WHERE EMPLOYEE.BRANCH_ID=BRANCH.BRANCH_ID AND EMPLOYEE.EMP_ID=${emp.EMP_ID}`, function (err1, result1, fields) {
            if (err1) throw err1;        
            if(result1){
                console.log(result1[0]);
                
                emp.BRANCH_NAME = result1[0].BRANCH_NAME;
                console.log(emp);
                if(emp) res.json(emp);
            }else{
                
                if(emp) res.json(emp);
            }
        });
        
  
    });
}
  
module.exports = {
    handlehome: handlehome
}