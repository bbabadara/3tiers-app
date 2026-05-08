# 3tiers-app

Application de gestion de produits avec une architecture **3 tiers** (Frontend React + Backend Node.js/Express + Base de données PostgreSQL), entièrement dockerisée.

## 🏗️ Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│    Database  │
│    React     │     │  Express.js  │     │  PostgreSQL  │
│   Port 3000  │     │   Port 5000  │     │   Port 5432  │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 🛠️ Stack Technique

| Composant  | Technologie                     |
| ---------- | ------------------------------- |
| Frontend   | React 18, Axios                 |
| Backend    | Node.js, Express, Sequelize     |
| Database   | PostgreSQL 15                   |
| ORM        | Sequelize                       |
| Conteneur  | Docker + Docker Compose         |
| Proxy      | Nginx                           |

## 📁 Structure du Projet

```
3tiers-app/
├── frontend/             # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/   # Composants React
│   │   ├── services/     # Services API (Axios)
│   │   ├── App.js
│   │   └── App.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/              # API REST Express
│   ├── src/
│   │   ├── config/       # Configuration Sequelize
│   │   ├── controllers/  # Contrôleurs
│   │   ├── middlewares/   # Middlewares (gestion d'erreurs)
│   │   ├── models/       # Modèles Sequelize
│   │   ├── routes/       # Routes API
│   │   ├── services/     # Logique métier
│   │   └── validators/   # Validation des données
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── database/
│   └── init.sql          # Script d'initialisation
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Lancer l'application

```bash
docker compose up --build
```

L'application sera accessible sur :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api
- **Health Check** : http://localhost:5000/api/health

### Arrêter l'application

```bash
docker compose down
```

Pour supprimer également les volumes (données) :

```bash
docker compose down -v
```

## 📡 API REST

### Endpoints Produits

| Méthode | Endpoint                | Description        |
| ------- | ----------------------- | ------------------ |
| `POST`  | `/api/products`         | Créer un produit   |
| `GET`   | `/api/products`         | Lister les produits |
| `GET`   | `/api/products/:id`     | Voir un produit    |
| `PUT`   | `/api/products/:id`     | Modifier un produit |
| `DELETE`| `/api/products/:id`     | Supprimer un produit |

### Exemple de requête

**Créer un produit :**

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Smartphone",
    "description": "Smartphone dernière génération",
    "prix": 699.99,
    "stock": 25
  }'
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Smartphone",
    "description": "Smartphone dernière génération",
    "prix": "699.99",
    "stock": 25,
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🧑‍💻 Développement Local

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🐳 Docker Hub

### Construire et pousser les images

```bash
# Backend
docker build -t <username>/3tiers-app-backend:latest ./backend
docker tag <username>/3tiers-app-backend:latest <username>/3tiers-app-backend:1.0.0
docker push <username>/3tiers-app-backend:latest
docker push <username>/3tiers-app-backend:1.0.0

# Frontend
docker build -t <username>/3tiers-app-frontend:latest ./frontend
docker tag <username>/3tiers-app-frontend:latest <username>/3tiers-app-frontend:1.0.0
docker push <username>/3tiers-app-frontend:latest
docker push <username>/3tiers-app-frontend:1.0.0
```

### Utiliser les images depuis Docker Hub

Modifiez le `docker-compose.yml` pour utiliser les images publiées :

```yaml
services:
  backend:
    image: <username>/3tiers-app-backend:latest
    # build: ./backend  ← commenter cette ligne
```

## 🌿 Workflow Git

### Branches

- `main` — Branche protégée, production
- `feature/create-product` — CRUD création
- `feature/read-product` — CRUD lecture
- `feature/update-product` — CRUD modification
- `feature/delete-product` — CRUD suppression

### Règles

- 🚫 Interdiction de push direct sur `main`
- ✅ Une fonctionnalité = une branche
- 🔀 Merge via Pull Request uniquement
- 📝 Conventional Commits obligatoires

### Commandes Git

```bash
# Créer une branche feature
git checkout -b feature/create-product

# Travailler et commiter
git add .
git commit -m "feat(product): add create endpoint with validation"
git commit -m "test(product): add create endpoint tests"

# Pousser et créer la Pull Request
git push origin feature/create-product
# Créer la PR sur GitHub puis merger

# Rebaser sur main après merge
git checkout main
git pull origin main
```

### Conventional Commits

| Type     | Utilisation                  |
| -------- | ---------------------------- |
| `feat:`  | Nouvelle fonctionnalité      |
| `fix:`   | Correction de bug            |
| `docs:`  | Documentation                |
| `style:` | Formatage, style             |
| `refactor:` | Refactoring              |
| `test:`  | Tests                        |
| `chore:` | Maintenance                  |

**Exemples :**

```
feat(product): add create endpoint with validation
feat(product): add update service and controller
fix(api): handle validation errors gracefully
test(product): add integration tests for CRUD
docs(readme): add Docker Hub instructions
```

## 🔒 Bonnes Pratiques

- ✅ Architecture MVC (Model-View-Controller)
- ✅ Séparation des responsabilités (services, controllers, routes)
- ✅ Validation des données côté backend
- ✅ Gestion centralisée des erreurs
- ✅ Variables d'environnement (fichier `.env`)
- ✅ Sécurité : pas de secrets dans le code
- ✅ Conteneurisation complète
- ✅ Code propre et commenté (utile)

## 📄 License

MIT
