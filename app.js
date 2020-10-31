const express = require("express");
const bodyParser = require("body-parser");
var User = require("./models/user").User; //manda a llamar users.js
const session = require("express-session");
const router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var app = express();

app.use("/public",express.static("public")); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

/* app.js / rutas donde el usuario inicia sesion*/

/*app.js / rutas donde el usuario inicia sesion*/

app.use(session({
    secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: false 
}));

app.set("view engine", "pug");

app.get("/",function(req,res){
    console.log(req.session.user_id);
    res.render("index");
}); 

app.get("/signup",function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");
    });    
});

app.get("/login",function(req,res){
        res.render("login");
    }); 

app.post("/users",function(req,res){
    var user = new User({email: req.body.email, 
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation,
                        username: req.body.username
    });
    
    user.save().then(function(us){
        res.send("Usuario guardado correctamente");
    },function(err){
        if(err){
            console.log(String(err));
            res.send("No se pudo guardar la informacion");
        }
    });
});

app.post("/sessions",function(req,res){
    
    User.findOne({
        email: req.body.email, 
        password: req.body.password
    },function(err,user){
        req.session.user_id = user._id;
        res.redirect("/app");
    });

});

app.use("/app", session_middleware)
app.use("/app", router_app);

app.listen(8080);