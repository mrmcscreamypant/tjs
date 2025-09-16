FROM node:alpine AS static-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable AS final
WORKDIR /app
COPY --from=static-build /app/dist /usr/share/nginx/html
#COPY nginx.cfg .
#CMD [ "nginx" ]