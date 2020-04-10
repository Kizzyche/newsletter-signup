
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
       
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;

        const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields:{
                        FNAME: fname,
                        LNAME: lname
                    }

                }
            ]
           
        }
        const jsonData = JSON.stringify(data);
        
        const url = 'https://us19.api.mailchimp.com/3.0/lists/d076a16607';
        const options = {
            method: "POST",
            auth: "kizito:86fd188dee0ca6a1a513d2d945f544ac-us19"
        }
        // '86fd188dee0ca6a1a513d2d945f544ac-us19/d076a16607'

       const request = https.request(url, options, function(response){
           if(response.statusCode === 200){
               res.sendFile(__dirname + "/success.html");
           }else{
               res.sendFile(__dirname + "/fail.html");
           }

            response.on("data", function(d){
                console.log(JSON.parse(d));
            })
        })

        request.write(jsonData);
        request.end();
    }

     
 })

 app.listen(port, function(){
     console.log("Starting Server on Port " + port + "....")
 })