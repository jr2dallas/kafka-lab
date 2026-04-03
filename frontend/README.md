# Kafka Lab Frontend

Frontend React + Vite pour piloter et visualiser un labo Kafka.

## Démarrage

```bash
npm install
npm run dev
```

Le front proxyfie `/api` vers `http://localhost:8080`.

## Contrat OpenAPI backend

Le projet est prévu pour lire le contrat depuis :

```bash
../backend/src/main/resources/api.yml
```

Puis générer le client TypeScript Axios :

```bash
npm run generate:api:from-backend
```
