const express=require('express')
const bodyParser=require('body-parser')
var mysql = require('mysql')
const app=express()

app.use(bodyParser.urlencoded({extended: false}))
app.use('/static',express.static('public'));
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
  });
  
  app.get('/',function(req,res){
    res.sendFile('index.html',{root:__dirname});
})
  connection.connect(function(err){
    if (err) throw err;
    console.log('connected');
  });

app.post('/submit-data',function(req,res){
   
     var sql= "INSERT INTO customer (name,email,mssg)values('" + req.body.name + "','" + req.body.email + "','" + req.body.mssg + "')";
    connection.query(sql, function (err) {
       
    
        res.send('<h1><center>Thanks for contacting us<br><br>We will get back to you so</center><h1>');
   
 });

   connection.end();

});
app.listen(8082);
