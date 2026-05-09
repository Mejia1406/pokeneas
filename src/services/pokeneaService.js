/**
 * services/pokeneaService.js
 * ─────────────────────────────────────────────────────
 * Capa de SERVICIO: contiene toda la lógica de negocio.
 * Los controladores solo llaman a estos métodos.
 * Esta separación facilita el testing y mantenimiento.
 */

import pokeneas from '../data/pokeneas.js';
import { getRandomElement } from '../utils/random.js';
import { containerId } from '../utils/container.js';

/**
 * Selecciona un Pokenea aleatorio y construye la respuesta JSON.
 * Incluye solo los campos requeridos: id, nombre, altura, habilidad
 * más el ID del contenedor.
 *
 * @returns {{ id: number, nombre: string, altura: string, habilidad: string, contenedor: string }}
 */
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

/**
 * Selecciona un Pokenea aleatorio y construye los datos para la vista HTML.
 * Incluye imagen, frase filosófica e ID del contenedor.
 *
 * @returns {{ id: number, nombre: string, imagen: string, frase: string, contenedor: string }}
 */
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

/**
 * Devuelve todos los Pokeneas (útil para debugging).
 * @returns {import('../data/pokeneas.js').Pokenea[]}
 */
export function getAllPokeneas() {
  return pokeneas;
}
