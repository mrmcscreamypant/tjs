FROM node:latest AS static-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest AS final
WORKDIR /app
COPY --from=static-build /app/dist .
COPY ./nginx.cfg .
CMD [ "nginx -c ./nginx.cfg" ]