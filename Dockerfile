FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000
CMD [  "npm", "run", "start:prod" ]

# FROM node:18-alpine As development
# WORKDIR /usr/src/app
# COPY --chown=node:node package*.json ./
# RUN npm install
# COPY --chown=node:node . .
# USER node

# FROM node:18-alpine As build
# WORKDIR /usr/src/app
# COPY --chown=node:node package*.json ./
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node . .
# RUN npm run build
# ENV NODE_ENV production
# RUN npm install --only=production && npm cache clean --force
# USER node

# FROM node:18-alpine As production
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# EXPOSE 4000
# CMD [ "npm","run", "start" ]

# FROM node:21-alpine3.18 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --only=production
# COPY . .
# RUN npm run build
# # RUN npx prisma generate

# FROM node:21-alpine3.18
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production
# RUN npm install -g prisma
# EXPOSE 4000
# CMD [ "npm","run", "start:prod" ]
