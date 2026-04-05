# i ran node --version to know i am on which one, the alpine tag is a lightweight linux version 
FROM node:24.13.1-alpine3.23 AS builder
# creates /app inside the container, now it is the curr working dir
WORKDIR /app
# copies package and package-lock from local to /app
# copying package files before source code allows for caching dep
COPY package*.json ./
# npm ci (clean install) is faster and stricter than npm install
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

# cmd is the command that runs on container start
# -g daemon off -> runs in foreground -> container needs a process to stay alive
