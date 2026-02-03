# 🍽️ Restaurant Order - API Backend

Une API RESTful pour gérer les commandes de restaurant, construite avec **Node.js** et **Express**, avec authentification JWT et base de données MongoDB.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Documentation API](#-documentation-api)
- [Architecture](#-architecture)
- [Dépendances](#-dépendances)
- [License](#-license)

## ✨ Fonctionnalités

- 🔐 **Authentification JWT** : Inscription et connexion sécurisée
- 👥 **Gestion des rôles** : Admin et Customer
- 🍽️ **Gestion du menu** : CRUD complet pour les plats (Admin)
- 📦 **Gestion des commandes** : Créer et suivre les commandes
- 📱 **Documentation interactive** : Swagger UI intégrée
- ✅ **Validation des données** : Entrées validées avec Mongoose
- 🔒 **Sécurité** : Hachage des mots de passe avec bcryptjs

## 📦 Prérequis

- **Node.js** >= 14.x
- **npm** ou **yarn**
- **MongoDB** (local ou Atlas)

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/pyCode-octet/restaurant-order.git
   cd restaurant-order
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer un fichier `.env`** à la racine du projet
   ```env
   MONGO_URI=mongodb://localhost:27017/restaurant-order
   JWT_SECRET=votre_secret_jwt_ici
   PORT=3000
   NODE_ENV=development
   ```

## ⚙️ Configuration

### Variables d'environnement (`.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `MONGO_URI` | URL de connexion MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/restaurant-order` |
| `JWT_SECRET` | Clé secrète pour les JWT | `your-secret-key-here` |
| `PORT` | Port du serveur | `3000` |
| `NODE_ENV` | Environnement | `development` ou `production` |

## 💻 Utilisation

### Démarrer le serveur

**Mode développement** (avec hot reload)
```bash
npm run dev
```

**Mode production**
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

### Accéder à la documentation Swagger

Une fois le serveur en cours d'exécution, accédez à :
```
http://localhost:3000/api-docs
```

## 📚 Documentation API

### URL de base
```
http://localhost:3000/api
```

### Authentification
L'API utilise **JSON Web Tokens (JWT)**. Pour les requêtes protégées, ajoutez :
```
Authorization: Bearer <token>
```

### Endpoints principaux

#### 🔐 Authentification (`/auth`)
- `POST /register` - Inscription d'un nouvel utilisateur
- `POST /login` - Connexion

#### 🍽️ Menu (`/menu`)
- `GET /` - Récupérer tous les plats
- `POST /` - Ajouter un plat (Admin)
- `PUT /:id` - Modifier un plat (Admin)
- `DELETE /:id` - Supprimer un plat (Admin)

#### 📦 Commandes (`/orders`)
- `POST /` - Créer une commande
- `GET /me` - Voir mes commandes
- `GET /` - Voir toutes les commandes (Admin)
- `PATCH /:id/status` - Changer le statut (Admin)

Pour la documentation complète, voir [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🏗️ Architecture

```
src/
├── app.js                 # Point d'entrée principal
├── config/
│   ├── database.js       # Configuration MongoDB
│   └── swagger.js        # Configuration Swagger
├── controllers/
│   ├── auth.controllers.js
│   ├── menuController.js
│   ├── orderController.js
│   └── Resto.controllers.js
├── middlewares/
│   └── auth.middleware.js     # Middleware JWT
├── models/
│   ├── MenuItem.js       # Modèle pour les plats
│   ├── Order.js          # Modèle pour les commandes
│   ├── resto.model.js
│   └── user.model.js     # Modèle pour les utilisateurs
└── routes/
    ├── auth.routes.js
    ├── health.routes.js
    ├── menuRoutes.js
    ├── orderRoutes.js
    └── resto.routes.js
```

## 📦 Dépendances

- **express** - Framework web
- **mongoose** - ODM MongoDB
- **jsonwebtoken** - Authentification JWT
- **bcryptjs** - Hachage des mots de passe
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Gestion des variables d'environnement
- **swagger-ui-express** - Documentation interactive
- **nodemon** (dev) - Hot reload en développement

## 🧪 Tests

Pour tester l'API, utilisez :
- Postman
- Insomnia
- cURL
- Swagger UI intégré (`http://localhost:3000/api-docs`)

Voir [TESTING_GUIDE.md](TESTING_GUIDE.md) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos modifications (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Support

Pour toute question ou problème, ouvrez une issue sur [GitHub Issues](https://github.com/pyCode-octet/restaurant-order/issues)

---

**Créé avec ❤️ par [pyCode-octet](https://github.com/pyCode-octet)**
