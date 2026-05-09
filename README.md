# Pokeneas de Antioquia

> Pokédex de personajes inspirados en Pokémon, nacidos en las tierras de Antioquia.

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción)
2. [Arquitectura](#arquitectura)
3. [Requisitos](#requisitos)
4. [Instalación Local](#instalación-local)
5. [Variables de Entorno](#variables-de-entorno)
6. [Rutas de la API](#rutas)
7. [Docker – Build y Run](#docker)
8. [DockerHub + GitHub Actions](#github-actions--dockerhub)
9. [Bucket de Google Cloud Storage](#google-cloud-storage)
10. [Despliegue con Docker Swarm en GCP](#docker-swarm-en-gcp)
11. [Verificación y Pantallazos](#verificación)
12. [Troubleshooting](#troubleshooting)

---

## Descripción

**Pokeneas** es una aplicación Express que expone dos rutas:

| Ruta | Descripción |
|------|-------------|
| `GET /pokenea` | Vista HTML con imagen, frase filosófica e ID del contenedor |
| `GET /api/pokenea` | JSON con id, nombre, altura, habilidad e ID del contenedor |

Los Pokeneas son seleccionados **aleatoriamente** de un arreglo local (sin base de datos).  
Las imágenes viven en un **Bucket público de Google Cloud Storage**.

---

## Arquitectura

```
pokeneas/
├── src/
│   ├── config/
│   │   └── env.js              # Carga y exporta variables de entorno
│   ├── controllers/
│   │   └── pokeneaController.js # Maneja req/res, delega al servicio
│   ├── services/
│   │   └── pokeneaService.js   # Lógica de negocio
│   ├── routes/
│   │   └── pokeneaRoutes.js    # Define las rutas y las conecta a controladores
│   ├── data/
│   │   └── pokeneas.js         # Arreglo de los 10 Pokeneas
│   ├── utils/
│   │   ├── random.js           # Selección aleatoria
│   │   └── container.js        # Obtiene el ID del contenedor Docker
│   ├── views/
│   │   └── pokenea.ejs         # Plantilla HTML (EJS)
│   ├── public/                 # Archivos estáticos (CSS, JS, imágenes locales)
│   ├── middlewares/
│   │   ├── errorHandler.js     # 404 + manejo global de errores
│   │   └── requestLogger.js    # Morgan (logging HTTP)
│   └── app.js                  # Punto de entrada: configura Express y arranca
├── .github/
│   └── workflows/
│       └── docker-publish.yml  # CI/CD: build + push a DockerHub
├── .env.example                # Plantilla de variables de entorno
├── .gitignore
├── .dockerignore
├── Dockerfile
└── package.json
```

### ¿Para qué sirve cada carpeta?

| Carpeta | Propósito |
|---------|-----------|
| `config/` | Configuración centralizada (env vars, DB, etc.) |
| `controllers/` | Interactúa con HTTP: recibe req, llama al servicio, envía res |
| `services/` | Lógica de negocio pura, sin conocer Express |
| `routes/` | Mapea URLs + métodos HTTP a controladores |
| `data/` | Fuente de datos local (arreglos, JSON estáticos) |
| `utils/` | Funciones reutilizables sin estado propio |
| `views/` | Plantillas EJS para renderizar HTML |
| `public/` | Archivos servidos directamente al navegador |
| `middlewares/` | Funciones intermedias de Express (logger, errores) |

---

## Requisitos

- Node.js >= 18
- npm >= 9
- Docker >= 24 (para contenedores)
- Cuenta en DockerHub
- Cuenta en Google Cloud Platform

---

## Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/pokeneas.git
cd pokeneas

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env
# Edita .env con tus valores reales

# 4. Correr en modo desarrollo (con nodemon)
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000/pokenea
# http://localhost:3000/api/pokenea
```

---

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno (`development` / `production`) | `development` |
| `GCS_BUCKET_URL` | URL base del bucket de GCS | `https://storage.googleapis.com/pokeneas-bucket` |

---

## Rutas

### `GET /api/pokenea`
Respuesta JSON:
```json
{
  "id": 3,
  "nombre": "Sombrerón",
  "altura": "1.50 m",
  "habilidad": "Sombra Tepeteadora",
  "contenedor": "a3f2b1c4d5e6"
}
```

### `GET /pokenea`
Vista HTML responsive con:
- Imagen del Pokenea (desde GCS)
- Frase filosófica
- ID del contenedor Docker

---

## Docker

### Construir la imagen localmente

```bash
# Construir (reemplaza TU_USUARIO por tu usuario de DockerHub)
docker build -t tu_usuario/pokeneas:latest .

# Verificar que se creó
docker images | grep pokeneas
```

### Correr el contenedor localmente

```bash
docker run -d \
  --name pokeneas \
  -p 3000:3000 \
  -e GCS_BUCKET_URL=https://storage.googleapis.com/TU_BUCKET \
  tu_usuario/pokeneas:latest

# Ver logs
docker logs pokeneas

# Probar
# http://localhost:3000/pokenea
# http://localhost:3000/api/pokenea
```

### Subir a DockerHub

```bash
# Login
docker login

# Push
docker push tu_usuario/pokeneas:latest
```

---

## GitHub Actions + DockerHub

### 1. Crear Access Token en DockerHub
- DockerHub → Account Settings → Security → **New Access Token**
- Nombre: `github-actions-pokeneas`
- Permisos: `Read, Write, Delete`
- Copia el token (solo se muestra una vez)

### 2. Configurar Secrets en GitHub
- GitHub repo → Settings → Secrets and variables → Actions → **New repository secret**

| Secret | Valor |
|--------|-------|
| `DOCKERHUB_USERNAME` | tu usuario de DockerHub |
| `DOCKERHUB_TOKEN` | el token copiado en el paso anterior |

### 3. Cómo funciona el workflow
Cada vez que haces `git push origin main`:
1. GitHub Actions hace checkout del código
2. Hace login en DockerHub con los secrets
3. Construye la imagen con `docker build`
4. La publica con dos tags: `latest` y `sha-XXXXXXX`

---

## Google Cloud Storage

### 1. Crear el Bucket

```bash
# Con gcloud CLI (o desde la consola web de GCP)
gsutil mb -l us-central1 gs://pokeneas-bucket

# Hacer el bucket público para lectura
gsutil iam ch allUsers:objectViewer gs://pokeneas-bucket
```

### 2. Subir las imágenes

```bash
# Subir una imagen
gsutil cp guacaramon.png gs://pokeneas-bucket/guacaramon.png

# Subir todas las imágenes de una vez
gsutil cp *.png gs://pokeneas-bucket/
```

### 3. URLs públicas de las imágenes
Las imágenes quedan disponibles en:
```
https://storage.googleapis.com/pokeneas-bucket/NOMBRE_ARCHIVO.png
```

### 4. Configurar la variable de entorno
En el archivo `.env` o al correr el contenedor:
```
GCS_BUCKET_URL=https://storage.googleapis.com/pokeneas-bucket
```

---

## Docker Swarm en GCP

### Paso 1: Crear 4 instancias de VM en GCP

En la consola de GCP → Compute Engine → VM instances → **Create Instance**:
- Imagen: Ubuntu 22.04 LTS
- Tipo: e2-medium (2 vCPU, 4 GB RAM)
- Nombre: `swarm-leader`, `swarm-worker-1`, `swarm-worker-2`, `swarm-worker-3`
- Habilitar: HTTP y HTTPS

O con gcloud CLI:
```bash
for i in leader worker-1 worker-2 worker-3; do
  gcloud compute instances create swarm-$i \
    --zone=us-central1-a \
    --machine-type=e2-medium \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --tags=pokeneas-server
done
```

### Paso 2: Abrir puertos en el Firewall

```bash
# Puerto de la aplicación
gcloud compute firewall-rules create pokeneas-app \
  --allow tcp:3000 \
  --target-tags pokeneas-server \
  --description "Puerto de Pokeneas"

# Puertos de Docker Swarm (comunicación entre nodos)
gcloud compute firewall-rules create docker-swarm \
  --allow tcp:2377,tcp:7946,udp:7946,udp:4789 \
  --target-tags pokeneas-server \
  --description "Puertos Docker Swarm"
```

### Paso 3: Instalar Docker en TODAS las instancias

Conéctate por SSH a cada VM y ejecuta:
```bash
# Actualizar paquetes
sudo apt-get update -y

# Instalar dependencias
sudo apt-get install -y ca-certificates curl gnupg

# Agregar repositorio oficial de Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Agregar usuario al grupo docker (para no usar sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verificar
docker --version
```

### Paso 4: Iniciar Docker Swarm en el LÍDER

```bash
# Conectarse a swarm-leader por SSH
# Obtener la IP interna del líder
LEADER_IP=$(hostname -I | awk '{print $1}')

# Inicializar el Swarm
docker swarm init --advertise-addr $LEADER_IP

# El comando anterior imprime el token para unirse como WORKER.
# Para obtener el token de MANAGER:
docker swarm join-token manager
```

### Paso 5: Unir los otros 3 nodos como MANAGERS

En cada una de las 3 VMs restantes (`swarm-worker-1`, `swarm-worker-2`, `swarm-worker-3`):
```bash
# Pegar el comando que imprimió el líder, por ejemplo:
docker swarm join \
  --token SWMTKN-1-XXXXX \
  <IP_INTERNA_DEL_LEADER>:2377
```

### Paso 6: Verificar el cluster

```bash
# Desde el líder
docker node ls
# Deben aparecer 4 nodos, todos como "Ready" y "Manager"
```

### Paso 7: Crear red overlay

```bash
# Desde el líder
docker network create --driver overlay pokeneas-net
```

### Paso 8: Desplegar el servicio con 10 réplicas

```bash
# Desde el líder
docker service create \
  --name pokeneas \
  --network pokeneas-net \
  --replicas 10 \
  --publish published=3000,target=3000 \
  -e GCS_BUCKET_URL=https://storage.googleapis.com/TU_BUCKET \
  -e NODE_ENV=production \
  TU_USUARIO/pokeneas:latest
```

### Paso 9: Verificar el servicio

```bash
# Ver el estado del servicio y las réplicas
docker service ls
docker service ps pokeneas

# Ver en qué nodos están corriendo las réplicas
docker service ps pokeneas --format "table {{.Name}}\t{{.Node}}\t{{.CurrentState}}"
```

### Paso 10: Probar el balanceo de carga

```bash
# Usando la IP pública del líder
# Cada petición puede responder desde un contenedor diferente
for i in $(seq 1 10); do
  curl -s http://<IP_PUBLICA_LEADER>:3000/api/pokenea | python3 -m json.tool
  echo "---"
done
```

### Paso 11: Obtener la IP pública de las VMs

```bash
# En GCP
gcloud compute instances list --format="table(name,EXTERNAL_IP)"

# O dentro de la VM
curl -s ifconfig.me
```

---

## Verificación

### Verificar los 10 contenedores corriendo
```bash
# Desde el líder del Swarm
docker service ps pokeneas
```
Captura el output de este comando.

### Ver IDs de contenedores distintos
Abre en el navegador varias veces:
```
http://<IP_PUBLICA>:3000/pokenea
```
Observa cómo el ID del contenedor cambia entre peticiones (balanceo de carga round-robin).

---
