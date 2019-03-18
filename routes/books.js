var express = require('express');
var router = express.Router();
var Book = require("../models/").Book;





/* GET: books listing */
router.get('/', (req, res, next) => {
  Book.findAll().then( books => {
    res.render("index", { books: books, title: 'Books' });
  });
});



/* POST: create book*/
router.post('/', (req, res, next) => {
  Book.create(req.body).then( (book) => {
    res.redirect("/books/" + book.id);
  }).catch( error => {
    if(error.name === "SequelizeValidationError") {
      res.render("books/new", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }).catch( error => {
    res.send(500, error);
  });
});


/* GET: create a new book form */
router.get('/new', (req, res, next) => {
  res.render("books/new", { book: {}, title: "New Books" });
});


/* GET: individual book */
router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then( book => {
      if(book) {
        res.render("books/show", {book: book, title: book.title});  
      } else {
        res.send(404);
      }
  }).catch(function(error){
    res.send(500, error);
 });
}); 

module.exports = router;
