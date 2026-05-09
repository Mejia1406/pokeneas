/**
 * middlewares/requestLogger.js
 * ─────────────────────────────────────────────────────
 * Configura Morgan para el logging de peticiones HTTP.
 * En desarrollo: formato colorido 'dev'.
 * En producción: formato 'combined' (estándar Apache, útil para análisis).
 */

import morgan from 'morgan';
import env from '../config/env.js';

/**
 * Middleware de logging de peticiones.
 * Exportado como función para aplicarlo en app.js.
 */
const requestLogger = morgan(env.isProduction ? 'combined' : 'dev');

export default requestLogger;
