#! /bin/bash

cd services/

cd database/
docker-compose --env-file .env.dev up -d
cd ../

cd kafka/
docker-compose up -d
cd ../

cd logger-microsservice/
npm start &
cd ../

cd logger-api/
npm start &
cd ../

cd users-api/
npm start &
cd ../

cd frontend
npm start &
cd ../../

wait