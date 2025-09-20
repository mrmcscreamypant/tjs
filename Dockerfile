FROM node:alpine AS frontend
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine AS backend
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY src/server .
RUN npm run build

FROM nginx:stable AS final
WORKDIR /app
RUN apt update
RUN apt install nodejs -y
COPY --from=frontend /app/dist /app/www
COPY --from=backend /app/build .
COPY --from=backend /app/node_modules node_modules
COPY --from=backend /app/.env.production .
COPY backend.sh .
COPY ./nginx.cfg .
COPY ./mime.types .
CMD [ "/bin/sh", "./backend.sh" ]