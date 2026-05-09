import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import env from './config/env.js';
import requestLogger from './middlewares/requestLogger.js';
import {
  notFoundHandler,
  errorHandler,
} from './middlewares/errorHandler.js';

import pokeneaRoutes from './routes/pokeneaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pokeneaRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`🌿 Pokeneas ejecutándose en el puerto ${env.port}`);
  console.log(`→ http://localhost:${env.port}/pokenea`);
  console.log(`→ http://localhost:${env.port}/api/pokenea`);
});

export default app;