const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: [Genre,Actor,Director] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMovieActors = catchError(async(req, res) =>{
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setActors(req.body);
    const actor = await movie.getActors();
    return res.json(actor);
});

const setMovieDirectors = catchError(async(req, res) =>{
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setDirectors(req.body);
    const director = await movie.getDirectors();
    return res.json(director);
});

const setMovieGenres = catchError(async(req, res) =>{
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setGenres(req.body);
    const genre = await movie.getGenres();
    return res.json(genre);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieActors,
    setMovieDirectors,
    setMovieGenres
}