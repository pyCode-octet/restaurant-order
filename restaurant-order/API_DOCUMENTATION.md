# Documentation de l'API Backend - Restaurant Order

Cette documentation est destinée à l'équipe Frontend pour l'intégration avec le Backend.

## 🌐 URL de Base

`http://localhost:3000/api`

## 🔐 Authentification

L'API utilise des **JSON Web Tokens (JWT)**.
Pour les requêtes protégées, ajoutez le token dans le header `Authorization`.
**Format :** `Bearer <votre_token>`

## 📚 Endpoints

### 1. Authentification (`/auth`)

| Méthode  | Endpoint    | Description                         | Accès  | Corps de la requête (Body)                                                                               |
| :------- | :---------- | :---------------------------------- | :----- | :------------------------------------------------------------------------------------------------------- |
| **POST** | `/register` | Inscription d'un nouvel utilisateur | Public | `{ "name": "...", "email": "...", "password": "...", "role": "customer" }` (Role: `customer` ou `admin`) |
| **POST** | `/login`    | Connexion                           | Public | `{ "email": "...", "password": "..." }`                                                                  |

---

### 2. Menu (`/menu`)

| Méthode    | Endpoint | Description              | Accès     | Paramètres / Body                                                                                |
| :--------- | :------- | :----------------------- | :-------- | :----------------------------------------------------------------------------------------------- |
| **GET**    | `/`      | Récupérer tous les plats | Public    | Aucun                                                                                            |
| **POST**   | `/`      | Ajouter un plat          | **Admin** | `{ "title": "...", "description": "...", "price": 12.5, "category": "main", "available": true }` |
| **PUT**    | `/:id`   | Modifier un plat         | **Admin** | Champs à modifier (ex: `{ "price": 14.0 }`)                                                      |
| **DELETE** | `/:id`   | Supprimer un plat        | **Admin** | Aucun                                                                                            |

**Catégories valides :** `starter`, `main`, `dessert`, `drink`

---

### 3. Commandes (`/orders`)

| Méthode   | Endpoint      | Description               | Accès        | Paramètres / Body                                             |
| :-------- | :------------ | :------------------------ | :----------- | :------------------------------------------------------------ |
| **POST**  | `/`           | Créer une commande        | **Customer** | `{ "items": [ { "menuItemId": "ID_PLAT", "quantity": 2 } ] }` |
| **GET**   | `/me`         | Voir mes commandes        | **Customer** | Aucun                                                         |
| **GET**   | `/`           | Voir toutes les commandes | **Admin**    | Aucun                                                         |
| **PATCH** | `/:id/status` | Changer le statut         | **Admin**    | `{ "status": "preparing" }`                                   |

**Statuts valides :** `pending`, `preparing`, `ready`, `delivered`

---

## 🛑 Codes d'Erreur Courants

- **200/201** : Succès
- **400** : Données invalides (ex: mot de passe manquant, catégorie inconnue)
- **401** : Non autorisé (Token manquant ou invalide)
- **403** : Interdit (Ex: un client essaie de supprimer un plat)
- **404** : Ressource non trouvée (Plat ou Commande inexistante)
- **500** : Erreur Serveur

---

## 🛠 Outil de Test Intégré (Swagger)

Une documentation interactive est disponible directement sur le navigateur une fois le serveur lancé :
👉 **http://localhost:3000/api-docs**
