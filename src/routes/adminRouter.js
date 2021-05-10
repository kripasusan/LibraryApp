const express = require('express');
const adminRouter = express.Router()
const BookData = require('../model/bookData');



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
    return adminRouter;
}

module.exports = router;


