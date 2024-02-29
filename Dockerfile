FROM node:21-alpine3.18
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g @prisma/cli
RUN npm run build
RUN rm -rf ./src
EXPOSE 8000

CMD ["npm", "run", "start:prod"]