import path from 'path';
import Sequelize from './sequelize';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server as httpsServer } from 'https';
import { Server as httpServer } from 'http';
import fs from 'fs';
import socketIO from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes';
import config from './config';
import models, {initializeDatabase} from './models'
import to from 'await-to-js';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';



const app = express();
const websocketApp = express();
let server;
let websocketServer;
if (config.environment === 'development') {
  server = httpServer(app);
  websocketServer = httpServer(websocketApp);
} else {
  const privateKey = fs.readFileSync(config.sslPrivateKeyPath);
  const certificate = fs.readFileSync(config.sslCertificatePath);
  server = httpsServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app,
  );
  websocketServer = httpsServer(
    {
      key: privateKey,
      cert: certificate,
    },
    websocketApp,
  );
}

//
// Configure socket.io
// -----------------------------------------------------------------------------
const io = socketIO(websocketServer);
global.io = io;

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Enable cors
// -----------------------------------------------------------------------------
app.use(cors());

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('', routes);


//
// Launch the server
// -----------------------------------------------------------------------------
 
const promise = Sequelize.query('SET FOREIGN_KEY_CHECKS=0;').then(() => {
  models.sync(config.alterDB ? { alter: true } : {}).then(async () => {
      console.log('Database is Synced');
      if(config.initializeDB) {
        await initializeDatabase();
        console.log("Database is Initialized");
      }
        
      Sequelize.query('SET FOREIGN_KEY_CHECKS=1;');

    })
    .catch(err => console.error(err.stack)); // { alter: true } for updating table columns
});

promise.then(() => {
  server.listen(
    config.port,
    console.info(
      `The server is running at ${
        config.environment === 'development' ? 'http' : 'https'
      }://45.89.139.182:${config.port}/`,
    ),
  );
  websocketServer.listen(
    config.websocketPort,
    console.info(
      `The websocket server is running at ${
        config.environment === 'development' ? 'http' : 'https'
      }://45.89.139.182:${config.websocketPort}/`,
    ),
  );
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
}

export default app;
