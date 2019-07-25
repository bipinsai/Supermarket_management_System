const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const login = require('./serverhandles/login');
const handleaddemp = require('./serverhandles/handleaddemp');
const handlehome = require('./serverhandles/handlehome');
const searchproduct = require('./serverhandles/searchproduct');
const getItems = require('./serverhandles/getItems');
const handlepayment = require('./serverhandles/handlepayment');
const handlegetemp = require('./serverhandles/handlegetemp');
const handlermemp = require('./serverhandles/handlermemp');
const handlesales = require('./serverhandles/handlesales');
const md5   = require("blueimp-md5");



const app = express();
app.use(cors());
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host : '127.0.0.1',
  port  : 3306,
  user     : 'root',
  password : 'Rohith@2003',
  database : 'SuperMarket',
  insecureAuth : true
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if(err)console.log(err);
  
  console.log("Database connected");



app.post('/login',  login.handlelogin(connection))

app.post('/home', handlehome.handlehome(connection))

app.post('/addemp', handleaddemp.addemp(connection))

app.post('/searchproduct', searchproduct.search(connection))

app.post('/getItems', getItems.getItems(connection))

app.post('/getemp', handlegetemp.getemp(connection))

app.post('/rmemp', handlermemp.rmemp(connection))

app.post('/payment', handlepayment.pay(connection))

app.post('/getSales', handlesales.getSales(connection))

app.listen(3000, ()=>{console.log("running on 3000");})


});
