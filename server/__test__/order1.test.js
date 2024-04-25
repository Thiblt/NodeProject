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
    expect(response.body.id_bar).toEqual(1);
  });

  it("GET /orders/bars/:id_bar => Liste des commandes d'un bars", async () => {
    const response = await request(app).get("/orders/bars/1");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET //orders/:id_commande => Détail d'une commande d'un bars", async () => {
    const response = await request(app).get("/orders/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("id_bar");
    expect(response.body).toHaveProperty("status");
  });

  it("PUT //orders/:id_commande => Modifier une commande d'un bars", async () => {
    const response = await request(app)
      .put("/orders/1")
      .set("Accept", "application/json")
      .send({ name: "order test2" });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("name", "order test2");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("id_bar");
    expect(response.body).toHaveProperty("status");
  });

  it("GET /orders/details/:id_commande => Afficher un pdf de la commande", async () => {
    const response = await request(app).get("/orders/details/1");
    expect(response.status).toEqual(200);
    expect(response.header["content-type"]).toContain("application/pdf");
  }, 10000);
});

// it("GET /orders/bars/:id_bar => Liste des commandes d'un bars", async () => {
//   const response = await request(app).delete(' /orders/bars/1');
//   expect(response.statusCode).toBe(200);
// });
