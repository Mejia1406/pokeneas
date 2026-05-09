import pokeneas from '../data/pokeneas.js';
import { getRandomElement } from '../utils/random.js';
import { containerId } from '../utils/container.js';

export function getPokeneaParaJSON() {
  const pokenea = getRandomElement(pokeneas);

  return {
    id: pokenea.id,
    nombre: pokenea.nombre,
    altura: pokenea.altura,
    habilidad: pokenea.habilidad,
    contenedor: containerId,
  };
}

export function getPokeneaParaVista() {
  const pokenea = getRandomElement(pokeneas);

  return {
    id: pokenea.id,
    nombre: pokenea.nombre,
    imagen: pokenea.imagen,
    frase: pokenea.frase,
    contenedor: containerId,
  };
}

export function getAllPokeneas() {
  return pokeneas;
}