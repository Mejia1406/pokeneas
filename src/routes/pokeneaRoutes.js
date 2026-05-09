/**
 * routes/pokeneaRoutes.js
 * ─────────────────────────────────────────────────────
 * Define las rutas de la aplicación y las conecta
 * con los controladores correspondientes.
 *
 * Rutas disponibles:
 *   GET /api/pokenea  → JSON con datos del Pokenea
 *   GET /pokenea      → Vista HTML con imagen y frase
 */

import { Router } from 'express';
import {
  getPokeneaJSON,
  getPokeneaVista,
} from '../controllers/pokeneaController.js';

const router = Router();

/**
 * @route   GET /api/pokenea
 * @desc    Retorna un Pokenea aleatorio en formato JSON
 * @access  Public
 */
router.get('/api/pokenea', getPokeneaJSON);

/**
 * @route   GET /pokenea
 * @desc    Muestra la vista HTML con imagen y frase del Pokenea
 * @access  Public
 */
router.get('/pokenea', getPokeneaVista);

/**
 * @route   GET /
 * @desc    Página de bienvenida — redirige a la vista visual
 * @access  Public
 */
router.get('/', (req, res) => {
  res.redirect('/pokenea');
});

export default router;
