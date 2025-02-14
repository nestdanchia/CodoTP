var express = require('express');
var router = express.Router();

var database = require('../database');
// Authentication and Authorization Middleware

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Agencia', session : req.session });
});




router.post('/login', function(request, response, next){
   
    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;
    console.log (user_password,user_email_address)

    if(user_email_address && user_password)
    {
        query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function(error, data){
               console.log("Data :",data,"Query:",query)
            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == user_password)
                    {
                        request.session.user_id = data[count].user_id;
                     // en esta ruta responde al get mostrando el pamel 
                     //de administracion la sesion ya se configuro
                        response.redirect("/");
                    }
                    else
                    {    
                       // response.send('Incorrect Password');

                       response.render('index',{title:'',session:request.session})
                   
                  
                       
                    }
                }
            }
            else
            {   
               //esponse.send('Incorrect email');
               response.render('index',{title:'',session:request.session})
             
         
                    
                
            }
            response.end();
        });
    }
    else
    {
       // response.send('Please Enter Email Address and Password Details');
        
       response.render('index',{title:'',session:request.session})
       response.end();
    }

});



router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;

