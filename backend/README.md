# Kafka Lab Backend

Backend Spring Boot du projet **Kafka Lab**.

Il expose l’API REST utilisée par le frontend pour piloter le producteur, contrôler le consommateur et récupérer l’état global du labo Kafka.

## Stack

- Java 21
- Spring Boot 3
- Spring Kafka
- Spring Web
- Spring Validation
- Spring Actuator
- Springdoc / OpenAPI

## Prérequis

Pour le développement local :

- Java 21
- Maven
- Kafka disponible sur `localhost:9092`

Pour l’exécution avec Docker :

- Docker
- Docker Compose

## Quick start

### Développement local

Depuis le dossier `backend/` :

```bash
mvn spring-boot:run
```

Le backend démarre sur :

```bash
http://localhost:8080
```

Par défaut, la configuration locale utilise :

- `spring.kafka.bootstrap-servers=localhost:9092`
- `app.kafka.topic=kafka-lab-topic`
- `spring.kafka.consumer.group-id=kafka-lab-group`

### Build JAR

```bash
mvn clean package -DskipTests
```

Le JAR est généré dans `target/`

## Docker

Le backend utilise un Dockerfile **multi-stage** :

- un stage `Maven + Java 21` compile l’application et construit le JAR ;
- un stage final `JRE 21 Alpine` exécute uniquement le JAR, sans embarquer Maven ni les sources.

Avec Docker Compose, le backend :

- est exposé sur `http://localhost:8080`
- se connecte à Kafka via `kafka:9093` sur le réseau Docker 

## API

Le backend expose les endpoints suivants :

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/status` | Retourne l’état agrégé du dashboard |
| POST | `/api/producer/generations` | Ajoute des messages à produire |
| GET | `/api/producer/status` | Retourne l’état du producteur |
| POST | `/api/consumer/pause` | Met le consommateur en pause |
| POST | `/api/consumer/resume` | Relance le consommateur |
| GET | `/api/consumer/status` | Retourne l’état du consommateur |

## OpenAPI

Le contrat API source est défini dans :

```bash
src/main/resources/api.yaml
```

Le projet utilise `openapi-generator-maven-plugin` pour générer les interfaces et modèles Spring à partir de ce contrat pendant le build Maven.