
 const express = require("express");
 const app = express();
 const bodyParser = require("body-parser");
 const request = require("request");
 const port = process.env.PORT || 3000 ;

 app.use(bodyParser.urlencoded({extended: true}))

 app.use(express.static('/public'))

 app.get("/", function(req, res){
     res.sendFile(__dirname + "/signup.html")
 })

 app.listen(port, function(){
     console.log("Starting Server on Port " + port + "....")
 })