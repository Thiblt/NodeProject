const request = require('supertest');
const app = require('../index.js');

describe('Test des routes order', () => {

     it("POST /beer_order/:id_commande/biere/:id_biere => Ajouter une biere à une commande", async () => {
       const response = await request(app).post('/beer_order/10/biere/1')
       expect(response.status).toEqual(200);
       expect(response.body).toHaveProperty('id_beer', 1);
        expect(response.body).toHaveProperty('id_order', 10);
        
     });

     it("Delete /beer_order/:id_commande/biere/:id_biere => Supprimer une biere à une commande", async () => {
        const response = await request(app).delete('/beer_order/10/biere/1');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Beer deleted from order successfully.");
      });



  
  });
