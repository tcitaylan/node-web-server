const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use("/vendors",express.static(__dirname + "/views/vendors"));
app.use("/css",express.static(__dirname + "/views/css"));
app.use("/img",express.static(__dirname + "/views/img"));

app.use((req, res, next)=>{
    
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n', (err)=>{
        if(err) {
            console.log('Unable to connect server');
        }
    });
    
    console.log(log);
    next();
});

// app.use((req,res)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text)=>{
    return text.toUpperCase();
});

app.get('/anotherpage', (req,res)=>{
    res.render('anotherpage.hbs');
})

app.get('/', (req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.render('index.hbs', {
        pageTitle:"Tenis Partnerim",
        message:"Merhaba"
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/addincome',(req,res)=>{
    res.send('Please add some extra income!');
})

app.get('/bad',(req,res)=>{
    res.send({
        error:'Bad request'
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});