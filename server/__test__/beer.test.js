const request = require("supertest");
const app = require("../index.js");

describe("Road of Beer testing", () => {
  it("POST /beers/bars/:id => Ajouter une bière à un bars", async () => {
    const response = await request(app)
      .post("/beers/bars/1")
      .set("Accept", "application/json")
      .send({
        name: "Paix Dieuv3",
        description: "Bière blonde forte",
        degree: 10.5,
        price: 10,
        id_bar: 1,
      });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Paix Dieuv3");
    expect(response.body.description).toEqual("Bière blonde forte");
    expect(response.body.degree).toEqual(10.5);
    expect(response.body.price).toEqual(10);
    expect(response.body.id_bar).toEqual(1);
  });

  it("PUT /beers/:id => Modifier une bière", async () => {
    const response = await request(app)
      .put("/beers/2")
      .set("Accept", "application/json")
      .send({
        name: "Paix Dieuv3",
        description: "Bière blonde forte",
        degree: 10.5,
        price: 10,
        id_bar: 1,
      });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Paix Dieuv3");
    expect(response.body.description).toEqual("Bière blonde forte");
    expect(response.body.degree).toEqual(10.5);
    expect(response.body.price).toEqual(10);
    expect(response.body.id_bar).toEqual(1);
  });
  it("DELETE /beers/:id => Supprimer une bière", async () => {
    const response = await request(app).delete("/beers/1");

    expect(response.status).toEqual(200);
    /* expect(response.body.name).toEqual("Paix Dieuv3");
    expect(response.body.description).toEqual("Bière blonde forte");
    expect(response.body.degree).toEqual(10.5);
    expect(response.body.price).toEqual(10);
    expect(response.body.id_bar).toEqual(1); */
  });
  it("GET beers/bars/:id => Voir les bières du bar", async () => {
    const response = await request(app).get("/beers/bars/1");

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
  it("GET beers/:id => Voir les détails de la bière", async () => {
    const response = await request(app).get("/beers/1");

    expect(response.status).toEqual(200);
  });

  it("GET /bars/:id_bar/beer?sort=asc => Liste des biere d'un bars triées par ordre alphabétique", async () => {
    const response = await request(app).get("/bars/1/beer?sort=asc");

    expect(response.status).toEqual(200);
  });

  it("GET /bars/:id_bar/beer?sort=desc => Liste des biere d'un bars triées par ordre alphabétique inversé", async () => {
    const response = await request(app).get("/bars/1/beer?sort=desc");

    expect(response.status).toEqual(200);
  });
  it("GET /bars/:id_bar/beer?sort=desc&limit=10 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10", async () => {
    const response = await request(app).get("/bars/1/beer?sort=desc&limit=10");

    expect(response.status).toEqual(200);
  });

  it("GET /bars/:id_bar/beer?sort=desc&limit=10&offset=5 => Liste des biere d'un bars triées par ordre alphabétique", async () => {
    const response = await request(app).get(
      "/bars/1/beer?sort=desc&limit=10&offset=5"
    );

    expect(response.status).toEqual(200);
  });

  it("GET /bars/:id_bar/beer?sort=desc&degree_min=3&degree_max=11 => Liste des biere d'un bars triées par ordre alphabétique avec un degré d'alcool compris entre 3 et 11", async () => {
    const response = await request(app).get(
      "/bars/1/beer?sort=desc&degree_min=3&degree_max=11"
    );

    expect(response.status).toEqual(200);
  });

  it("GET /bars/:id_bar/beer?sort=desc&limit=10&price_min=10&price_max=20 => Liste des biere d'un bars triées par ordre alphabétique et limitées à 10 et un prix compris entre 10 et 20 ", async () => {
    const response = await request(app).get(
      "/bars/1/beer?sort=desc&limit=10&price_min=10&price_max=20"
    );

    expect(response.status).toEqual(200);
  });
});
