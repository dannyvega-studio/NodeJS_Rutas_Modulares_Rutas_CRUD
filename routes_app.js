const express = require("express");

var router = express.Router(); //objeto para crear las rutas de direccion

router.get("/",function(req,res){
    /*Buscar el ususario*/
    res.render("app/home")
});

// REST //

router.get("/imagenes/new",function(req,res){
    res.render("app/imagenes/new");
});

//editar imagenes
router.get("/imagenes/:id/edit",function(req,res){

});

//crear coleccion de imagenes
router.route("/imagenes/:id").get(function(req,res){

}).put(function(req,res){

}).delete(function(req,res){

});

//crear una ueva imagen
router.route("/imagenes").get(function(req,res){

}).post(function(req,res){

});

module.exports = router; //permite exportar objetos
