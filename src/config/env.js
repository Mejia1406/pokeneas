/**
 * config/env.js
 * ─────────────────────────────────────────────────────
 * Centraliza la carga de variables de entorno con dotenv.
 * Exporta un objeto tipado para evitar el uso de process.env
 * disperso por toda la aplicación.
 */

import dotenv from 'dotenv';

// Carga el archivo .env en process.env (solo en desarrollo;
// en producción las variables se inyectan directamente al contenedor)
dotenv.config();

const env = {
  /** Puerto en el que escucha el servidor Express */
  port: parseInt(process.env.PORT, 10) || 3000,

  /** Entorno de ejecución */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** URL base del Bucket de Google Cloud Storage */
  gcsBucketUrl:
    process.env.GCS_BUCKET_URL ||
    'https://storage.googleapis.com/pokeneas-bucket',

  /** Indica si estamos en producción */
  isProduction: process.env.NODE_ENV === 'production',
};

export default env;
