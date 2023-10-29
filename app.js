const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const port = 3000;

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: 'db',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'dbname',
});

connection.connect((err) => {
    if (err) {
      console.log('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to the database');
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log("User InputD Data: ", req.body.fname, req.body.lname, req.body.email);
    const insertDataQuery = `
    INSERT INTO users (f_name, l_name, email)
    VALUES (?, ?, ?);
    `;
    connection.query(insertDataQuery, [req.body.fname, req.body.lname, req.body.email], (insertError) => {
        if (insertError) {
          console.error('Error inserting data: ' + insertError.stack);
          res.send('Error inserting data into the database');
          return;
        }
        console.log('Data inserted into the table');
        res.send('Data inserted successfully');
    });
    res.sendFile(__dirname + "/index.html");
});

app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})