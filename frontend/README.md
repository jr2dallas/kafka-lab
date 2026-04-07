# Kafka Lab Frontend

Frontend React + Vite

Cette application fournit l’interface utilisateur du labo Kafka : pilotage du producteur, contrôle du consommateur et visualisation du lag en temps réel.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- OpenAPI-generated client
- Nginx (runtime Docker)

## Prérequis

Pour le développement local :

- Node.js 20.19+ recommandé
- npm
- le backend Kafka Lab lancé sur `http://localhost:8080`

Pour l’exécution conteneurisée :

- Docker
- Docker Compose

## Quick start

### Développement local

Installer les dépendances :

```bash
npm install
```

Lancer le frontend :

```bash
npm run dev
```

L’application est disponible sur :

```bash
http://localhost:5173
```

En local, le serveur Vite proxyfie les requêtes `/api` vers le backend sur :

```bash
http://localhost:8080
```

Permet de développer le frontend sans configuration CORS spécifique côté navigateur.

### Build local

Créer le build de production :

```bash
npm run build
```

Les fichiers statiques générés sont écrits dans :

```bash
dist/
```

## Client API OpenAPI

Le frontend génère son client TypeScript à partir du contrat OpenAPI du backend situé ici :

```bash
../backend/src/main/resources/api.yaml
```

Pour régénérer manuellement le client :

```bash
npm run generate:api:from-backend
```

Cette génération est aussi exécutée automatiquement avant le build via le script `prebuild`, afin de garder le client frontend aligné avec le contrat backend.

## Docker

Le frontend est construit avec un Dockerfile **multi-stage** :

- un stage `Node` installe les dépendances, génère le client API depuis le contrat OpenAPI, puis lance le build Vite
- un stage final `Nginx` sert uniquement les assets statiques générés. Cela évite d’embarquer Node, npm et les outils de build dans l’image finale, ce qui la rend plus légère

L’objectif principal de cette approche est de permettre un simple :

```bash
docker compose build
docker compose up
```

sans devoir régénérer manuellement le client API avant le build Docker

Une fois lancé avec Docker Compose, le frontend est servi par Nginx sur :

```bash
http://localhost
```

et les requêtes `/api` sont reverse-proxyfiées vers le backend via `nginx.conf`

## Scripts utiles

```bash
npm run dev
npm run build
npm run preview
npm run generate:api:from-backend
```

## Notes

- Le mode local utilise le serveur Vite sur le port `5173`.
- Le mode Docker sert l’application buildée via Nginx sur le port `80`.