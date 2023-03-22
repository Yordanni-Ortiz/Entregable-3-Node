const { getAll, create, getOne, remove, update, setGenresMovies } = require('../controllers/genre.controllers');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route('/')
    .get(getAll)
    .post(create);

genreRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

genreRouter.route('/:id/movies')
    .post(setGenresMovies);

module.exports = genreRouter;