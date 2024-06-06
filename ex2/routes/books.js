var express = require('express');
var router = express.Router();
var axios = require('axios');
const books = require('../../ex1/models/books');

router.get('/', function(req, res, next) {
  axios.get("http://localhost:17000/books")
        .then(resp => {
          const books = resp.data
          res.status(200).render("startPage", {"blist": books})
        })
        .catch( erro =>{
          res.status(502).render("error", {"error": erro})
        })
});


router.get('/:idLivro', function(req, res, next) {
  var id = req.params.idLivro
  axios.get("http://localhost:17000/books/" + id)
    .then(resp => {
      b = resp.data
      res.status(200).render("livroPage", {"book": b})
    })
    .catch( erro =>{
      res.status(503).render("error", {"error": erro})
    })
});

router.get('/authors/:idAutor', function(req, res, next) {
  autor = req.params.idAutor
  axios.get("http://localhost:17000/books?autor=" + autor)
        .then(resp => {
          books = resp.data
          var sum = books.length

          axios.get("http://localhost:17000/books?nome=" + autor)
            .then(resp => {
              res.status(200).render("authorPage", {"nome": resp.data.name, "id" : autor, "blist": books, "soma": sum})
            })
            .catch( erro => {
              res.status(504).render("error", {"error": erro})
            })
        })
        .catch( erro => {
          res.status(504).render("error", {"error": erro})
        })
});



module.exports = router;
