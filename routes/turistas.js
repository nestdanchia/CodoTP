var express = require('express');
var router = express.Router();

var dbConn = require('../database');

router.get('/',function(req, res, next) {    
    const sessionData = req.session;
   console.log("sessionData:",sessionData );
   if(sessionData.user_id ==1){
    dbConn.query('SELECT * FROM agencia.turista ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/turistas/index.ejs
            res.render('turistas',{data:''});   
        } else {
            // render en  views/turistas/index.ejs
            res.render('turistas',{data:rows});
        }
    
    });
  } else{
   
   
    console.log("Debes Logearte");
    res.render('index', { title: 'Debes Logearte', session : req.session });
  }
   
});



// display add turista page
router.get('/add', function(req, res, next) {    
   
   
    // renderiza add.ejs envia las variables vacias para que se completen en el form post
    res.render('turistas/add', {
        nombre: '',
        apellido: '',
        direccion:''
    })
})

// aagregar a un nuevo turista
router.post('/add',function(req, res, next) {    
    
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion= req.body.direccion;
    let errors = false;

    if(nombre.length === 0 || apellido.length === 0 || direccion=== 0) {
        errors = true;

        // set flash message
        req.flash('error', "Ingrese nombre apellido direccion  ");
        // render con  add.ejs 
        res.render('turistas/add', {
            nombre: nombre,
            apellido: apellido,
            direccion:direccion
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombre: nombre,
            apellido: apellido,
            direccion:direccion
        }
        
        // insert query
        dbConn.query('INSERT INTO turista SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('turistas/add', {
                    nombre: form_data.nombre,
                    apellido: form_data.apellido,
                    direccion:form_data.direccion
                })
            } else {                
                req.flash('success', 'turista agregado');
                res.redirect('/turistas');
            }
        })
    }
})

// muestra pagina de edicion 
router.get('/edit/(:id)', function(req, res, next) {
   
    let id = req.params.id;
   
    dbConn.query('SELECT * FROM turista WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if turista not found
        if (rows.length <= 0) {
            req.flash('error', 'turista  encontrado  id = ' + id)
            res.redirect('/turistas')
        }
        // if turista found
        else {
            // render edit.ejs
            res.render('turistas/edit', {
                title: 'Edit turista', 
                id: rows[0].id,
                nombre: rows[0].nombre,
                apellido: rows[0].apellido,
                direccion: rows[0].direccion
            })
        }
    })
})

// update turista data
router.post('/update/:id', function(req, res, next) {
   
    let id = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion= req.body.direccion;
    let errors = false;

    if(nombre.length === 0 || apellido.length === 0 || direccion.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Ingrese nombre apellido  direccion");
        // render  add.ejs  con  flash message
        res.render('turistas/edit', {
            id: req.params.id,
            nombre: nombre,
            apellido: apellido,
            direccion:direccion
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombre: nombre,
            apellido: apellido,
            direccion:direccion
        }
        // update query
        dbConn.query('UPDATE turista SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // seteamos a  flash message
                req.flash('error', err)
                // render edit.ejs
                res.render('turistas/edit', {
                    id: req.params.id,
                    nombre: form_data.nombre,
                    apellido: form_data.apellido,
                    direccion: form_data.direccion
                })
            } else {
                req.flash('success', 'turista ACTUALIZADO');
                res.redirect('/turistas');
            }
        })
    }
})
   
// delete turista
router.get('/delete/(:id)', function(req, res, next) {
    

    let id = req.params.id;
     
    dbConn.query('DELETE FROM turista WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to turista page
            res.redirect('/turistas')
        } else {
            // set flash message
            req.flash('success', 'turista Borrado! ID = ' + id)
            // redirect to turista page
            res.redirect('/turistas')
        }
    })
})

module.exports = router;