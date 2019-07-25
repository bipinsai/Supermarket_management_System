const getemp = (connection) => (req, res) => {
    let branchid = req.body.BRANCH_ID;
    console.log("handling get employee");

    connection.query(`SELECT * FROM EMPLOYEE where BRANCH_ID=${branchid}`, function (err, result, fields) {
        if (err) throw err;
        if(result.length==0){
            res.json({
                'status':0,
                'msg':'No employees at this branch'
            });
        }else{
            res.json({
                status:1,
                'emplist':result,
            })
        }
    });

}
  
  module.exports = {
    getemp: getemp
  }