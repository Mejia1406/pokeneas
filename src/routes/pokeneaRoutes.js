import { Router } from 'express';

import {
  getPokeneaJSON,
  getPokeneaVista,
  redirectToPokenea,
} from '../controllers/pokeneaController.js';

const router = Router();

router.get('/', redirectToPokenea);

router.get('/api/pokenea', getPokeneaJSON);
router.get('/api/v1/pokeneas/random', getPokeneaJSON);

router.get('/pokenea', getPokeneaVista);

export default router;