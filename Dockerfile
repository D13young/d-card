FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm ci && npx prisma generate && npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/prisma/data/card.db"
RUN mkdir -p /app/prisma/data
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/schema.gql ./src/schema.gql
EXPOSE 3000
CMD ["node", "dist/main.js"]
