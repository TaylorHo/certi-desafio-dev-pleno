#! /bin/bash

cd services/

cd database/
docker-compose --env-file .env.dev up -d
cd ../

cd users-api/
npm start &
cd ../

cd frontend
npm start &
cd ../../

wait