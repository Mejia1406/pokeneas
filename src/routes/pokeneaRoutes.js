import { Router } from 'express';

import {
  getPokeneaJSON,
  getPokeneaVista,
} from '../controllers/pokeneaController.js';

const router = Router();
router.get('/api/pokenea', getPokeneaJSON);
router.get('/pokenea', getPokeneaVista);
router.get('/', (req, res) => {
  res.redirect('/pokenea');
});

export default router;