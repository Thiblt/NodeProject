const request = require("supertest");
const app = require("../index.js");

describe("bars router test ", () => {
  // TODO : retourner la liste des bars
  it("should return all bars", async () => {
    const response = await request(app).get("/bars");

    expect(response.status).toEqual(200);
    console.log(response.body.length);
    expect(response.body.data).not.toBe(undefined);
  });

  // TODO : retourner la liste des bars avec un filtre
  it("should return all bars with a filter", async () => {
    const response = await request(app).get("/bars?ville=poitiers&name=saint");

    expect(response.status).toEqual(200);
    expect(response.body.data).not.toBe(undefined);
  });

  // TODO : retourner la liste des commandes d'un bars par son id
  it("should return all bars and their orders", async () => {
    const response = await request(app).get("/bars/2/orders?date=2024-04-25&price_min=10&price_max=20");

    expect(response.status).toEqual(200);
    expect(response.body.data).not.toBe(undefined);
  });

  // TODO : retourner un bar par son id
  it("should return one bar", async () => {
    const response = await request(app).get("/bars/1");

    expect(response.status).toEqual(200);
    console.log(response.body.length);
    expect(response.body.data).not.toBe(undefined);
  });

  // TODO : ajouter un bar
  it("should add a bar", async () => {
    const response = await request(app).post("/bars").send({
      name: "Le Saint Bar 3",
      adresse: "1, rue des champs, 86000 poitiers",
      tel: "01.02.03.04.05",
      email: "test@test.test",
      description: "Le bar des saint !",
    });

    expect(response.status).toEqual(200);
    expect(response.body.data).not.toBe(undefined);
  });

  // TODO : modifier un bar
  it("should update a bar", async () => {
    const response = await request(app).put("/bars/1").send({
      name: "Le Saint Bar 3 modif",
    });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual(
      "Success: Request successfully completed"
    );
  });

  // TODO : supprimer un bar
  it("should delete a bar", async () => {
    const response = await request(app).delete("/bars/1");

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual(
      "Success: Request successfully completed"
    );
  });
});
