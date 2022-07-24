import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        // console.log(`${response.statusCode} | [${method}] `);
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();

        // console.error(`${response.statusCode} | [${method}] `);
        return throwError(error);
      }),
    );
  }
}
