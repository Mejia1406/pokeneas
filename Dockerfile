FROM node:18-alpine

LABEL maintainer="Pokeneas Team"
LABEL description="Pokédex de Pokeneas - personajes de Antioquia"
LABEL version="1.0.0"

WORKDIR /app

COPY package*.json ./
COPY src/ ./src/

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "src/app.js"]
