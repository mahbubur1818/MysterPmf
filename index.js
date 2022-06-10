const express = require('express');
const port = 4000;
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");
//const qrCodeGen = require('./public/Js/qrCodeGenerator')(spawn);
const path = require('path');
const blog = require('./public/Js/blog');
const app = express();
const mongoose = require('mongoose');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json())

// mongoose.connect('mongodb+srv://mysterpmf:Oops@cluster0.9mcz1.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true})
//       .then(()=>console.log('database connected'))
//       .catch((err)=>console.log("error in database: ${err}"))

// routes
app.get('/',(req,res)=>{
  res.render("index",{stylesheet:'index.css' });
});
app.get('/About',(req,res)=>{
  res.render("about");
})
app.get('/Tools',(req,res)=>{
  res.render("tools");
})
app.get('/Programming',(req,res)=>{
  res.render("programming");
})

app.get('/Programming/:blogId',(req,res)=>{
  blogg = req.params.blogId;
  blogg =blog[parseInt(blogg.slice(4))-1];
  console.log(blogg)
  res.render("programmingBlog",{blogg});
})
app.get('/qrCodeGenerator',(req,res)=>{
  res.render('qrCodeGenerator')
})
app.post('/qrCodeGenerator/process',(req,res)=>{
  let argv= req.body.text;
  console.log(argv)
  const pythonProcesses = spawn('python',["./public/python/generator.py", argv]);
  pythonProcesses.stdout.on('data', (data) => {
    data = data.toString();
  console.log("data is",data);
});
  console.log("outside data is");
})
app.get('/*',(req,res)=>{
  res.render("404");
})

app.listen(port,()=>{
  console.log("got it");
});