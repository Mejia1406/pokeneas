import app from './app.js';
import env from './config/env.js';

app.listen(env.port, () => {
  console.log(`Pokeneas ejecutándose en el puerto ${env.port}`);
  console.log(`→ http://localhost:${env.port}/pokenea`);
  console.log(`→ http://localhost:${env.port}/api/pokenea`);
  console.log(`→ http://localhost:${env.port}/api/v1/pokeneas/random`);
});