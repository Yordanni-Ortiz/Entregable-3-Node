const request = require('supertest');
const app = require('../app.js');
require('../models');

let directorId;

test("POST /directors should create one director", async() => {
    const newDirector = {
        firstName: "Yordanni",
        lastName: "Ortiz",
        nationality: "Venezolana",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
        birthday: "1972-03-31"
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test("GET /directors should return all directors", async () => {
    const res = await request(app)
        .get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

test("PUT /directors/:id should update one director", async() => {
    const body = {
        firstName: "Yordanni upDated"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  });

test("DELETE /directors/:id should delete one director", async() => {
    const res = await request(app)
        .delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});