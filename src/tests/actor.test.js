const request = require('supertest');
const app = require('../app.js');
require('../models');

let actorId;

test("POST /actors should create one actor", async() => {
    const newActor = {
        firstName: "Yordanni",
        lastName: "Ortiz",
        nationality: "Venezolana",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
        birthday: "1997-02-10"
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newActor.name);
});

test("GET /actors should return all actors", async () => {
    const res = await request(app)
        .get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test("PUT /actors/:id should update one actor", async() => {
    const body = {
        firstName: "Yordanni upDated"
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  })

test("DELETE /actors/:id should delete one actor", async() => {
    const res = await request(app)
        .delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
})