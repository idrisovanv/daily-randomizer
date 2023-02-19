import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { BaseError } from 'sequelize';

@Middleware({ type: 'after' })
export default class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any) {
    if (error instanceof HttpError) {
      response.status(error.httpCode).json(error);
    } else if (error instanceof BaseError) {
      response.status(400).json(error);
    } else {
      // send error response with default message
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
