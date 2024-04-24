const routes = {
  bars: {
    /**
     * Lister les bars (GET) : http://localhost:3001/bars
     */
    all: {},
    /**
     * Lire un bar (GET) : http://localhost:3001/bars/:id
     */
    one: {},
    /**
     * Ajouter un bar (POST) : http://localhost:3001/bars
     * @param name
     * @param adresse
     * @param tel
     * @param email
     * @param description
     */
    post: {
      name: "Le Saint Bar 2",
      adresse: "1, rue des champs, 86000 poitiers",
      tel: "01.02.03.04.05",
      email: "test@test.test",
      description: "Le bar des saint !",
    },
  },
  beers: {
    /**
     * Lister les bieres (GET) : http://localhost:3001/beers/bars/1
     */
    all: {},
    /**
     * Lire une bière GET -> detail d'une biere : http://localhost:3001/beers/3
     */
    one: {},
    post: {
      name: "Paix Dieuv3",
      description: "Bière blonde forte",
      degree: "10.5",
      price: "10",
      id_bar: "1",
    },
    put: {
      name: "Paix Dieu",
      description: "Bière forte",
      degree: "10.5",
      price: 10,
      bars_id: "1",
    },
    /**
     * Supprimer une bière DELETE : http://localhost:3001/beers/1
     */
    delete: {},
  },
  orders: {
    /**
     * Creer une commande (POST) :http://localhost:3001/orders/bars/11
     */
    post: { name: "order test", price: 12, status: "en cours" },
    /**
     * Recupère les commande d'un bar (GET) http://localhost:3001/orders/bars/12
     */
    all: {},
    /**
     * Recupère une commande (GET) http://localhost:3001/orders/2
     */
    one: {},
    /**
     * Modifier une commande (DELETE) http://localhost:3001/orders/1
     *
     */
    delete: {},
    /**
     * Modifier une commande (PUT) http://localhost:3001/orders/2
     */
    put: {
      name: "order test2",
      price: 12,
      status: "en cours",
      date: "2024/04/20",
    },
  },
};
