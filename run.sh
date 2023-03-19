#! /bin/bash

NC='\033[0m' # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'

printf "${GREEN}Carregando...\n\n"


docker network create external-network 2>/dev/null

docker-compose -f docker-compose/docker-compose.dev.yml down 2>/dev/null
docker-compose -f docker-compose/docker-compose.stage.yml down 2>/dev/null
docker-compose -f docker-compose/docker-compose.prod.yml down 2>/dev/null


printf "${BLUE}Gostaria de subir a aplicação em qual ambiente?\n\n"
printf "${BLUE}Ambientes disponíveis:\n"
printf "${YELLOW}[1]${BLUE} - Local (default)\n"
printf "${YELLOW}[2]${BLUE} - Desenvolvimento\n"
printf "${YELLOW}[3]${BLUE} - Stage\n"
printf "${YELLOW}[4]${BLUE} - Produção\n"
printf "${YELLOW}[0]${BLUE} - Sair\n"
printf "\n\n${GREEN}"
read -p "-> Sua Escolha: " CURRENT_ENVIRONMENT

if [[ "${CURRENT_ENVIRONMENT}" == "" ]]; then
    CURRENT_ENVIRONMENT=1
fi

env_local=("1" "local")
env_dev=("2" "dev" "development")
env_stage=("3" "stage" "staging")
env_prod=("4" "prod" "production")
logout=("0" "sair" "bye")

if [[ "${env_local[@]}" =~ "${CURRENT_ENVIRONMENT}" ]]; then
    printf "Subindo ambiente ${BLUE}LOCAL!\n\n${NC}"
    cd services/
    cd database/ && docker-compose --env-file .env.dev up -d && cd ../
    cd kafka/ && docker-compose up -d && cd ../
    cd logger-microsservice/ && npm i --silent --no-progress && npm start &
    cd logger-api/ && npm i --silent --no-progress && npm start &
    cd users-api/ && npm i --silent --no-progress && npm start &
    cd frontend && npm i --silent --no-progress && npm start &
    cd ../
    wait
elif [[ "${env_dev[@]}" =~ "${CURRENT_ENVIRONMENT}" ]]; then
    printf "Subindo ambiente de ${BLUE}DESENVOLVIMENTO!\n\n${NC}"
    docker-compose -f docker-compose/docker-compose.dev.yml up --build -d

elif [[ "${env_stage[@]}" =~ "${CURRENT_ENVIRONMENT}" ]]; then
    printf "Subindo ambiente de ${BLUE}STAGING!\n\n${NC}"
    docker-compose -f docker-compose/docker-compose.stage.yml up --build -d

elif [[ "${env_prod[@]}" =~ "${CURRENT_ENVIRONMENT}" ]]; then
    printf "Subindo ambiente de ${BLUE}PRODUÇÃO!\n\n${NC}"
    docker-compose -f docker-compose/docker-compose.prod.yml up --build -d

elif [[ "${logout[@]}" =~ "${CURRENT_ENVIRONMENT}" ]]; then
    printf "\n${BLUE}Até mais!\n\n${NC}"
    exit 0
fi
