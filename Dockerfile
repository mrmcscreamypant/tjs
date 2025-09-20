FROM node:alpine AS frontend
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine AS backend
WORKDIR /app
COPY src/server .
RUN ./.env.production
RUN npm ci
RUN npm build

FROM nginx:stable AS final
WORKDIR /app
COPY --from=frontend /app/dist /usr/share/nginx/html
COPY --from=backend /app/build .
CMD [ "node index.js" ]