# SMART INVOICES PAYMENT TRACKING API

API backend sécurisée pour la gestion des factures fournisseurs.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![JWT](https://img.shields.io/badge/Mongoose-000000?style=flat&logo=mongoose&logoColor=white)

---

## Contexte

Dans le quotidien des entreprises et des freelances, la gestion des factures fournisseurs devient rapidement complexe. Cette API permet de :

- Gérer une liste de fournisseurs
- Enregistrer et suivre les factures reçues
- Effectuer des paiements partiels ou complets
- Suivre l'état des factures automatiquement
- Analyser les dépenses par fournisseur

---

## Stack technique

| Technologie         | Usage                      |
| ------------------- | -------------------------- |
| Node.js + Express 5 | Serveur HTTP + routing     |
| MongoDB + Mongoose  | Base de données + ODM      |
| JWT                 | Authentification stateless |
| bcrypt              | Hachage des mots de passe  |
| Express Validator   | Validation des entrées     |
| Swagger JSDoc       | Documentation API          |

---

## Rôles

| Rôle       | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| **Client** | Entreprise ou freelance. Accède uniquement à ses propres données. |
| **Admin**  | Administrateur. Peut consulter les données de tous les clients.   |

---

## Endpoints

### Authentification

| Méthode | Route                | Description                           |
| ------- | -------------------- | ------------------------------------- |
| POST    | `/api/auth/register` | Inscription d'un nouveau client       |
| POST    | `/api/auth/login`    | Connexion et obtention d'un token JWT |
| GET     | `/api/auth/me`       | Récupération du profil authentifié    |

### Fournisseurs

| Méthode | Route                | Description                         |
| ------- | -------------------- | ----------------------------------- |
| POST    | `/api/suppliers`     | Créer un fournisseur                |
| GET     | `/api/suppliers`     | Lister tous ses fournisseurs        |
| GET     | `/api/suppliers/:id` | Consulter un fournisseur spécifique |
| PUT     | `/api/suppliers/:id` | Modifier un fournisseur             |
| DELETE  | `/api/suppliers/:id` | Supprimer un fournisseur            |

### Factures

| Méthode | Route               | Description                           |
| ------- | ------------------- | ------------------------------------- |
| POST    | `/api/invoices`     | Créer une facture                     |
| GET     | `/api/invoices`     | Lister toutes ses factures            |
| GET     | `/api/invoices/:id` | Consulter une facture spécifique      |
| PUT     | `/api/invoices/:id` | Modifier (si non totalement payée)    |
| DELETE  | `/api/invoices/:id` | Supprimer (si aucun paiement associé) |

### Paiements

| Méthode | Route                        | Description                        |
| ------- | ---------------------------- | ---------------------------------- |
| POST    | `/api/invoices/:id/payments` | Enregistrer un paiement            |
| GET     | `/api/invoices/:id/payments` | Lister les paiements d'une facture |

### Stats & Dashboard

| Méthode | Route                      | Description                   |
| ------- | -------------------------- | ----------------------------- |
| GET     | `/api/suppliers/:id/stats` | Statistiques d'un fournisseur |

## Statuts de facture

| Statut           | Condition                                       |
| ---------------- | ----------------------------------------------- |
| `unpaid`         | Aucun paiement enregistré                       |
| `partially_paid` | Paiement partiel reçu (total < montant facture) |
| `paid`           | Total des paiements = montant de la facture     |

---

## Installation

```bash
git clone https://github.com/alione10-lm/smart_invoices-payment_tracking
cd smart_invoices-payment_tracking
npm install
cp .env.example .env
npm run dev
```

### Variables d'environnement

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/invoice_db
JWT_SECRET=your_jwt_secret
```

---

## Structure du projet

```

├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── supplier.controller.js
│   ├── invoice.controller.js
│   ├── payemnt.controller.js
│   └── admin.controller.js
├── middleware/
│   ├── authMiddleware.js
│   ├── ownership.middleware.js
│   └── paymentMiddleware.middleware.js
│   └── paymentMiddleware.middleware.js
│   └── role.middleware.js
│   └── userValidator.middleware.js
│   └── validateInvoice.middleware.js
│   └── validateSupplier.middleware.js
├── models/
│   ├── User.model.js
│   ├── Supplier.model.js
│   ├── Invoice.model.js
│   └── Payment.model.js
├── routes/
│   ├── auth.routes.js
│   ├── supplier.routes.js
│   ├── invoice.routes.js
│   └── admin.routes.js
├── services/
│   ├── auth.service.js
│   ├── invoice.service.js
│   └── payment.routes.js
│   └── supplier.routes.js
├── utils/
│   └── generateToken.js
└── server.js
└── .env
```

---

## Sécurité

- Mots de passe hachés avec **bcrypt**
- Tokens JWT stockés en **HTTP-only cookies**
- Middleware d'authentification sur toutes les routes protégées
- Middleware de rôle `admin` pour les routes admin
- Isolation des données par `client` ObjectId sur chaque query

---

## Critères de performance

- [x] Middlewares Express.js (auth, role)
- [x] Validation des entrées avec Express Validator
- [x] Sécurisation des mots de passe avec bcrypt
- [x] Authentification JWT
- [x] Relations entre collections MongoDB/Mongoose
- [x] Contrôle d'accès par rôle et ownership des ressources
