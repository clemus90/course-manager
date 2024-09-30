# Course Manager

## Local development

## Approach 1: 3 containers: BE/FE/DB

### Prerequisites
You need to have `docker` installed

### Process
From the root folder run `docker-compose up`:
- The frontend application is running at `localhost:8081`
- The backend application is running at `localhost:8080`
- The DB receives connections at `localhost:5432`

## Approach2: 1 container: DB, 2 apps running locally

### Prerequisites
You need to have the following software installed:
- JDK 17
- Node 20
- Docker

### Process
From the root folder start by booting up the db
- `docker-compose up db`

In another terminal start the backend service
- cd into `backend`
- run `./gradlew bootRun`

In another terminal start the frontend service 
- cd into `frontend`
- run `npm run dev`
