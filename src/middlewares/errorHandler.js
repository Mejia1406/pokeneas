/**
 * middlewares/errorHandler.js
 * ─────────────────────────────────────────────────────
 * Middleware centralizado de manejo de errores.
 * Express lo reconoce por la firma de 4 parámetros (err, req, res, next).
 * Debe registrarse DESPUÉS de todas las rutas en app.js.
 */

import env from '../config/env.js';

/**
 * Middleware para rutas no encontradas (404).
 * Se ejecuta cuando ninguna ruta previa coincide.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    mensaje: 'Este Pokenea se perdió en el Atrato. Verifica la URL.',
  });
}

/**
 * Middleware de errores globales.
 * Captura cualquier error lanzado con next(error) en controladores.
 *
 * @param {Error} err
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next  // eslint-disable-line no-unused-vars
 */
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Log del error (en producción usar un logger como Winston)
  console.error('[ERROR]', err.message);

  // En desarrollo, expone el stack trace; en producción, solo el mensaje
  const response = {
    error: 'Error interno del servidor',
    mensaje: err.message || 'Algo salió mal',
    ...(env.isProduction ? {} : { stack: err.stack }),
  };

  res.status(err.status || 500).json(response);
}
