FROM node:21-alpine3.18 as build
WORKDIR /app
ADD *.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:21-alpine3.18
WORKDIR /app
COPY --from=build /app/dist ./dist
ADD *.json .
RUN npm ci --only=production
EXPOSE 4000
CMD [ "npm", "run", "start:dev" ]