var express = require('express');
var router = express.Router();
var Book = require("../models/").Book;





/* GET: books listing */
router.get('/', (req, res, next) => {
  Book.findAll({ order: [[ "createdAt", "DESC" ]]}).then( books => {
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

/* GET: Update Book*/
router.get("/:id/update", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {
      if(book) {
        res.render("books/update", {book: book, title: "Update Book"});
      } else {
        res.send(404);
      }
  }).catch( error => {
    res.send(500, error);
 });
}); 

/* GET: Delete book view */
router.get("/:id/delete", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {  
      if(book) {
       res.render("books/delete", {book: book, title: "Delete Book"});
      } else {
        res.send(404);
      }
  }).catch( error => {
      res.send(500, error);
   });
});



/* GET: individual book*/
router.get("/:id", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {
      if(book) {
        res.render("books/show", {book: book, title: "Book Details"});
      } else {
        res.send(404);
      }
  }).catch( error => {
    res.send(500, error);
 });
}); 

/* POST: Update Book*/
router.post("/:id", (req, res, next) => {
  Book.findByPk(req.params.id).then( book => {
    if (book) {
      return book.update(req.body);
    } else {
      res.send(404)
    }
  }).then( book => {
    res.redirect("/books/" + book.id);
  }).catch( error => {
    if (error.name === "SequelizeValidationError") {
      var book = Book.build(req.body);
      book.id = req.params.id;
      res.render("books/:id", {book: book, errors: error, title: "Update Book"})
    } else {
      throw error;
    }
  }).catch( error => {
    res.send(500, error);
  });
});

/* DELETE individual book */
router.post("/:id", (req, res, next) => {
  Book.findByPk(req.params.id).then( book => {  
    if(book) {
      return book.destroy();
    } else {
      res.send(404);
    }
  }).then( () => {
    res.redirect("/books/");    
  }).catch( error => {
      res.send(500, error);
   });
});

router.get( (req, res) => {
  res.status(404).render("error");
});

module.exports = router;
