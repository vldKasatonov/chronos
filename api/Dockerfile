FROM node:26.13.0-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:26.13.0-slim AS runner
WORKDIR /app
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["npm", "start"]