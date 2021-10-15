import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import * as OpenApiValidator from 'express-openapi-validator';
import * as swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { connector } from 'swagger-routes-express';
import * as routes from './application/route';
import * as admin from 'firebase-admin';

const apiFile = YAML.load('api.yaml');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiFile));

app.use(
  OpenApiValidator.middleware({
    apiSpec: 'api.yaml',
    validateRequests: true,
    validateResponses: true,
  })
);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'wdcc-uads',
  databaseURL: 'https://WDCC-UADS.firebaseio.com'
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(`
  <h2>Error ${err.statusCode}</h2>
  <p>${err.message}</p>
  `);
});

//@ts-ignore
const connect = connector(routes, apiFile);

connect(app);

export default app;
