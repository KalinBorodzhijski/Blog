var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blogs",{ useNewUrlParser: true ,  useUnifiedTopology: true });


var article = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now}
});

var articles = mongoose.model("article",article);

app.get("/",(req,res) =>{
    res.redirect("/blogs");
});

app.get("/blogs",(req,res) => {
    articles.find({},(err,element) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{elements: element});
        }
    })
    
});

app.get("/blogs/new",(req,res) => {
    res.render("new");
});

app.post("/blogs",(req,res) =>{
    articles.create({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body
    },(err,element) => {
        if(err){
            console.log(err);
        }
    });
    res.redirect("/blogs");
});

app.get("/blogs/:id",(req,res) => {
    articles.find({_id: req.params.id},(err,elements)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{article: elements[0]});
        }
    });
    

});




app.listen(3000,()=>{
    console.log("Blog server started");
})