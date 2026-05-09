import morgan from 'morgan';
import env from '../config/env.js';

const requestLogger = morgan(env.isProduction ? 'combined' : 'dev');

export default requestLogger;
