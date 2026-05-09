import dotenv from 'dotenv';

dotenv.config();

const env = {

  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  gcsBucketUrl:
    process.env.GCS_BUCKET_URL ||
    'https://storage.googleapis.com/pokeneas-bucket',
  isProduction: process.env.NODE_ENV === 'production',
};

export default env;
