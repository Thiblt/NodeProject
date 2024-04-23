const request = require("supertest");
const app = require("../index.js");

describe("Test des routes order", () => {
  it("POST /orders/bars/:id_bar => Ajouter une commande à un bars", async () => {
    const response = await request(app)
      .post("/orders/bars/1")
      .set("Accept", "application/json")
      .send({
        name: "order test",
        price: 12,
        date: "2024/04/22",
        status: "en cours",
      });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("order test");
    expect(response.body.price).toEqual(12);
    expect(response.body.date).toEqual("2024/04/22");
    expect(response.body.status).toEqual("en cours");
  });

  // it("GET /orders/bars/:id_bar => Liste des commandes d'un bars", async () => {
  //   const response = await request(app).delete(' /orders/bars/1');
  //   expect(response.statusCode).toBe(200);
  // });
});
