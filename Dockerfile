# =============================================
# Dockerfile - Pokeneas
# =============================================
# Imagen base: Node 18 LTS sobre Alpine (imagen mínima y segura)
FROM node:18-alpine

# Metadatos de la imagen
LABEL maintainer="Pokeneas Team"
LABEL description="Pokédex de Pokeneas - personajes de Antioquia"
LABEL version="1.0.0"

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# ─── Copiar solo los archivos de dependencias primero ───────────────────────
# Esto aprovecha el cache de Docker: si package.json no cambia,
# no se reinstalan los módulos en cada build.
COPY package*.json ./

# Instalar SOLO dependencias de producción (sin devDependencies)
# --omit=dev evita instalar nodemon y otras herramientas de desarrollo
RUN npm install --omit=dev

# ─── Copiar el código fuente ─────────────────────────────────────────────────
# Se copia DESPUÉS de instalar dependencias para aprovechar el cache
COPY src/ ./src/

# ─── Configuración de seguridad ──────────────────────────────────────────────
# Crear usuario no-root para correr la aplicación (buena práctica de seguridad)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# ─── Exposición de puerto ─────────────────────────────────────────────────────
# Documenta que el contenedor escucha en el puerto 3000
EXPOSE 3000

# ─── Variables de entorno por defecto ────────────────────────────────────────
ENV NODE_ENV=production
ENV PORT=3000

# ─── Comando de inicio ────────────────────────────────────────────────────────
# CMD ejecuta la aplicación en modo producción (sin nodemon)
CMD ["node", "src/app.js"]
