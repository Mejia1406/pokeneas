/**
 * controllers/pokeneaController.js
 * ─────────────────────────────────────────────────────
 * Capa de CONTROLADORES: maneja las peticiones HTTP.
 * Solo recibe req/res y delega la lógica al servicio.
 * No contiene lógica de negocio directamente.
 */

import {
  getPokeneaParaJSON,
  getPokeneaParaVista,
} from '../services/pokeneaService.js';

/**
 * GET /api/pokenea
 * Devuelve un Pokenea aleatorio en formato JSON con el ID del contenedor.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function getPokeneaJSON(req, res, next) {
  try {
    const data = getPokeneaParaJSON();
    return res.status(200).json(data);
  } catch (error) {
    // Delega el error al middleware de manejo de errores
    next(error);
  }
}

/**
 * GET /pokenea
 * Renderiza la vista HTML con imagen, frase e ID del contenedor.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function getPokeneaVista(req, res, next) {
  try {
    const data = getPokeneaParaVista();
    // Renderiza la plantilla EJS en src/views/pokenea.ejs
    return res.render('pokenea', data);
  } catch (error) {
    next(error);
  }
}
