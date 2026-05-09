import env from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
  });
}

export function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  const response = {
    error: 'Error interno del servidor',
    mensaje: err.message || 'Algo salió mal',
  };

  if (!env.isProduction) {
    response.stack = err.stack;
  }

  res.status(err.status || 500).json(response);
}