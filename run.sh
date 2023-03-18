#! /bin/bash

cd services/

cd database/
docker-compose up -d
cd ../

cd frontend
npm start &
cd ../

cd users-api/
npm start &
cd ../../

wait