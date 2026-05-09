/**
 * utils/container.js
 * ─────────────────────────────────────────────────────
 * Obtiene el ID del contenedor Docker actual.
 *
 * Estrategia:
 * 1. Lee /proc/self/cgroup (disponible en contenedores Linux)
 * 2. Si falla (desarrollo local sin Docker), devuelve el hostname
 *
 * El ID se obtiene UNA SOLA VEZ al inicio y se cachea,
 * ya que no cambia durante la vida del contenedor.
 */

import { readFileSync } from 'fs';
import { hostname } from 'os';

/**
 * Lee el ID del contenedor desde /proc/self/cgroup.
 * En Docker, este archivo contiene líneas con el ID del contenedor.
 * @returns {string|null} ID del contenedor o null si no aplica
 */
function readContainerIdFromCgroup() {
  try {
    const cgroupContent = readFileSync('/proc/self/cgroup', 'utf8');

    // Busca una línea que contenga un hash de 64 caracteres (ID de contenedor)
    for (const line of cgroupContent.split('\n')) {
      // El ID aparece como el último segmento separado por '/'
      const match = line.match(/\/([a-f0-9]{64})$/);
      if (match) {
        return match[1];
      }
      // Formato alternativo en Docker moderno con cgroups v2
      const matchV2 = line.match(/docker-([a-f0-9]{64})\.scope/);
      if (matchV2) {
        return matchV2[1];
      }
    }
    return null;
  } catch {
    // No estamos en un contenedor Linux o no hay permisos
    return null;
  }
}

/**
 * Obtiene el ID del contenedor Docker actual.
 * Devuelve los primeros 12 caracteres (formato corto, igual que `docker ps`).
 * @returns {string} ID corto del contenedor o hostname como fallback
 */
function resolveContainerId() {
  const fullId = readContainerIdFromCgroup();
  if (fullId) {
    // Retorna el ID corto (12 caracteres), igual que `docker ps`
    return fullId.substring(0, 12);
  }
  // Fallback: en desarrollo local, usamos el hostname de la máquina
  return hostname();
}

// Se calcula UNA VEZ al cargar el módulo (singleton)
export const containerId = resolveContainerId();
