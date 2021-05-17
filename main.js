const express =  require("express");
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/LibraryApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { console.log(err); })
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
        link: '/login', name: 'Admin'
    }
];



const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const userRouter = require('./src/routes/userRouter')(nav);

app.use(express.static('./public'));

app.set('view engine','ejs');
app.set('views',__dirname+"/src/views");

app.use('/books',booksRouter);     //all exclusively declared routers
app.use('/authors', authorRouter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/admin', adminRouter);
app.use('/user', userRouter);

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