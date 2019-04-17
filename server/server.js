const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const login = require('./serverhandles/login');
const handleaddemp = require('./serverhandles/handleaddemp');
const handlehome = require('./serverhandles/handlehome');
const md5   = require("blueimp-md5");



const app = express();
app.use(cors());
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host : '127.0.0.1',
  port  : 3306,
  user     : 'root',
  password : 'Rohith@2003',
  database : 'classicmodels',
  insecureAuth : true
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if(err)console.log(err);
  
  console.log("Database connected");


  // connection.query("SELECT * FROM testemp", function (err, result, fields) {
  //   // if (err) throw err;
  //   console.log(result);
  // });
  



// app.get('/', (req,res)=>{
//     console.log('got it');
//     console.log(req.query);
//     res.json(req.query);
// })


app.post('/login',  login.handlelogin(connection))

app.post('/home', handlehome.handlehome(connection))

app.post('/addemp', handleaddemp.addemp(connection))

app.listen(3000, ()=>{console.log("running on 3000");})


});
