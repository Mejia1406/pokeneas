import {
  getPokeneaParaJSON,
  getPokeneaParaVista,
} from '../services/pokeneaService.js';

export function redirectToPokenea(req, res) {
  return res.redirect(302, '/pokenea');
}

export function getPokeneaJSON(req, res, next) {
  try {
    const data = getPokeneaParaJSON();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export function getPokeneaVista(req, res, next) {
  try {
    const data = getPokeneaParaVista();

    return res.render('pokenea', data);
  } catch (error) {
    next(error);
  }
}