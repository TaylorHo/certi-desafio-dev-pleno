FROM node:18-alpine as angular

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent --no-progress

COPY . .

RUN npm run build


#################################################################
################# EXECUTANDO O SERVIDOR WEB #####################
#################################################################

FROM nginx:1.23.3-alpine

VOLUME /var/cache/nginx

COPY --from=angular /app/dist /usr/share/nginx/html

RUN rm /usr/share/nginx/html/50x.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

