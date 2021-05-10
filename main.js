const express =  require("express");
const app = express();

//heroku stuff
const port = process.env.PORT || 5000;

const nav = [
    {
        link: '/books', name:'Books'
    }, 
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/signup', name: 'Sign up'
    },
    {
        link: '/admin', name: 'Admin'
    }
];



const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);


app.use(express.static('./public'));

app.set('view engine','ejs');
app.set('views',__dirname+"/src/views");

app.use('/books',booksRouter);     //all exclusively declared routers
app.use('/authors', authorRouter);

// var fs = require('fs');
// var path = require('path');
// require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/admin', adminRouter);

app.get('/',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
    res.render("index",
    {   
        nav,
        title: 'Library'
        
    });
});

//SIGN UP ROUTER
app.get('/signup', function(req, res){
    res.render('signup',
        {
            nav,
            title: "Signup"
        })
})
//LOGIN ROUTER
app.get('/login', (req, res) => {    //using arrow function
    res.render('login',
        {
            nav,
            title: "Login"
        })
});

app.listen(port, ()=>{console.log("Server Ready at " + port)});