const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', async (req, res) => {
    if (req.query.charater) {
      booksController.findByCharacter(req.query.charater)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(502).json(err));
    } else if (req.query.genre) {
      booksController.findByTipoGenre(req.query.genre)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(503).json(err));
    } else if (req.query.autor) {
      booksController.findByAutor(req.query.autor)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(504).json(err));
    } else if (req.query.nome) {
      booksController.findName(req.query.nome)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(505).json(err));

    } else {
      booksController.listTotal()
            .then(data => res.status(201).json(data))
            .catch(err => res.status(504).json(err));
    }
});

router.get('/characters', (req, res) => {
  booksController.listCharacter()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(506).json(err));
});

router.get('/genres', (req, res) => {
  booksController.listGenres()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(507).json(err));
});

router.get('/:id', (req, res) => {
  booksController.findById(req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  booksController.insert(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(508).json(err));
});

router.delete('/:id', (req, res) => {
  booksController.delete(req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(509).json(err));
});

router.put('/:id', (req, res) => {
  booksController.update(req.body, req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(510).json(err));
});

module.exports = router;