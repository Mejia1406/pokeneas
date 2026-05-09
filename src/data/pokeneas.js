import env from '../config/env.js';

const BASE = env.gcsBucketUrl;

/**
 * Estructura de un Pokenea:
 * - id: identificador único
 * - nombre: nombre del Pokenea
 * - altura: altura del Pokenea
 * - habilidad: habilidad especial
 * - imagen: URL pública de la imagen
 * - frase: frase filosófica
 */

const pokeneas = [
  {
    id: 1,
    nombre: 'Guacaramón',
    altura: '1.20 m',
    habilidad: 'Vozarrón de Feria',
    imagen: `${BASE}/guacaramon.png`,
    frase: 'El que madruga, ni bus se le va ni arepa se le quema.',
  },
  {
    id: 2,
    nombre: 'Arriazul',
    altura: '0.85 m',
    habilidad: 'Paso de Bueyes',
    imagen: `${BASE}/arriazul.png`,
    frase: 'El camino se hace caminando, pero con buenas alpargatas.',
  },
  {
    id: 3,
    nombre: 'Sombrerón',
    altura: '1.50 m',
    habilidad: 'Sombra Tepeteadora',
    imagen: `${BASE}/sombreron.png`,
    frase: 'Más vale poncho viejo que chaqueta prestada.',
  },
  {
    id: 4,
    nombre: 'Tamaleón',
    altura: '0.60 m',
    habilidad: 'Hoja de Plátano',
    imagen: `${BASE}/tamaleon.png`,
    frase: 'El amor entra por la cocina, no por los algoritmos.',
  },
  {
    id: 5,
    nombre: 'Mazamorrín',
    altura: '0.75 m',
    habilidad: 'Chorro Maicero',
    imagen: `${BASE}/mazamorrin.png`,
    frase: 'La humildad es la mazamorra del alma: sencilla y nutritiva.',
  },
  {
    id: 6,
    nombre: 'Corocorín',
    altura: '0.40 m',
    habilidad: 'Canto al Amanecer',
    imagen: `${BASE}/corocorин.png`,
    frase: 'Quien canta, sus males espanta; quien trabaja, sus deudas rebaja.',
  },
  {
    id: 7,
    nombre: 'Panelón',
    altura: '1.10 m',
    habilidad: 'Dulzura Irresistible',
    imagen: `${BASE}/panelon.png`,
    frase: 'La vida es amarga; por eso necesitamos panela en el tinto.',
  },
  {
    id: 8,
    nombre: 'Fiquieza',
    altura: '0.95 m',
    habilidad: 'Lazo de Cabuya',
    imagen: `${BASE}/fiquieza.png`,
    frase: 'El que se enreda en sus propias mentiras, se ahorca con su propia cabuya.',
  },
  {
    id: 9,
    nombre: 'Bandolín',
    altura: '1.30 m',
    habilidad: 'Rasgueo Pasillero',
    imagen: `${BASE}/bandolin.png`,
    frase: 'La música no paga el arriendo, pero alegra la vida del arrendado.',
  },
  {
    id: 10,
    nombre: 'Chivagüero',
    altura: '0.70 m',
    habilidad: 'Carrera de Chiva',
    imagen: `${BASE}/chivaguero.png`,
    frase: 'Si no sabes a dónde vas, cualquier chiva te lleva.',
  },
];

export default pokeneas;
