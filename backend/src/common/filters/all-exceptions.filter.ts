import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;

    if (exception instanceof HttpException) {
      const responseMessage = exception.getResponse();
      if (typeof responseMessage === 'string') {
        message = responseMessage;
      } else if (
        typeof responseMessage === 'object' &&
        responseMessage !== null
      ) {
        message = JSON.stringify(responseMessage);
      } else {
        message = 'Unexpected error response';
      }
    } else {
      message = 'Internal server error';
    }

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (exception instanceof Error) {
      this.logger.error(`${message}\n${exception.stack}`);
    } else {
      this.logger.error(message);
    }

    response.status(status).json(responseBody);
  }
}
