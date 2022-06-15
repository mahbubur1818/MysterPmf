const express = require('express');
const port = 5000;
const spawn = require("child_process").spawn;
const fileUpload = require('express-fileupload');
const cors = require('cors');
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
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
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

//process
app.post('/qrCodeGenerator/process',(req,res)=>{
  let argv= req.body.text;
  let color = req.body.color;
  let name = req.body.location;
  //name = name.strip();
  console.log(name);
  
  if (name == 'false'){
  console.log('without name')
  var pythonProcesses = spawn('python',["./public/python/generator.py", argv,color]);
  }else{
  console.log('with name')
    var pythonProcesses = spawn('python',["./public/python/generatorPro.py", argv,color,name]);
  }
  pythonProcesses.stdout.on('data', (data) => {
  data = data.toString();
  //data = data.strip();
  data = 'python/qrCode/' + 'data';
  console.log("data is",data);
  setTimeout(function(){ 
  res.send(data);
  }, 500);
});
})
app.post("/qrCodeGenerator/process/upload",(req,res)=>{
  try{
  if(!req.files){
    res.send({
      status: false
  });
  }else{
    let file = req.files.file;
    let location ="./public/python/Logo/" + file.name;
    file.mv(location);
    console.log(location)
    res.send({
                status: true,
                name: location
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

//mail service

const nodemailer = require('nodemailer');
 
let transport = nodemailer.createTransport({
   host: 'smtp.mailtrap.io',
   port: 2525,
   auth: {
     user: "6011f8adda43b3",
     pass: "b3bc71708ff08a"
   }
});
 

app.post('/message',(req,res)=>{
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let mailDetails = {
    from: email,
    to: 'mahbuburrahmanpmf@gmail.com',
    subject: 'Website Comment',
    html: `<b> Name: </b> <p style="color:green">${name}</p><b> Email: </b><p style="color:green"> ${email} </p><b> Message: </b><p style="color:green"> ${message} </p>`
};
 
transport.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});
  
  res.send({'status':true})
})


app.get('/*',(req,res)=>{
  res.render("404");
})

app.listen(port,()=>{
  console.log("App is running on port ",port);
});