const express = require('express');
const adminRouter = express.Router()
const BookData = require('../model/bookData');
const AuthorData = require('../model/authorData');

//module.exports = authorData
function router(nav) {

    adminRouter.get('/', (req, res) => {
        res.render('admin',
            {
                nav,
                title: "Library"
            })
    })


    adminRouter.post('/addBook',function(req,res){
        var item = {
            title : req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description : req.body.description,
            image: req.body.image
            
        }
         var Book = BookData(item);
         Book.save();
         res.redirect('/books');
    })

    adminRouter.post('/addauthor',function(req,res){
        var item = {
            name : req.body.name,
            nationality: req.body.nationality,
            born: req.body.born,
            description : req.body.description,
            image: req.body.image
            
        }
         var Author = AuthorData(item);
         Author.save();
         res.redirect('/authors');
    })


    adminRouter.post('/:id/bookedit',function(req,res){
        var item = {
            title : req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description : req.body.description,
            image: req.body.image
            
        }
         BookData.findByIdAndUpdate(req.params.id,item);
         res.redirect('/books')
    })
    adminRouter.post("/:id/bookdelete",function(req,res){
        BookData.findByIdAndDelete(req.params.id);
        res.redirect('/books')
    })



    adminRouter.post('/authoredit',function(req,res){
        var item = {
            name : req.body.name,
            nationality: req.body.nationality,
            born: req.body.born,
            description : req.body.description,
            image: req.body.image
            
        }
         authorData.findByIdAndUpdate(req.params.id,item)
         res.redirect('/authors');
    })
    adminRouter.post("/:id/authordelete", function(req, res){
         authorData.findByIdAndDelete(req.params.id);
         res.redirect('/authors')
    })
    
    return adminRouter;
}

module.exports = router;


