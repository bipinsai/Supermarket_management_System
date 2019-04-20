const addemp = (connection) => (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let phno = req.body.phno;
    let lname = req.body.lname;
    let fname = req.body.fname;
    let street = req.body.street;
    let city = req.body.city;
    let state = req.body.state;
    let jobTitle = req.body.jobtitle;
    let salary = req.body.salary;
    let branchno = req.body.branchid;
    console.log(city + " " +state+" "+street);
    
    // if (!email || !password) {
    //   return res.status(400).json('incorrect form submission');
    // }

    console.log("handling adding employee");

    connection.query("SELECT * FROM EMPLOYEE where email='"+email +"'", function (err, result, fields) {
        if (err) throw err;
        if(result.length==0){
            
            connection.query(`INSERT INTO EMPLOYEE(FIRST_NAME,LAST_NAME,EMAIL,PASSWORD,STREET,CITY,STATE,PH_NO,BRANCH_ID,JOB_TITLE,SALARY) VALUES
                            ('${fname}','${lname}','${email}','${password}','${street}','${city}','${state}','${phno}',${branchno},'${jobTitle}',${salary})`, function (err, result, fields) {
                
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