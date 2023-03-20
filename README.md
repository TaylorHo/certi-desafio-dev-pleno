<div align="center"><img src="./.github/images/logo.svg" alt="Logo do Projeto" width="400"/></div>
&nbsp;
<h1 align="center">Desafio CERTI - Dev Pleno</h1>

> Projeto criado para o desafio de dev pleno da CERTI.
> Este projeto é um CRUD de usuários, com backend em NestJS, Frontend em Angular, Kafka para messageria, mondoDB como Banco de Dados e JWT como estratégia de autenticação e segurança.


## 🚀 Rodando o projeto

Para rodar o projeto, basta executar o arquivo `run.sh` no terminal.
Este executável de CLI vai guiar o processo de escolha de ambiente da aplicação.

- URL do Front em ambiente local: [http://localhost:4200](http://localhost:4200)
- URL do Front em container: [http://localhost:80](http://localhost:80)

## 🌳 Ambientes

Este projeto está configurado para rodar nos seguintes ambientes:

- Localmente em desenvolvimento (fora de containers)
- Ambiente de desenvolvimento em containers
- Ambiente de staging
- Ambiente de produção


## 📂 Estrutura do projeto

Dentro da pasta `services` estão todas as "partes" deste projeto, que são:

- `database`
  - Banco de dados mongoDB, separado por ambientes e configurado para carregar dados iniciais.
- `frontend`
  - Aplicação em Angular 15, com front do CRUD de usuários, páginas de autenticação e visualização de logs.
- `kafka`
  - Docker compose do ambiente Kafka + Zookeeper, para desenvolvimento local
- `load-balancer`
  - Load Balancer criado com NGINX, utilizado nos ambientes em container
- `logger-api`
  - API com os endpoints para criação e listagem de logs
- `logger-microsservice`
  - Microsserviço para efetivar a criação de logs baseados nas mensagens do Kafka
- `users-api`
  - API com CRUD de usuários e autenticação, com endpoints protegidos por Token JWT.

Já a pasta `docker-compose` conta com os arquivos `docker-compose.yml` responsáveis por subir os diferentes ambientes.

## ℹ️ Informações Gerais

- Frontend criado em Angular 15
- Backend criado em NestJS
- Serviço de messageria com Kafka para a criação de logs
- Documentação da API de usuários acessível em http://localhost:3000/users-api/api/v1
- Documentação da API de logs acessível em http://localhost:3000/logger-api/api/v1
- Biblioteca de estilos Material Design
- Sass como template engine de CSS
- Autenticação com JWT
- Banco de dados NoSql com mongoDB
- Messageria com Kafka para gerenciamento de usuários em forma de fila
- Ambientes de desenvolvimento, desenvolvimento em container, staging e produção
- Load Balancing com NGINX (em container)


## 🛡️ Segurança

> Atualmente, todos os serviços de dentro da pasta `services` contam com um total de 0 vulnerabilidades!
> Regras de negócio de segurança estão aplicadas e explícitas na mensagem de boas vindas da aplicação.


## 🧪 Melhorias futuras

- Ampliação dos Testes
- Implementação de Websockets para atualizações em tempo real
- Ampliar documentação das páginas do front

---

Até mais! 👋