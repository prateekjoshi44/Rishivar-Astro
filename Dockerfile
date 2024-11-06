# build env
FROM node:20.11.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.6.0
RUN npm install
COPY . ./

RUN npm run build

# production env
FROM nginx:stable-alpine
WORKDIR /app
COPY --from=build /app/dist ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
