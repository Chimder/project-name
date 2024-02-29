FROM node:21-alpine3.18
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install prisma
RUN npm run build
RUN rm -rf ./src

CMD ["npm", "run", "start:prod"]