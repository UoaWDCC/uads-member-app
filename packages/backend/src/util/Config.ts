import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const MONGODB_URI = process.env.MONGODB_URI;

/*
 * The default port of the application
 */
const PORT = process.env.PORT || 9002;

export default {
  PORT,
  MONGODB_URI,
  NODE_ENV,
};
