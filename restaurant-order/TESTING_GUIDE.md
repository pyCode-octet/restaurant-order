# Guide de Test Manuel (Pas à Pas)

Ce guide t'explique comment tester chaque fonctionnalité de ton backend manuellement, sans code, en utilisant **Swagger UI** (l'interface visuelle incluse dans ton projet).

## 🚀 Étape 0 : Lancer le Projet

Si ce n'est pas déjà fait :

1. Ouvre ton terminal.
2. Va dans le dossier : `cd restaurant-order`
3. Lance le serveur : `npm run dev`
4. Vérifie que tu vois : `Server running on port 3000` et `MongoDB connected successfully`.

## 🌐 Étape 1 : Ouvrir l'Interface de Test

Ouvre ton navigateur (Chrome, Firefox, etc.) et va à l'adresse suivante :
👉 **http://localhost:3000/api-docs**

Tu devrais voir une page bleue avec la liste de toutes tes routes (`/auth`, `/menu`, `/orders`).

---

## 🧪 Étape 2 : Tester l'Authentification

### 1. Créer un Admin

1. Clique sur **Authentication** > `POST /auth/register`.
2. Clique sur le bouton **Try it out** (à droite).
3. Dans le cadre **Request body**, colle ceci :
   ```json
   {
     "name": "Super Admin",
     "email": "admin@test.com",
     "password": "password123",
     "role": "admin"
   }
   ```
4. Clique sur le gros bouton bleu **Execute**.
5. Regarde la réponse en dessous (Server response). Tu devrais avoir un code **201** et un message "User registered successfully".

### 2. Se connecter en Admin et récupérer le Token

1. Va sur `POST /auth/login`.
2. Clique sur **Try it out**.
3. Mets les identifiants de l'admin :
   ```json
   {
     "email": "admin@test.com",
     "password": "password123"
   }
   ```
4. Clique sur **Execute**.
5. Copie le **token** qui s'affiche dans la réponse (la longue chaîne de caractères entre guillemets après `"token":`).

### 🔑 Étape Clé : S'authentifier dans Swagger

1. Remonte tout en haut de la page.
2. Clique sur le bouton vert **Authorize**.
3. Dans le champ, écris : `Bearer TON_TOKEN_COPIÉ_ICI` (n'oublie pas le mot "Bearer " avec un espace avant le token).
4. Clique sur **Authorize** puis **Close**.
   Maintenant, Swagger sait que tu es l'Admin !

---

## 🍔 Étape 3 : Gérer le Menu (En tant qu'Admin)

### 1. Ajouter un Plat

1. Va sur **Menu** > `POST /api/menu`.
2. Clique sur **Try it out**.
3. Colle ceci :
   ```json
   {
     "title": "Burger Maison",
     "description": "Un burger délicieux avec frites",
     "price": 15,
     "category": "main",
     "available": true
   }
   ```
4. **Execute**. Vérifie que tu as un code **201**.
5. Copie l'**ID** du plat créé (c'est le champ `_id` dans la réponse), tu en auras besoin.

---

## 🛒 Étape 4 : Passer une Commande (En tant que Client)

⚠️ _Attention : Pour faire ça proprement, tu devrais créer un compte "Client" et te reconnecter avec son token. Mais pour aller vite, on va utiliser le compte Admin qui a aussi le droit de commander._

1. Va sur **Orders** > `POST /api/orders`.
2. **Try it out**.
3. Remplace `menuItemId` par l'ID que tu as copié à l'étape d'avant :
   ```json
   {
     "items": [
       {
         "menuItemId": "COLLE_L_ID_ICI",
         "quantity": 2
       }
     ]
   }
   ```
4. **Execute**. Tu devrais recevoir ta commande créée avec le statut `pending`.
5. Copie l'**ID de la commande** (`_id`).

---

## 👨‍🍳 Étape 5 : Mettre à jour la Commande (En tant qu'Admin)

1. Va sur **Orders** > `PATCH /api/orders/{id}/status`.
2. **Try it out**.
3. Dans le champ `id`, colle l'ID de la commande.
4. Dans le body, change le statut :
   ```json
   {
     "status": "preparing"
   }
   ```
5. **Execute**. Le statut doit passer à `preparing`.

---

🎉 **Félicitations !** Si tu as réussi toutes ces étapes, tu as validé manuellement tout le cycle de vie de ton application.
