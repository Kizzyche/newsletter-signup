
 const express = require("express");
 const app = express();
 const bodyParser = require("body-parser");
 const joi = require("joi");
 const https = require("https");
 const request = require("request");
 const port = process.env.PORT || 3000 ;

 app.use(bodyParser.urlencoded({extended: true}))

 app.use(express.static('/public'));

 app.get("/", function(req, res){
     res.sendFile(__dirname + "/signup.html")
 })

 app.post("/", function(req, res){

    const schema = {
        fname: joi.string(),
        lname: joi.string(),
        email: joi.string().email({minDomainAtoms: 2})
    }

    const result = joi.validate({fname: req.body.fname, lname: req.body.lname, email: req.body.email}, schema);

    if(result.error){
        res.sendFile(__dirname + "/fail.html");
    }else{
       

        
    }

     
 })

 app.listen(port, function(){
     console.log("Starting Server on Port " + port + "....")
 })