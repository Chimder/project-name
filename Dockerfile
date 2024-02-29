FROM node:21-alpine3.18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:21-alpine3.18
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install
RUN npm install -g prisma
CMD [ "npm","run", "start:prod" ]

# FROM node:21-alpine3.18 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
# RUN npx prisma generate

# FROM node:21-alpine3.18
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY package*.json ./
# RUN npm ci --omit=dev
# CMD [ "npm","run", "start:prod" ]

# FROM node:21-alpine3.18 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
# RUN npx prisma generate

# FROM node:21-alpine3.18
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/prisma ./prisma
# CMD [ "npm", "run", "start:prod" ]