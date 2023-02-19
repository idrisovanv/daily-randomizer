import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { useExpressServer } from 'routing-controllers';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import sequelize from '@database';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { SequelizeStorage, Umzug, UmzugOptions } from 'umzug';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { DevelopersController } from '@controllers/developers.controller';
import { TeamsController } from '@controllers/teams.controller';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();

    useExpressServer(this.app, {
      defaultErrorHandler: false,
      middlewares: [errorMiddleware],
      controllers: [DevelopersController, TeamsController],
    });

    this.initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    const seedsConfig: UmzugOptions = {
      migrations: { glob: './src/seeders/*.js' },
      context: sequelize.getQueryInterface() as any,
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    };

    const seeder = new Umzug(seedsConfig);

    sequelize.sync({ force: false }).then(() => {
      seeder.up();
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeSwagger() {
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }
}

export default App;
