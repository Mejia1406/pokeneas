/**
 * app.js
 * ─────────────────────────────────────────────────────
 * Punto de entrada principal de la aplicación Pokeneas.
 * Configura Express, registra middlewares, rutas y arranca el servidor.
 *
 * Orden de middleware (IMPORTANTE — el orden en Express importa):
 *   1. Seguridad básica (headers)
 *   2. Logging de peticiones (morgan)
 *   3. Parseo de body
 *   4. Archivos estáticos
 *   5. Rutas de la aplicación
 *   6. 404 handler
 *   7. Error handler global
 */

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import env from './config/env.js';
import requestLogger from './middlewares/requestLogger.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import pokeneaRoutes from './routes/pokeneaRoutes.js';

// ─── Resolución de __dirname para ES Modules ──────────────────────────────────
// En CommonJS __dirname existe; en ES Modules se construye manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Creación de la app Express ───────────────────────────────────────────────
const app = express();

// ─── Configuración del motor de plantillas ────────────────────────────────────
// EJS: permite renderizar HTML dinámico desde los controladores con res.render()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middlewares globales ─────────────────────────────────────────────────────

// 1. Logging de peticiones HTTP (morgan)
app.use(requestLogger);

// 2. Parseo de JSON en el body de las peticiones entrantes
app.use(express.json());

// 3. Parseo de datos de formularios HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// 4. Servir archivos estáticos desde src/public/
//    Accesibles en http://localhost:3000/css/..., /js/..., /images/...
app.use(express.static(path.join(__dirname, 'public')));

// ─── Rutas de la aplicación ───────────────────────────────────────────────────
app.use('/', pokeneaRoutes);

// ─── Manejo de rutas no encontradas (404) ────────────────────────────────────
app.use(notFoundHandler);

// ─── Manejo global de errores ─────────────────────────────────────────────────
// DEBE ir al final, después de todas las rutas
app.use(errorHandler);

// ─── Inicio del servidor ──────────────────────────────────────────────────────
app.listen(env.port, () => {
  const mode = env.nodeEnv.toUpperCase();
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         🌿 POKENEAS DE ANTIOQUIA 🌿       ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  Modo:     ${mode.padEnd(30)}║`);
  console.log(`║  Puerto:   ${String(env.port).padEnd(30)}║`);
  console.log(`║  GCS URL:  ${env.gcsBucketUrl.substring(0, 30)}║`);
  console.log('╠══════════════════════════════════════════╣');
  console.log('║  Rutas disponibles:                      ║');
  console.log(`║  → http://localhost:${env.port}/pokenea          ║`);
  console.log(`║  → http://localhost:${env.port}/api/pokenea      ║`);
  console.log('╚══════════════════════════════════════════╝');
});

export default app;
