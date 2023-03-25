const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require('../models/Actor')
require('../models')

let movieId;

test("POST /movies should create one movie", async() => {
    const newMovie = {
        name: "Avengers Endgame",
        image: "https://lumiere-a.akamaihd.net/v1/images/690x0w_f1b0509a.jpeg?region=0%2C0%2C690%2C1035",
        synopsis: "Días después del Chasquido de Thanos, Tony Stark y Nebula quedan a la deriva en el espacio exterior.",
        releaseYear: 2019
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies should return all movies", async () => {
    const res = await request(app)
        .get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});



test("PUT /movies/:id should update one movie", async() => {
    const body = {
        name: "Avenges Endgame upDated"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
  
test("POST /movies/:id/actors should set the movies actors", async () => {
    const actor = await Actor.create({
        firstName: "Anya",
        lastName: "Taylor-Joy",
        nationality: "Estados Unidos",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Anya_Taylor-Joy_by_Patrick_Lovell%2C_January_2019.jpg/330px-Anya_Taylor-Joy_by_Patrick_Lovell%2C_January_2019.jpg",
        birthday: "1996-04-16"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/actors`)
      .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movies directors", async () => {
    const director = await Director.create({
        firstName: "Aaron",
        lastName: "Horvath",
        nationality: "Estados Unidos",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Aaron_Horvath_by_Gage_Skidmore.jpg/330px-Aaron_Horvath_by_Gage_Skidmore.jpg",
        birthday: "1980-08-19"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/directors`)
      .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movies genres", async () => {
    const genre = await Genre.create({
        name: "Comedia"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/genres`)
      .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
 
test("DELETE /movies/:id should delete one movie", async() => {
    const res = await request(app)
        .delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});