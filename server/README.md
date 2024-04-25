## Presentation du projet bar 

##### Description du projet
Création d'une API + client React pour un site de bars qui permet de gérer les bars, les biere et les commandes des clients.
Il permet aussi de faire des recherche avancées sur les biere et les commandes.

##### Description de l'API
Au niveau du serveur, ont a mis en place plusieurs tables (models):

- **Bars**
  - id : integer
  - name : string, unique
  - adresse: string
  - tel: string
  - email: string
  - description: text
  

- **Beers**
  - name: string
  - description: text
  - degree : float
  - prix: float, min(0)
  - bar_id: integer

- **BeerOrders (table de liaison)**
  - beer_id:
  - order_id:

- **Orders**
  - name: string
  - prix: float, min(0)
  - bar_id: integer
  - date: date
  - status : string (en cours, terminée)

- **Members**
  - email: string
  - password: float, min(0)
  - role enum ("user", "admin")

##### Liste des endpoints
Voici la listes de touts les endpoints de l'API:

**Bars** :
- POST /bars => Ajouter un bars
- PUT /bars/:id_bar => Modifier un bars
- DELETE /bars/:id_bar => Supprimer un bars
- GET /bars => Liste des bars
- GET /bars/:id_bar/commandes?date=2021-01-01 => Liste des commandes d'un bars à une date donnée
- GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bars avec un prix compris entre 10 et 20
- GET /bars?ville=Paris => Liste des bars d'une ville donnée
- GET /bars?name=example => Liste des bars dont le nom contient "example"
- GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bars

**Beers** :
- POST /bars/:id_bar/biere => Ajouter un plat à un bars
- PUT /biere/:id_biere => Modifier un plat
- DELETE /biere/:id_biere => Supprimer un plat d'un bars
- GET /bars/:id_bar/biere => Liste des biere d'un bars
- GET /biere/:id_biere => Détail d'un plat

**Orders** :
- POST /bars/:id_bar/commandes => Ajouter une commande à un bars
- PUT /commandes/:id_commande => Modifier une commande d'un bars
- DELETE /commandes/:id_commande => Supprimer une commande d'un bars
- GET /bars/:id_bar/commandes => Liste des commandes d'un bars
- GET /commandes/:id => Détail d'une commande d'un bars

**BeerOrders** :
- POST /commandes/:id/biere/:id => Ajouter un plat à une commande
- DELETE /commandes/:id/biere/:id => Supprimer un plat d'une commande

**Members** :
- POST /members/signin => Se connecter a l'application
- POST /members/signup => Créer un compte utilisateur
- GET /members/access => Recupere l'access token
- DELETE /members => Supprimer l'utilisateur

##### Lancer le projet
Pour lancer le projet, dans un premier temps, il faut installer les dependences du back en faisant ces instructions: 
```bash
  # Acceder au dossier du serveur
  cd server

  # Installer avec yarn ou npm les dependences
  yarn || npm install

  # Lancer le serveur 
  yarn dev

  # Ou lancer les tests
  yarn test le_nom_du_fichier_test -t "le nom du test"
```

Pour lancer le projet coté client, on va suivre un procédés similaire : 
```bash
  # Acceder au dossier du serveur
  cd client

  # Installer avec yarn ou npm les dependences
  yarn || npm install

  # Lancer le serveur 
  yarn dev
```