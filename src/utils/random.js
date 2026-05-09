/**
 * utils/random.js
 * ─────────────────────────────────────────────────────
 * Funciones utilitarias de uso general.
 * Mantenerlas aquí evita duplicar lógica en servicios.
 */

/**
 * Devuelve un elemento aleatorio de un arreglo.
 * @template T
 * @param {T[]} array - Arreglo del que se selecciona el elemento
 * @returns {T} Elemento aleatorio
 * @throws {Error} Si el arreglo está vacío
 */
export function getRandomElement(array) {
  if (!array || array.length === 0) {
    throw new Error('El arreglo no puede estar vacío');
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
