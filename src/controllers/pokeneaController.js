import {
  getPokeneaParaJSON,
  getPokeneaParaVista,
} from '../services/pokeneaService.js';

/**
 * GET /api/pokenea
 * Devuelve un Pokenea aleatorio en formato JSON.
 */
export function getPokeneaJSON(req, res, next) {
  try {
    const data = getPokeneaParaJSON();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /pokenea
 * Renderiza un Pokenea aleatorio con imagen y frase filosófica.
 */
export function getPokeneaVista(req, res, next) {
  try {
    const data = getPokeneaParaVista();

    return res.render('pokenea', data);
  } catch (error) {
    next(error);
  }
}